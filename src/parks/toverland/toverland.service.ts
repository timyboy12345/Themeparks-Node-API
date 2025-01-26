import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ThemeParkService } from '../../_services/themepark/theme-park.service';
import { Poi } from '../../_interfaces/poi.interface';
import { ToverlandRide } from './interfaces/toverland-ride.interface';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { ToverlandFoodAndDrink } from './interfaces/toverland-foodanddrink.interface';
import { ConfigService } from '@nestjs/config';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import * as Sentry from '@sentry/node';
import { ToverlandTransferService } from './toverland-transfer/toverland-transfer.service';
import { ToverlandShow } from './interfaces/toverland-show.interface';
import { LocaleService } from '../../_services/locale/locale.service';
import { HttpService } from '@nestjs/axios';
import { ThemeParkEvent } from '../../_interfaces/park-event.interface';
import { EventCategory } from '../../_interfaces/event.category';

@Injectable()
export class ToverlandService extends ThemeParkService {
  private readonly toverlandApiUrl: string;
  private readonly toverlandApiToken: string;

  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService,
              private readonly toverlandTransferService: ToverlandTransferService,
              private readonly localeService: LocaleService) {
    super();

    this.toverlandApiUrl = configService.get<string>('TOVERLAND_API_URL');
    this.toverlandApiToken = configService.get<string>('TOVERLAND_API_AUTHENTICATION');
  }

  getInfo(): ThemePark {
    return {
      id: 'toverland',
      name: 'Toverland',
      description: 'Attractiepark Toverland, kortweg Toverland, is een deels overdekt attractiepark in het Nederlandse Sevenum. Het is een van de jongste attractieparken van Nederland.',
      image: 'https://i.ytimg.com/vi/WeUzyKUqR4I/maxresdefault.jpg',
      countryCode: 'nl',
      parkType: ParkType.THEMEPARK,
      timezone: 'Europe/Amsterdam',
      location: {
        lat: 51.396876785658854,
        lng: 5.9847988846115,
      },
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsPois: true,
      supportsRestaurantOpeningTimes: true,
      supportsRestaurants: true,
      supportsRideWaitTimes: true,
      supportsRides: true,
      supportsShowTimes: true,
      supportsShows: true,
      supportsPoiLocations: true,
      supportsShops: false,
      supportsShopOpeningTimes: false,
      supportsRideWaitTimesHistory: true,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: false,
      supportsAnimals: false,
      supportsTranslations: true,
      textType: "UNDEFINED",
      supportsEvents: true,
    };
  }

  async getRides(): Promise<Poi[]> {
    return this.request<ToverlandRide[]>('/park/ride/operationInfo/list')
      .then((axiosRidesData) => {
        return this.toverlandTransferService.transferRidesToPois(axiosRidesData.data, this.localeService.getLocale());
      })
      .catch((exception) => {
        Sentry.captureException(exception);
        console.error(exception);
        throw new HttpException('Failed to fetch rides', 500, {
          cause: new Error('Failed to fetch rides: ' + exception.toString()),
        });
      });
  }

  async getRestaurants(): Promise<Poi[]> {
    return this
      .request<ToverlandFoodAndDrink[]>('/park/foodAndDrinks/operationInfo/list')
      .then((axiosRidesData) => {
        return this.toverlandTransferService.transferRestaurantsToPois(axiosRidesData.data, this.localeService.getLocale());
      })
      .catch((exception) => {
        Sentry.captureException(exception);
        console.error(exception);
        throw new HttpException('Failed to fetch restaurants', 500, {
          cause: new Error('Failed to fetch restaurants: ' + exception.toString()),
        });
      });
  }

  async getShows(): Promise<Poi[]> {
    return this.request<ToverlandShow[]>('/park/show/operationInfo/list')
      .then((axiosShowsData) => {
        return this.toverlandTransferService.transferShowsToPois(axiosShowsData.data, this.localeService.getLocale());
      })
      .catch((exception) => {
        Sentry.captureException(exception);
        console.error(exception);
        throw new HttpException('Failed to fetch shows', 500, {
          cause: new Error('Failed to fetch shows: ' + exception.toString()),
        });
      });
  }

  async getHalloweenEvents(): Promise<Poi[]> {
    return this.request<ToverlandShow[]>('/park/halloween/operationInfo/list')
      .then((axiosShowsData) => {
        return this.toverlandTransferService.transferHalloweenEventsToPoi(axiosShowsData.data, this.localeService.getLocale());
      })
      .catch((exception) => {
        Sentry.captureException(exception);
        console.error(exception);
        throw new HttpException('Failed to fetch halloween events', 500, {
          cause: new Error('Failed to fetch halloween events: ' + exception.toString()),
        });
      });
  }

  private async request<T>(url: string) {
    const headers = {
      'Authorization': `Bearer ${this.toverlandApiToken}`,
      'Accept': 'application/json, text/plain, */*',
      'User-Agent': 'toverland/43 CFNetwork/1240.0.4 Darwin/20.6.0',
      'Accept-Language': 'nl-nl',
    };

    const fullUrl = this.toverlandApiUrl + url;

    return this
      .httpService
      .get<T>(fullUrl, {
        headers: headers,
      })
      .toPromise()
      .then(value => {
        return value;
      })
      .catch(reason => {
        Sentry.captureException(reason);
        console.log(reason);
        throw new InternalServerErrorException();
      });
  }

  async getPois(): Promise<Poi[]> {
    const promises = [
      this.getRides(),
      this.getRestaurants(),
      this.getShows(),
      this.getHalloweenEvents(),
    ];

    return []
      .concat
      .apply([], await Promise.all(promises));
  }

  async getEvents(): Promise<ThemeParkEvent[]> {
    return [{
      dates: [
        '2024-10-05',
        '2024-10-12',
        '2024-10-19',
        '2024-10-20',
        '2024-10-21',
        '2024-10-23',
        '2024-10-24',
        '2024-10-25',
        '2024-10-26',
        '2024-10-27',
        '2024-11-01',
        '2024-11-02',
        '2024-11-09',
      ],
      description: 'De Toverland Halloween Nights zijn een terugkerend Halloween-evenement waar je zeker bent de stuipen op het lijf geschrokken te worden.',
      image: 'https://www.toverland.com/fileadmin/_processed_/5/b/csm_Cirque-close-middel_9ac7a20e79.jpg',
      name: 'Halloween Nights',
      slug: 'halloween-nights',
      pois: await this.getHalloweenEvents(),
      subTitle: 'Discover your own fear',
      type: EventCategory.HALLOWEEN,
    }, {
      dates: [
        '2024-10-05', '2024-10-06',
        '2024-10-12', '2024-10-13',
        '2024-10-19', '2024-10-20', '2024-10-21', '2024-10-22', '2024-10-23', '2024-10-24', '2024-10-25', '2024-10-26', '2024-10-27', '2024-10-28', '2024-10-29', '2024-10-30', '2024-10-31',
        '2024-11-01', '2024-11-02', '2024-11-03',
        '2024-11-09', '2024-11-10',
      ],
      image: 'https://www.toverland.com/fileadmin/_processed_/a/8/csm_Days-Pumpkin-2-middel_275d8fcc38.jpg',
      name: 'Halloween Days',
      slug: 'halloween-days',
      pois: await this.getHalloweenEvents(),
      subTitle: 'Samen griezelen met een lach',
      type: EventCategory.HALLOWEEN,
    }, {
      name: 'Winter Feelings',
      subTitle: 'Toverland in Winterse sferen',
      slug: 'winter-feelings',
      type: EventCategory.WINTER,
      image: 'https://www.looopings.nl/img/foto/23/1204eentover32.jpg',
    }];
  }
}
