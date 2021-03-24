import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ThemePark } from '../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import * as Sentry from '@sentry/node';
import { ConfigService } from '@nestjs/config';
import { Poi } from '../../_interfaces/poi.interface';
import { WalibiBelgiumTransferService } from './walibi-belgium-transfer/walibi-belgium-transfer.service';
import { WalibiBelgiumEntertainmentsResponse } from './interfaces/walibi-belgium-entertainments-response.interface';
import { ThemeParkService } from '../../_services/themepark/theme-park.service';

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
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: false,
      supportsRides: true,
      supportsShowTimes: false,
      supportsShows: true,
      supportsPoiLocations: true,
      supportsShops: true,
      supportsShopOpeningTimes: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    const promises = [
      this.getRides(),
      this.getShops(),
      this.getShows(),
      this.getRestaurants(),
    ];

    return []
      .concat
      .apply([], await Promise.all(promises));
  }

  async getRides(): Promise<Poi[]> {
    return this.request<WalibiBelgiumEntertainmentsResponse>('/entertainments?_format=json').then(axiosEntertainmentsData => {
      return this.walibiBelgiumTransferService.transferShowsToPois(axiosEntertainmentsData.data.entertainment);
    });
  }

  async getShops(): Promise<Poi[]> {
    return this.request<WalibiBelgiumEntertainmentsResponse>('/entertainments?_format=json').then(axiosEntertainmentsData => {
      return this.walibiBelgiumTransferService.transferShowsToPois(axiosEntertainmentsData.data.shop);
    });
  }

  async getShows(): Promise<Poi[]> {
    return this.request<WalibiBelgiumEntertainmentsResponse>('/entertainments?_format=json').then(axiosEntertainmentsData => {
      return this.walibiBelgiumTransferService.transferShowsToPois(axiosEntertainmentsData.data.show);
    });
  }

  async getRestaurants(): Promise<Poi[]> {
    return this.request<WalibiBelgiumEntertainmentsResponse>('/entertainments?_format=json').then(axiosEntertainmentsData => {
      return this.walibiBelgiumTransferService.transferShowsToPois(axiosEntertainmentsData.data.restaurant);
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
