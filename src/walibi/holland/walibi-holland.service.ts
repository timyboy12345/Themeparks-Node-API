import { HttpService, Injectable } from '@nestjs/common';
import { ThemeparkService } from '../../_services/themepark/themepark.service';
import { ThemePark } from '../../_interfaces/park.interface';
import { Poi } from '../../_interfaces/poi.interface';
import { PoiCategory } from '../../_interfaces/poiCategories.enum';
import { ConfigService } from '@nestjs/config';
import { WalibiHollandRide } from './interfaces/ride.interface';

@Injectable()
export class WalibiHollandService extends ThemeparkService {
  private _walibiHollandApiUrl: string;

  constructor(private httpService: HttpService,
              private readonly configService: ConfigService) {
    super();

    this._walibiHollandApiUrl = this.configService.get("WALIBI_HOLLAND_API_URL");
  }

  getInfo(): ThemePark {
    return {
      id: 'walibi_holland',
      name: 'Walibi Holland',
      countryCode: 'nl',
      image: 'https://www.walibi.nl/sites/default/files/styles/1280x711/public/content/editorial/2020-01/Goliath-ALG-04_0.jpg?itok=SGL1LdeZ',
    };
  }

  async getRides(): Promise<Poi[]> {
    return this.request<WalibiHollandRide[]>('/rides')
      .then((axiosRidesData) => {
        return axiosRidesData.data.map((ride) => {
          const imageUrls = ride.images.map((img, i) => {
            return `https://cache.walibifastlane.nl/api/api/guest/rides/${ride.id}/images/${i}?v=${img}`;
          });

          const r: Poi = {
            id: `${ride.id}`,
            category: PoiCategory.ATTRACTION,
            title: ride.name,
            image_url: imageUrls[0],
            description: ride.description,
            original: ride,
            entrance: {
              world: {
                lat: ride.location.latitude,
                lng: ride.location.longitude,
              },
            },
            images: imageUrls
          };

          return r;
        });
      });
  }

  private async request<T>(url: string) {
    const fullUrl = this._walibiHollandApiUrl + url;

    return this
      .httpService
      .get<T>(fullUrl)
      .toPromise();
  }
}
