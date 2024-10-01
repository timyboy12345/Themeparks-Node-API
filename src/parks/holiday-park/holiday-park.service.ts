import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ThemeParkService } from '../../_services/themepark/theme-park.service';
import { ConfigService } from '@nestjs/config';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { Poi } from '../../_interfaces/poi.interface';
import { HolidayParkTransferService } from './holiday-park-transfer/holiday-park-transfer.service';
import * as Sentry from '@sentry/node';
import { HolidayParkAttractionsResponseInterface } from './interfaces/holiday-park-attractions-response.interface';
import { HolidayParkPageResponseInterface } from './interfaces/holiday-park-page-response.interface';
import { HttpService } from '@nestjs/axios';
import { LocaleService } from '../../_services/locale/locale.service';
import { HolidayParkTokenInterface } from './interfaces/holiday-park-token.interface';

@Injectable()
export class HolidayParkService extends ThemeParkService {
  private readonly _holidayParkApiUrl: String;
  private _holidayParkApiToken: String;

  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService,
              private readonly holidayParkTransferService: HolidayParkTransferService,
              private readonly localeService: LocaleService) {
    super();

    this._holidayParkApiUrl = this.configService.get('HOLIDAY_PARK_API_URL');
    // this._holidayParkApiToken = this.configService.get('HOLIDAY_PARK_API_TOKEN');
  }

  getInfo(): ThemePark {
    return {
      id: 'holiday-park',
      name: 'Holiday Park',
      description: 'Holiday Park is een attractiepark gelegen in Haßloch in de Duitse deelstaat Rijnland-Palts. Het maakt sinds 2010 deel uit van de pretparken van de Plopsa-groep.',
      image: 'https://www.holidaypark.de/sites/default/files/public/brand/logos/Holiday%20Park.jpg',
      countryCode: 'de',
      parkType: ParkType.THEMEPARK,
      location: {
        lat: 49.318498726,
        lng: 8.290165506,
      },
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsPoiLocations: false,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: false,
      supportsRides: true,
      supportsShowTimes: true,
      supportsShows: true,
      supportsShops: true,
      supportsShopOpeningTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: false,
      supportsAnimals: false,
      supportsTranslations: false,
      supportsEvents: false,
    };
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
    return await this.request<HolidayParkAttractionsResponseInterface>('attraction').then(r => this.holidayParkTransferService.transferRidesToPois(r.data, this.localeService.getLocale()));
  }

  async getRestaurants(): Promise<Poi[]> {
    // return this.attachLocations(await this.request<HolidayParkPageResponseInterface>('page').then(value => this.holidayParkTransferService.HolidayParkRestaurantsResponseToPois(value.data)));
    return await this.request<HolidayParkPageResponseInterface>('page').then(r => this.holidayParkTransferService.transferRestaurantsToPois(r.data, this.localeService.getLocale()));
  }

  async getShops(): Promise<Poi[]> {
    // return this.attachLocations(await this.request<HolidayParkPageResponseInterface>('page').then(value => this.holidayParkTransferService.HolidayParkShopsResponseToPois(value.data)));
    return await this.request<HolidayParkPageResponseInterface>('page').then(r => this.holidayParkTransferService.transferShopsToPois(r.data, this.localeService.getLocale()));
  }

  async getShows(): Promise<Poi[]> {
    return await this.request<HolidayParkPageResponseInterface>('show').then(value => this.holidayParkTransferService.transferShowsToPois(value.data, this.localeService.getLocale()));
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
    if (!this._holidayParkApiToken) {
      this._holidayParkApiToken = await this.getToken();
    }

    const fullUrl = this._holidayParkApiUrl + '/' + url + '?access_token=' + this._holidayParkApiToken;

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
    const url = 'https://www.holidaypark.de/de/api/v1.0/token/0001';

    return this.httpService.post<HolidayParkTokenInterface>(url, { 'clientSecret': '6YqyzzOsaNkxDkHmwhgK%%2Fw%%3D%%3D', 'clientId': '7xfwRB8iK1tbf3cYiABI%%2Fw%%3D%%3D' })
      .toPromise()
      .then((r) => r.data.accessToken)
      .catch((e) => {
        Sentry.captureException(e);
        console.error(e);
        throw new InternalServerErrorException();
      });
  }
}
