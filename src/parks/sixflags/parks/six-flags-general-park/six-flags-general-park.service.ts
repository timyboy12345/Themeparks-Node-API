import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ThemeParkService } from '../../../../_services/themepark/theme-park.service';
import { ParkType, ThemePark } from '../../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../../_interfaces/park-supports.interface';
import { ConfigService } from '@nestjs/config';
import { Poi, PoiStatus } from '../../../../_interfaces/poi.interface';
import { AxiosError } from 'axios';
import { SixflagsTransferService } from '../../sixflags-transfer/sixflags-transfer.service';
import { PoiCategory } from '../../../../_interfaces/poi-categories.enum';
import { HttpService } from '@nestjs/axios';
import * as Sentry from '@sentry/node';
import * as moment from 'moment';
import * as sluggo from 'sluggo';
import { SixflagsCedarPoiInterface } from '../../interfaces/sixflags-cedar-poi.interface';
import { SixflagsCedarWaitTimesInterface } from '../../interfaces/sixflags-cedar-wait-times.interface';
import { ThemeParkOpeningTimes } from '../../../../_interfaces/park-openingtimes.interface';
import { ThemeParkEvent } from '../../../../_interfaces/park-event.interface';
import { SixflagsCedarOpeningHoursInterface } from '../../interfaces/sixflags-cedar-opening-hours.interface';
import { SixFlagsCedarEvent } from '../../interfaces/sixflags-cedar-event.interface';
import { EventCategory } from '../../../../_interfaces/event.category';

@Injectable()
export class SixFlagsGeneralParkService extends ThemeParkService {
  private _parkInfo: ThemePark;
  private _parkId: string;
  private readonly _baseUrl: string;
  private readonly _contentUrl: string;

  constructor(private readonly configService: ConfigService,
              private readonly httpService: HttpService,
              private readonly sixflagsTransferService: SixflagsTransferService) {
    super();

    this._baseUrl = this.configService.get('SIX_FLAGS_CEDAR_BASE_API_URL');
    this._contentUrl = this.configService.get('SIX_FLAGS_CEDAR_PARKS_API_URL');
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
      supportsRideWaitTimes: true,
      supportsRides: true,
      supportsShopOpeningTimes: false,
      supportsShops: true,
      supportsShowTimes: false,
      supportsShows: true,
      supportsRideWaitTimesHistory: false,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: true,
      supportsAnimals: this.getInfo().parkType === ParkType.ZOO,
      supportsTranslations: false,
      textType: 'HTML',
      supportsEvents: true,
    };
  }

  async getPois(): Promise<Poi[]> {
    const waitTimes = await this.request<SixflagsCedarWaitTimesInterface>(`wait-times/park/${this._parkId}`)
      .then((r) => r)
      .catch((reason) => {
        Sentry.captureException(reason);
        console.error(reason);
        return null;
      });

    return this.request<SixflagsCedarPoiInterface[]>(`poi/park/${this._parkId}`)
      .then((res) => {
        const pois = this.sixflagsTransferService.transferPoisToPois(res);

        if (waitTimes && waitTimes.venues[0]) {
          pois.forEach(poi => {

            const waitData = waitTimes.venues[0]
              .details
              .find((d) => d.fimsId === poi.original.fimsId);

            if (waitData) {
              if (waitData.regularWaittime.waitTime === 0) {
                poi.state = PoiStatus.CLOSED;
              } else {
                poi.state = PoiStatus.OPEN;
                poi.currentWaitTime = waitData.regularWaittime.waitTime;
              }
            }
          });
        }

        return pois;
      })
      .catch((reason) => {
        Sentry.captureException(reason);
        console.error(reason);
        throw new InternalServerErrorException('Six Flags data could not be parsed');
      });
  }

  async getOpeningTimes(): Promise<ThemeParkOpeningTimes[]> {
    const date = moment().format('YYYYMM');

    return this.request<SixflagsCedarOpeningHoursInterface>(`operating-hours/park/${this._parkId}?date=${date}`)
      .then(this.sixflagsTransferService.transferOpeningTimesToOpeningTimes)
      .catch((reason) => {
        Sentry.captureException(reason);
        console.error(reason);
        throw new InternalServerErrorException(`Error while fetching opening hours for ${this._parkId}`);
      });
  }

  async getEvents(): Promise<ThemeParkEvent[]> {
    return this.request<SixFlagsCedarEvent[]>(`content/events/park/${this._parkId}`, this._contentUrl)
      .then((events) => {
        return events.map(event => {
          let category = EventCategory.OTHER;

          if (event.title.includes('Fright')) category = EventCategory.HALLOWEEN;
          if (event.title.includes('Boo Fest')) category = EventCategory.HALLOWEEN;

          return {
            name: event.title,
            slug: sluggo(event.title),
            type: category,
            description: event.description,
            image: event.image?.image,
            fromDate: event.showTimesSchedule?.[0]?.startDate || null,
            toDate: event.showTimesSchedule?.[0]?.endDate || null,
          };
        });
      })
      .catch((reason) => {
        Sentry.captureException(reason);
        console.error(reason);
        throw new InternalServerErrorException(`Error while fetching opening hours for ${this._parkId}`);
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

  private async request<T>(url: string, baseUrl = this._baseUrl): Promise<T> {
    const fullUrl = baseUrl + '/' + url;

    return this.httpService.get<T>(fullUrl)
      .toPromise()
      .then(value => {
        return value.data;
      })
      .catch((reason: AxiosError) => {
        Sentry.captureException(reason);
        console.error(reason);
        throw new InternalServerErrorException('Six Flags data could not be fetched');
      });
  }
}
