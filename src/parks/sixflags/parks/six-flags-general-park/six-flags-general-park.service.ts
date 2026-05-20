import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ThemeParkService } from '../../../../_services/themepark/theme-park.service';
import { ParkType, ThemePark } from '../../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../../_interfaces/park-supports.interface';
import { ConfigService } from '@nestjs/config';
import { Poi } from '../../../../_interfaces/poi.interface';
import { AxiosError } from 'axios';
import { SixflagsTransferService } from '../../sixflags-transfer/sixflags-transfer.service';
import { PoiCategory } from '../../../../_interfaces/poi-categories.enum';
import { HttpService } from '@nestjs/axios';
import * as Sentry from '@sentry/node';
import { SixflagsCedarPoiInterface } from '../../interfaces/sixflags-cedar-poi.interface';

// TODO: See what more the new Six Flags app is capable of
@Injectable()
export class SixFlagsGeneralParkService extends ThemeParkService {
  private _parkInfo: ThemePark;
  private _parkId: string;
  private readonly _baseUrl: string;

  constructor(private readonly configService: ConfigService,
              private readonly httpService: HttpService,
              private readonly sixflagsTransferService: SixflagsTransferService) {
    super();

    this._baseUrl = this.configService.get('SIX_FLAGS_CEDAR_BASE_API_URL');
  }

  setInfo(info: ThemePark) {
    this._parkInfo = info;
  }

  setParkId(id: string) {
    this._parkId = id;
  }

  getInfo(): ThemePark {
    return this._parkInfo;
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsPoiLocations: true,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: false,
      supportsRides: true,
      supportsShopOpeningTimes: false,
      supportsShops: true,
      supportsShowTimes: false,
      supportsShows: true,
      supportsRideWaitTimesHistory: false,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: false,
      supportsAnimals: this.getInfo().parkType === ParkType.ZOO,
      supportsTranslations: false,
      textType: 'HTML',
      supportsEvents: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    return this.request<SixflagsCedarPoiInterface[]>(`poi/park/${this._parkId}`)
      .then((res) => {
        return this.sixflagsTransferService.transferPoisToPois(res)
      })
      .catch((reason) => {
        Sentry.captureException(reason);
        console.error(reason);
        throw new InternalServerErrorException("Six Flags data could not be parsed");
      });
  }

  async getRestaurants(): Promise<Poi[]> {
    return this.getPois().then(pois => pois.filter(p => [PoiCategory.RESTAURANT, PoiCategory.SNACKBAR].includes(p.category)));
  }

  async getRides(): Promise<Poi[]> {
    return this.getPois().then(pois => pois.filter(p => p.category === PoiCategory.ATTRACTION));
  }

  async getShops(): Promise<Poi[]> {
    return this.getPois().then(pois => pois.filter(p => p.category === PoiCategory.SHOP));
  }

  async getShows(): Promise<Poi[]> {
    return this.getPois().then(pois => pois.filter(p => [PoiCategory.EVENT, PoiCategory.SHOW].includes(p.category)));
  }

  private async request<T>(url: string): Promise<T> {
    const fullUrl = this._baseUrl + '/' + url;

    return this.httpService.get<T>(fullUrl)
      .toPromise()
      .then(value => {
        return value.data;
      })
      .catch((reason: AxiosError) => {
        Sentry.captureException(reason);
        throw new InternalServerErrorException("Six Flags data could not be fetched");
      });
  }
}
