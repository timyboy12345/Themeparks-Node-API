import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ThemeParkService } from '../../_services/themepark/theme-park.service';
import { ThemePark } from '../../_interfaces/park.interface';
import { Poi } from '../../_interfaces/poi.interface';
import { PoiCategory } from '../../_interfaces/poiCategories.enum';
import { ConfigService } from '@nestjs/config';
import { WalibiHollandRide } from './interfaces/ride.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import * as Sentry from '@sentry/node';

@Injectable()
export class WalibiHollandService extends ThemeParkService {
  private _walibiHollandApiUrl: string;

  constructor(private httpService: HttpService,
              private readonly configService: ConfigService) {
    super();

    this._walibiHollandApiUrl = this.configService.get<string>('WALIBI_HOLLAND_API_URL');
  }

  getInfo(): ThemePark {
    return {
      id: 'walibi_holland',
      name: 'Walibi Holland',
      description: 'Walibi Holland is een attractiepark, gelegen in Biddinghuizen in de Nederlandse provincie Flevoland. Voorheen heette dit park Walibi World, daarvoor Six Flags Holland, daarvoor Walibi Flevo, terwijl het park startte als Flevohof.',
      countryCode: 'nl',
      image: 'https://www.walibi.nl/sites/default/files/styles/1280x711/public/content/editorial/2020-01/Goliath-ALG-04_0.jpg?itok=SGL1LdeZ',
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsPois: true,
      supportsRestaurantWaitTimes: false,
      supportsRestaurants: false,
      supportsRideWaitTimes: true,
      supportsRides: true,
      supportsShowTimes: false,
      supportsShows: false,
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
            location: {
              lat: ride.location.latitude,
              lng: ride.location.longitude,
            },
            images: imageUrls,
          };

          return r;
        });
      });
  }

  async getPois() {
    const promises = [
      this.getRides(),
    ];
    return []
      .concat
      .apply([], await Promise.all(promises));
  }

  private async request<T>(url: string) {
    const fullUrl = this._walibiHollandApiUrl + url;

    return this
      .httpService
      .get<T>(fullUrl)
      .toPromise()
      .catch(reason => {
        Sentry.captureException(reason);
        throw new InternalServerErrorException();
      });
  }
}
