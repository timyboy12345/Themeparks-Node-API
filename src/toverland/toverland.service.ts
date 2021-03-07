import { HttpService, Injectable } from '@nestjs/common';
import { ThemeparkService } from '../_services/themepark/themepark.service';
import { Poi } from '../_interfaces/poi.interface';
import { ToverlandRide } from './interfaces/toverland_ride.interface';
import { PoiCategory } from '../_interfaces/poiCategories.enum';
import { ThemePark } from '../_interfaces/park.interface';
import { ToverlandFoodAndDrink } from './interfaces/toverland_foodanddrink.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ToverlandService extends ThemeparkService {
  private toverlandApiUrl: string;
  private toverlandApiToken: string;

  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService) {
    super();

    this.toverlandApiUrl = configService.get<string>('TOVERLAND_API_URL');
    this.toverlandApiToken = configService.get<string >('TOVERLAND_API_AUTHENTICATION');
  }

  getInfo(): ThemePark {
    return {
      id: 'toverland',
      image: '',
      countryCode: 'nl',
      name: 'Toverland',
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
            entrance: {
              world: {
                lat: ride.latitude,
                lng: ride.longitude,
              },
            },
          };

          return r;
        });
      });
  }

  async getRestaurants() {
    return this.request<ToverlandFoodAndDrink[]>('/park/ride/operationInfo/list')
      .then((axiosRidesData) => {
        return axiosRidesData.data.map((ride) => {
          const r: Poi = {
            id: `${ride.last_status.id ?? ride.id}`,
            category: PoiCategory.RESTAURANT,
            title: ride.name,
            image_url: ride.thumbnail,
            description: ride.description.en,
            original: ride,
            entrance: {
              world: {
                lat: ride.latitude,
                lng: ride.longitude,
              },
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
      .toPromise();
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
