import { HttpException, HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ThemeParkService } from '../_services/themepark/theme-park.service';
import { Poi } from '../_interfaces/poi.interface';
import { ToverlandRide } from './interfaces/toverland_ride.interface';
import { PoiCategory } from '../_interfaces/poiCategories.enum';
import { ThemePark } from '../_interfaces/park.interface';
import { ToverlandFoodAndDrink } from './interfaces/toverland_foodanddrink.interface';
import { ConfigService } from '@nestjs/config';
import { ThemeParkSupports } from '../_interfaces/park-supports.interface';
import * as Sentry from '@sentry/node';

@Injectable()
export class ToverlandService extends ThemeParkService {
  private toverlandApiUrl: string;
  private toverlandApiToken: string;

  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService) {
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
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsPois: true,
      supportsRestaurantWaitTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: true,
      supportsRides: true,
      supportsShowTimes: false,
      supportsShows: false,
    };
  }

  async getRides(): Promise<Poi[]> {
    return this.request<ToverlandRide[]>('/park/ride/operationInfo/list')
      .then((axiosRidesData) => {
        return axiosRidesData.data.map((ride) => {
          const r: Poi = {
            id: `${ride.last_status.ride_id ?? ride.id}`,
            category: PoiCategory.ATTRACTION,
            title: ride.name,
            image_url: ride.thumbnail,
            description: ride.description.en,
            original: ride,
            location: {
              lat: parseFloat(ride.latitude),
              lng: parseFloat(ride.longitude),
            },
          };

          return r;
        });
      })
      .catch((reason) => {
        throw new HttpException('Failed to fetch rides: ' + reason.toString(), 500);
      });
  }

  async getRestaurants(): Promise<Poi[]> {
    return this
      .request<ToverlandFoodAndDrink[]>('/park/foodAndDrinks/operationInfo/list')
      .then((axiosRidesData) => {
        return axiosRidesData.data.map((restaurant) => {
          const r: Poi = {
            id: `${restaurant.last_status.id ?? restaurant.id}`,
            category: PoiCategory.RESTAURANT,
            title: restaurant.name,
            image_url: restaurant.thumbnail,
            description: restaurant.description.en,
            original: restaurant,
            location: {
              lat: parseFloat(restaurant.latitude),
              lng: parseFloat(restaurant.longitude),
            },
          };

          return r;
        });
      });
  }

  private async request<T>(url: string) {
    const headers = {
      'Authorization': `Bearer ${this.toverlandApiToken}`,
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
        throw new InternalServerErrorException();
      });
  }

  async getPois(): Promise<Poi[]> {
    const promises = [
      this.getRides(),
      this.getRestaurants(),
    ];

    return []
      .concat
      .apply([], await Promise.all(promises));
  }
}
