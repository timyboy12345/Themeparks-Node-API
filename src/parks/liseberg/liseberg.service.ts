import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ThemeParkService } from '../../_services/themepark/theme-park.service';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { ConfigService } from '@nestjs/config';
import { LisebergApiResponseItemInterface } from './interfaces/liseberg-api-response.interface';
import * as Sentry from '@sentry/node';
import { LisebergTransferService } from './liseberg-transfer/liseberg-transfer.service';
import { Poi } from '../../_interfaces/poi.interface';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class LisebergService extends ThemeParkService {
  constructor(private readonly configService: ConfigService,
              private readonly httpService: HttpService,
              private readonly lisebergTransferService: LisebergTransferService) {
    super();
  }

  getInfo(): ThemePark {
    return {
      id: 'liseberg',
      name: 'Liseberg',
      description: 'Liseberg is een attractiepark in Göteborg in Zweden. Het park is geopend in 1923, is gelegen aan de snelweg en is te zien bij binnenkomst van Göteborg. Het park ontvangt per jaar ongeveer 3 miljoen bezoekers, waarmee het het meest bezochte attractiepark van Scandinavië is.',
      image: 'https://www.liseberg.se/optimized/facebook/046e6139/globalassets/parken/parkvyer/hela-parken-vy.jpg',
      parkType: ParkType.THEMEPARK,
      countryCode: 'se',
      timezone: 'Europe/Stockholm',
      location: {
        lat: 57.6962467,
        lng: 11.9856468,
      },
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsRideWaitTimesHistory: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsRideWaitTimes: true,
      supportsRestaurants: true,
      supportsShows: false,
      supportsRides: true,
      supportsShops: true,
      supportsShopOpeningTimes: false,
      supportsPoiLocations: true,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsShowTimes: false,
      supportsAnimals: false,
      supportsTranslations: false,
      textType: "UNDEFINED",
      supportsEvents: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    const promises = [
      this.getRides(),
      this.getRestaurants(),
      this.getShops(),
      this.getServices(),
      this.getGames(),
    ];

    return []
      .concat
      .apply([], await Promise.all(promises));
  }

  async getRides(): Promise<Poi[]> {
    return this.requestRideDetails()
      .then(value => this.lisebergTransferService.transferPoisToPois(value));
  }

  async getShops(): Promise<Poi[]> {
    return this.request('shops')
      .then(value => this.lisebergTransferService.transferPoisToPois(value));
  }

  async getRestaurants(): Promise<Poi[]> {
    return this.request('food-drinks')
      .then(value => this.lisebergTransferService.transferPoisToPois(value));
  }

  async getGames(): Promise<Poi[]> {
    return this.request('pentathlon')
      .then(value => this.lisebergTransferService.transferPoisToPois(value));
  }

  async getServices(): Promise<Poi[]> {
    return this.request('services')
      .then(value => this.lisebergTransferService.transferPoisToPois(value));
  }

  /**
   * Request data from the Liseberg API
   * @private
   */
  private requestRideDetails(): Promise<LisebergApiResponseItemInterface[]> {
    const baseUrl = this.configService.get('LISEBERG_API_URL');
    const url = `${baseUrl}/en/api/app/attractions`;

    return this.httpService.get(url)
      .toPromise()
      .then(value => value.data)
      .catch((exception) => {
        Sentry.captureException(exception);
        console.error(exception);
        throw new InternalServerErrorException(exception);
      });
  }

  /**
   * Request data from the Liseberg API
   * @param filter
   * @private
   */
  private request(filter: string): Promise<LisebergApiResponseItemInterface[]> {
    const baseUrl = this.configService.get('LISEBERG_API_URL');
    const url = `${baseUrl}/en/api/map/poisbyfilters?season=3&filters=${filter}`;

    return this.httpService.get(url)
      .toPromise()
      .then(value => value.data)
      .catch((exception) => {
        Sentry.captureException(exception);
        console.error(exception);
        throw new InternalServerErrorException(exception);
      });
  }
}
