import { Injectable } from '@nestjs/common';
import { ThemeParkService } from '../../../../_services/themepark/theme-park.service';
import { ParkType, ThemePark } from '../../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../../_interfaces/park-supports.interface';
import { ConfigService } from '@nestjs/config';
import { Poi } from '../../../../_interfaces/poi.interface';
import { AxiosBasicCredentials, AxiosError } from 'axios';
import { SixflagsMapResponseInterface } from '../../interfaces/sixflags-map-response.interface';
import { SixflagsTransferService } from '../../sixflags-transfer/sixflags-transfer.service';
import { PoiCategory } from '../../../../_interfaces/poi-categories.enum';
import { SixflagsTokenResponseInterface } from '../../interfaces/sixflags-token-response.interface';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SixFlagsGeneralParkService extends ThemeParkService {
  private _parkInfo: ThemePark;
  private _parkId: string;
  private readonly _sixflagsApiToken: string;

  constructor(private readonly configService: ConfigService,
              private readonly httpService: HttpService,
              private readonly sixflagsTransferService: SixflagsTransferService) {
    super();

    this._sixflagsApiToken = this.configService.get('SIXFLAGS_API_TOKEN');
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
      supportsPoiLocations: false,
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
      textType: "UNDEFINED",
supportsEvents: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    return this.request<SixflagsMapResponseInterface>(`park/${this._parkId}/map`).then((response) => {
      let pois: Poi[] = [];

      for (const [key, value] of Object.entries(response)) {
        pois = pois.concat(this.sixflagsTransferService.transferPoisToPois(value ?? []));
      }

      return pois;
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
    const fullUrl = this.configService.get('SIXFLAGS_API_URL') + '/' + url;

    const token = await this.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.httpService.get<T>(fullUrl, { headers: headers })
      .toPromise()
      .then(value => {
        return value.data;
      })
      .catch((reason: AxiosError) => {
        console.error(reason.response.data);
        console.error(reason.request.headers);
        return null;
      });
  }

  private async getToken(): Promise<string> {
    const fullUrl = this.configService.get('SIXFLAGS_AUTH_URL');

    const headers = {
      Authorization: `Bearer ${this._sixflagsApiToken}`,
    };

    const auth: AxiosBasicCredentials = {
      username: this.configService.get('SIXFLAGS_AUTH_USERNAME'),
      password: this.configService.get('SIXFLAGS_AUTH_PASSWORD'),
    };

    const body = 'grant_type=client_credentials&scope=mobileApp';

    return this.httpService
      .post<SixflagsTokenResponseInterface>(fullUrl, body, { headers: headers, auth: auth })
      .toPromise()
      .then(value => {
        return value.data.access_token;
      })
      .catch((reason: AxiosError) => {
        console.log(reason.response.data);
        console.log(reason.request.headers);
        return null;
      });
  }
}
