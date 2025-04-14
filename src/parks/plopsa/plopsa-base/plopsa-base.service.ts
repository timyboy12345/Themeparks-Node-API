import { Injectable, InternalServerErrorException, NotImplementedException } from '@nestjs/common';
import { ThemeParkService } from '../../../_services/themepark/theme-park.service';
import { HttpService } from '@nestjs/axios';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { Poi } from '../../../_interfaces/poi.interface';
import * as Sentry from '@sentry/node';
import { PlopsaDetailsInterface } from '../interfaces/plopsa-details.interface';
import { PlopsaTransferService } from '../plopsa-transfer/plopsa-transfer.service';
import { PlopsaTokenInterface } from '../interfaces/plopsa-token.interface';
import { ConfigService } from '@nestjs/config';
import { LocaleService } from '../../../_services/locale/locale.service';

@Injectable()
export class PlopsaBaseService extends ThemeParkService {
  private readonly _apiUrl: string;
  private _apiToken: string;
  private readonly _clientId: string;
  private readonly _clientSecret: string;

  constructor(private readonly httpService: HttpService,
              private readonly transferService: PlopsaTransferService,
              private readonly config: ConfigService,
              private readonly localeService: LocaleService) {
    super();

    this._apiUrl = config.get('PLOPSA_API_URL');
    this._clientId = config.get('PLOPSA_CLIENT_ID');
    this._clientSecret = config.get('PLOPSA_CLIENT_SECRET');
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
      supportsShowTimes: false,
      supportsRestaurantOpeningTimes: false,
      supportsPois: true,
      supportsPoiLocations: false,
      supportsShopOpeningTimes: false,
      supportsShops: true,
      supportsRides: true,
      supportsShows: true,
      supportsRestaurants: true,
      supportsRideWaitTimes: true,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: false,
      supportsRideWaitTimesHistory: true,
      supportsTranslations: false,
      textType: 'UNDEFINED',
      supportsEvents: false,
    };
  }

  public getParkSlug(): string {
    throw new NotImplementedException('getParkSlug is not implemented');
  }

  async getPois(): Promise<Poi[]> {
    const promises = [
      this.getRides(),
      this.getRestaurants(),
      this.getShops(),
      this.getShows(),
    ];

    return []
      .concat
      .apply([], await Promise.all(promises));
  }

  async getRides(): Promise<Poi[]> {
    // return this.attachLocations(await this.request<HolidayParkAttractionsResponseInterface>('attraction').then(value => this.holidayParkTransferService.HolidayParkAttractionsResponseToPois(value.data)));
    return await this.request<PlopsaDetailsInterface>('attraction').then(r => this.transferService.transferRidesToPois(r.data, this.localeService.getLocale()));
  }

  async getRestaurants(): Promise<Poi[]> {
    // return this.attachLocations(await this.request<HolidayParkPageResponseInterface>('page').then(value => this.holidayParkTransferService.HolidayParkRestaurantsResponseToPois(value.data)));
    return await this.request<PlopsaDetailsInterface>('page').then(r => this.transferService.transferRestaurantsToPois(r.data, this.localeService.getLocale()));
  }

  async getShops(): Promise<Poi[]> {
    // return this.attachLocations(await this.request<HolidayParkPageResponseInterface>('page').then(value => this.holidayParkTransferService.HolidayParkShopsResponseToPois(value.data)));
    return await this.request<PlopsaDetailsInterface>('page').then(r => this.transferService.transferShopsToPois(r.data, this.localeService.getLocale()));
  }

  async getShows(): Promise<Poi[]> {
    return await this.request<PlopsaDetailsInterface>('show').then(value => this.transferService.transferShowsToPois(value.data, this.localeService.getLocale()));
  }

  // Holiday Park has moved to an internal lat/lng system
  // private async attachLocations(pois: Poi[]): Promise<Poi[]> {
  //   const locationData = await this.httpService.get<HolidayParkLocationsResponseInterface>('https://www.holidaypark.de/de/api/v1.0/locations/holiday-park?access_token=' + this._holidayParkApiToken).toPromise();
  //
  //   for (let key in locationData.data.en) {
  //     console.log(key);
  //   }
  //
  //   return pois;
  // }

  private async request<T>(url: string) {
    if (!this._apiToken) {
      this._apiToken = await this.getToken();
    }

    const fullUrl = `${this._apiUrl}/de/api/v1.0/details/all/${this.getParkSlug()}/${url}?access_token=${this._apiToken}`;

    return this
      .httpService
      .get<T>(fullUrl)
      .toPromise()
      .then(value => {
        return value;
      })
      .catch((exception) => {
        Sentry.captureException(exception);
        console.error(exception);
        throw new InternalServerErrorException();
      });
  }

  private getToken() {
    const url = 'https://www.old.plopsa.com/de/api/v1.0/token/0001';

    return this.httpService.post<PlopsaTokenInterface>(url, { 'clientSecret': this._clientSecret, 'clientId': this._clientId })
      .toPromise()
      .then((r) => r.data.accessToken)
      .catch((e) => {
        Sentry.captureException(e);
        console.error(e);
        throw new InternalServerErrorException();
      });
  }
}
