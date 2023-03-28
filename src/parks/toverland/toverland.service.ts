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
      supportsTranslations: true
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
        throw new HttpException("message", 500, {
          cause: new Error('Failed to fetch rides: ' + exception.toString())
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
        throw new HttpException('message', 500, {
          cause: new Error('Failed to fetch restaurants: ' + exception.toString())
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
        throw new HttpException('message', 500, {
          cause: new Error('Failed to fetch shows: ' + exception.toString())
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
    ];

    return []
      .concat
      .apply([], await Promise.all(promises));
  }
}
