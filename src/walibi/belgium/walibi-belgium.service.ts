import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ThemeParkService } from '../../_services/themepark/theme-park.service';
import { ThemePark } from '../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import * as Sentry from '@sentry/node';
import { ConfigService } from '@nestjs/config';
import { Poi } from '../../_interfaces/poi.interface';
import { WalibiBelgiumTransferService } from './walibi-belgium-transfer/walibi-belgium-transfer.service';
import { WalibiBelgiumEntertainmentsResponse } from './interfaces/walibi-belgium-entertainments-response.interface';
import { PoiCategory } from '../../_interfaces/poiCategories.enum';

@Injectable()
export class WalibiBelgiumService extends ThemeParkService {
  private readonly _walibiBelgiumApiUrl: string;
  private readonly _walibiBelgiumApiToken: string;

  constructor(private readonly configService: ConfigService,
              private readonly httpService: HttpService,
              private readonly walibiBelgiumTransferService: WalibiBelgiumTransferService) {
    super();

    this._walibiBelgiumApiUrl = this.configService.get('WALIBI_BELGIUM_API_URL');
    this._walibiBelgiumApiToken = this.configService.get('WALIBI_BELGIUM_API_TOKEN');
  }

  getInfo(): ThemePark {
    return {
      id: 'walibi_belgium',
      name: 'Walibi Belgium',
      description: 'Walibi Belgium is een pretpark in de Belgische gemeente Waver.',
      image: 'https://www.walibi.be/sites/default/files/styles/1280x711/public/content/editorial/2020-06/W18-TIKIWAKA_0629-1.jpg?itok=69V5PXVt',
      countryCode: 'be',
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
      supportsShows: true
    }
  }

  async getPois(): Promise<Poi[]> {
    return this.request<WalibiBelgiumEntertainmentsResponse>('/entertainments?_format=json').then(axiosEntertainmentsData => {
      return this.walibiBelgiumTransferService.WalibiBelgiumEntertainmentResponseToPois(axiosEntertainmentsData.data);
    })
  }

  async getRestaurants(): Promise<Poi[]> {
    return this.getPois().then((pois) => {
      return pois.filter(poi => [PoiCategory.RESTAURANT, PoiCategory.SNACKBAR].includes(poi.category));
    });
  }

  async getRides(): Promise<Poi[]> {
    return this.getPois().then((pois) => {
      return pois.filter(poi => poi.category === PoiCategory.ATTRACTION);
    });
  }

  async getShows(): Promise<Poi[]> {
    return this.getPois().then((pois) => {
      return pois.filter(poi => poi.category === PoiCategory.SHOW);
    });
  }

  private request<T>(url: string) {
    const headers = {
      'Authorization': `Bearer ${this._walibiBelgiumApiToken}`,
    };

    const fullUrl = this._walibiBelgiumApiUrl + url;

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
}
