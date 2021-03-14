import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ThemeParkService } from '../_services/themepark/theme-park.service';
import { ThemePark } from '../_interfaces/park.interface';
import * as Sentry from '@sentry/node';
import { ConfigService } from '@nestjs/config';
import { ThemeParkSupports } from '../_interfaces/park-supports.interface';
import { Poi } from '../_interfaces/poi.interface';
import { PhantasialandTransferService } from './phantasialand-transfer/phantasialand-transfer.service';
import { PoiCategory } from '../_interfaces/poiCategories.enum';

@Injectable()
export class PhantasialandService extends ThemeParkService {
  private readonly _phantasialandApiUrl: string;
  private readonly _phantasialandApiToken: string;

  constructor(private readonly configService: ConfigService,
              private readonly httpService: HttpService,
              private readonly phantasialandTransferService: PhantasialandTransferService) {
    super();

    this._phantasialandApiUrl = this.configService.get('PHANTASIALAND_API_URL');
    this._phantasialandApiToken = this.configService.get('PHANTASIALAND_API_TOKEN');
  }

  getInfo(): ThemePark {
    return {
      id: 'phantasialand',
      name: 'Phantasialand',
      description: 'Phantasialand is een attractiepark in het Duitse Brühl ten zuidwesten van Keulen. Het attractiepark is begonnen als sprookjespark en inmiddels uitgegroeid tot een van de best bezochte attractieparken van Europa.',
      countryCode: 'de',
      image: 'https://static.phlcdn.de/files/uploads/themenpark/images/sommer/berlin/ga_keyvisual_berlin.jpg',
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsPois: true,
      supportsRestaurantWaitTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: false,
      supportsRides: true,
      supportsShowTimes: false,
      supportsShows: true,
    };
  }

  async getPois(): Promise<Poi[]> {
    return this
      .request<any[]>('pois?filter[where][seasons][like]=%25SUMMER%25&compact=true')
      .then((axiosRidesData) => this.phantasialandTransferService.PhantasialandPoisToPois(axiosRidesData.data));
  }

  async getRides(): Promise<Poi[]> {
    return this.getPois().then(pois => pois.filter(poi => poi.category === PoiCategory.ATTRACTION));
  }

  async getRestaurants(): Promise<Poi[]> {
    return this.getPois().then(pois => pois.filter(poi => poi.category === PoiCategory.RESTAURANT));
  }

  async getShows(): Promise<Poi[]> {
    return this.getPois().then(pois => pois.filter(poi => poi.category === PoiCategory.SHOW));
  }

  private async request<T>(url: String) {
    const fullUrl = this._phantasialandApiUrl + '/' + url + '&access_token=' + this._phantasialandApiToken;

    return this
      .httpService
      .get<T>(fullUrl)
      .toPromise()
      .then(value => {
        return value;
      })
      .catch(reason => {
        Sentry.captureException(reason);
        throw new InternalServerErrorException();
      });
  }
}
