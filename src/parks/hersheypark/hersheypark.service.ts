import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { Poi } from '../../_interfaces/poi.interface';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import * as Sentry from '@sentry/node';
import { HersheyparkTransferService } from './hersheypark-transfer/hersheypark-transfer.service';
import { ThroughPoisThemeParkService } from '../../_services/themepark/through-pois-theme-park.service';
import { HersheyparkIndexResponse } from './interfaces/hersheypark-index-response.interface';
import { ThemeParkOpeningTimes } from '../../_interfaces/park-openingtimes.interface';
import * as moment from 'moment-timezone';

@Injectable()
export class HersheyparkService extends ThroughPoisThemeParkService {
  private readonly _apiUrl = undefined;
  private readonly _apiKey = undefined;

  constructor(configService: ConfigService,
              private readonly http: HttpService,
              private readonly transfer: HersheyparkTransferService) {
    super();

    this._apiUrl = configService.get('HERSHEYPARK_API_URL');
    this._apiKey = configService.get('HERSHEYPARK_API_KEY');
  }

  getInfo(): ThemePark {
    return {
      id: 'hersheypark',
      countryCode: 'us',
      name: 'Hersheypark',
      image: 'https://www.hersheypa.com/assets/images/things-to-do/attractions/hersheypark/hershey-pa-candymonium-reeses-hero-01-2023.jpg',
      description: 'Hersheypark is een attractiepark in Hershey, Pennsylvania dicht bij de Hershey chocoladefabriek gesitueerd. Hershey Park werd in 1907 geopend als ontspanningsplaats voor de medewerkers van the Hershey Chocolate Company, een Amerikaanse snoepfabriek. Later besloot het bedrijf het park open te stellen voor iedereen.',
      location: {
        lat: 40.288666325275635,
        lng: -76.65457523862625,
      },
      parkType: ParkType.THEMEPARK,
      timezone: 'America/New_York',
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: true,
      supportsHalloween: false,
      supportsOpeningTimes: true,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: true,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: true,
      supportsRideWaitTimesHistory: false,
      supportsRides: true,
      supportsShopOpeningTimes: false,
      supportsShops: true,
      supportsShowTimes: false,
      supportsShows: true,
      supportsTranslations: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    return this.getIndex()
      .then((res) => {
        return this.transfer.transferRidesToPois(res.data.rides)
          .concat(this.transfer.transferRestaurantsToPois(res.data.restaurants))
          .concat(this.transfer.transferShopsToPois(res.data.shops))
          .concat(this.transfer.transferShopsToPois(res.data.shops))
          .concat(this.transfer.transferAnimalsToPois(res.data.animals));
      })
      .catch((exception) => {
        Sentry.captureException(exception);
        console.error(exception);
        throw new InternalServerErrorException();
      });
  }

  async getOpeningTimes(): Promise<ThemeParkOpeningTimes[]> {
    return this.getIndex().then((res) => {
      let times: ThemeParkOpeningTimes[] = [];

      for (const [key, value] of Object.entries(res.data.exploreHours)) {
        if (value.hasOwnProperty('7')) {
          const split = value['7'].split(' ');

          let openTime = `${split[0]} ${split[1]}`;
          let closeTime = `${split[3]} ${split[4]}`;

          let open = moment(openTime, 'hh:mm A');
          let close = moment(closeTime, 'hh:mm A');

            times.push({
              date: key,
              openingTimes: [{
                openTime: open.format('HH:mm:ss'),
                open: `${key} ${open.format('HH:mm:ss')}`,
                closeTime: close.format('HH:mm:ss'),
                close: `${key} ${close.format('HH:mm:ss')}`,
              }],
            });
        }
      }

      return times;
    });
  }

  private getIndex() {
    return this.http.get<HersheyparkIndexResponse>(`${this._apiUrl}/index`, {
      headers: { 'x-api-key': this._apiKey },
    })
      .toPromise();
  }
}
