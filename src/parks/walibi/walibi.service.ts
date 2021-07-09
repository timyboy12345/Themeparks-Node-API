import { HttpService, Injectable, InternalServerErrorException, NotImplementedException } from '@nestjs/common';
import { ThemeParkService } from '../../_services/themepark/theme-park.service';
import { Poi } from '../../_interfaces/poi.interface';
import { WalibiEntertainmentsResponse } from './interfaces/walibi-entertainments-response.interface';
import * as Sentry from '@sentry/node';
import { ConfigService } from '@nestjs/config';
import { WalibiTransferService } from './walibi-transfer/walibi-transfer.service';

@Injectable()
export class WalibiService extends ThemeParkService {
  private readonly _walibiApiUrl: string;
  private readonly _walibiApiToken: string;

  constructor(private readonly configService: ConfigService,
              private readonly httpService: HttpService,
              private readonly walibiTransferService: WalibiTransferService) {
    super();

    this._walibiApiUrl = this.configService.get('WALIBI_API_URL');
    this._walibiApiToken = this.configService.get('WALIBI_API_TOKEN');
  }

  async getPois(): Promise<Poi[]> {
    return this.request<WalibiEntertainmentsResponse>('/entertainments?_format=json').then(axiosEntertainmentsData => {
      let pois: Poi[] = [];

      for (const [key, value] of Object.entries(axiosEntertainmentsData.data)) {
        pois = pois.concat(this.walibiTransferService.transferPoisToPois(value));
      }

      return pois;
    });
  }

  async getRides(): Promise<Poi[]> {
    return this.request<WalibiEntertainmentsResponse>('/entertainments?_format=json').then(axiosEntertainmentsData => {
      return this.walibiTransferService.transferRidesToPois(axiosEntertainmentsData.data.entertainment);
    });
  }

  async getShops(): Promise<Poi[]> {
    return this.request<WalibiEntertainmentsResponse>('/entertainments?_format=json').then(axiosEntertainmentsData => {
      return this.walibiTransferService.transferShopsToPois(axiosEntertainmentsData.data.shop);
    });
  }

  async getShows(): Promise<Poi[]> {
    return this.request<WalibiEntertainmentsResponse>('/entertainments?_format=json').then(axiosEntertainmentsData => {
      return this.walibiTransferService.transferShowsToPois(axiosEntertainmentsData.data.show);
    });
  }

  async getRestaurants(): Promise<Poi[]> {
    return this.request<WalibiEntertainmentsResponse>('/entertainments?_format=json').then(axiosEntertainmentsData => {
      return this.walibiTransferService.transferRestaurantsToPois(axiosEntertainmentsData.data.restaurant);
    });
  }

  public getLocale(): string {
    throw new NotImplementedException("Could not get locale");
  }

  public getApiUrl() {
    return `${this._walibiApiUrl}${this.getLocale()}/api`;
  }

  private request<T>(url: string) {
    const headers = {
      'User-Agent': 'Walibi NL/4.0.11 (nl.walibi.corporate; build:155; iOS 14.5.0) Alamofire/5.4.3'
    };

    const fullUrl = this.getApiUrl() + url;

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
