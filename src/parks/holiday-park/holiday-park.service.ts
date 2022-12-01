import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ThemeParkService } from '../../_services/themepark/theme-park.service';
import { ConfigService } from '@nestjs/config';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { Poi } from '../../_interfaces/poi.interface';
import { HolidayParkTransferService } from './holiday-park-transfer/holiday-park-transfer.service';
import * as Sentry from '@sentry/node';
import { HolidayParkAttractionsResponseInterface } from './interfaces/holiday-park-attractions-response.interface';
import { HolidayParkPageResponseInterface } from './interfaces/holiday-park-page-response.interface';

@Injectable()
export class HolidayParkService extends ThemeParkService {
  private readonly _holidayParkApiUrl: String;
  private readonly _holidayParkApiToken: String;

  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService,
              private readonly holidayParkTransferService: HolidayParkTransferService) {
    super();

    this._holidayParkApiUrl = this.configService.get('HOLIDAY_PARK_API_URL');
    this._holidayParkApiToken = this.configService.get('HOLIDAY_PARK_API_TOKEN');
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
        lng: 8.290165506
      }
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
      supportsShowTimes: false,
      supportsShows: false,
      supportsShops: true,
      supportsShopOpeningTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: false,
      supportsAnimals: false,
      supportsTranslations: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    const promises = [
      this.getRides(),
      this.getRestaurants(),
      this.getShops(),
    ];

    return []
      .concat
      .apply([], await Promise.all(promises));
  }

  // TODO: Find out if locations still work
  async getRides(): Promise<Poi[]> {
    // return this.attachLocations(await this.request<HolidayParkAttractionsResponseInterface>('attraction').then(value => this.holidayParkTransferService.HolidayParkAttractionsResponseToPois(value.data)));
    return await this.request<HolidayParkAttractionsResponseInterface>('attraction').then(r => this.holidayParkTransferService.transferRidesToPois(r.data));
  }

  async getRestaurants(): Promise<Poi[]> {
    // return this.attachLocations(await this.request<HolidayParkPageResponseInterface>('page').then(value => this.holidayParkTransferService.HolidayParkRestaurantsResponseToPois(value.data)));
    return await this.request<HolidayParkPageResponseInterface>('page').then(r => this.holidayParkTransferService.transferRestaurantsToPois(r.data));
  }

  async getShops(): Promise<Poi[]> {
    // return this.attachLocations(await this.request<HolidayParkPageResponseInterface>('page').then(value => this.holidayParkTransferService.HolidayParkShopsResponseToPois(value.data)));
    return await this.request<HolidayParkPageResponseInterface>('page').then(r => this.holidayParkTransferService.transferShopsToPois(r.data));
  }

  // TODO: Find out if shows can be implemented
  // async getShows(): Promise<Poi[]> {
  //   return await this.request<HolidayParkPageResponseInterface>("show").then(value => this.holidayParkTransferService.)
  // }

  // private async attachLocations(pois: Poi[]): Promise<Poi[]> {
  //   const locationData = await this.httpService.get<HolidayParkLocationsResponseInterface>('https://www.holidaypark.de/de/api/v1.0/locations/holiday-park?access_token=' + this._holidayParkApiToken).toPromise();
  //
  //   for (let key in locationData.data.en) {
  //     console.log(key);
  //   }
  //
  //   return pois;
  // }

  private request<T>(url: string) {
    const fullUrl = this._holidayParkApiUrl + '/' + url + '?access_token=' + this._holidayParkApiToken;

    return this
      .httpService
      .get<T>(fullUrl)
      .toPromise()
      .then(value => {
        return value;
      })
      .catch(reason => {
        Sentry.captureException(reason);
        console.log(reason);
        throw new InternalServerErrorException();
      });
  }
}
