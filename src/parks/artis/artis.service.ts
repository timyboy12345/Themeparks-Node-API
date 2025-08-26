import { Injectable } from '@nestjs/common';
import { ThemeParkService } from '../../_services/themepark/theme-park.service';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { Poi } from '../../_interfaces/poi.interface';
import { HttpService } from '@nestjs/axios';
import * as moment from 'moment-timezone';
import { ArtisTransferService } from './artis-transfer/artis-transfer.service';
import * as Sentry from '@sentry/node';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ArtisService extends ThemeParkService {
  constructor(private http: HttpService,
              private transfer: ArtisTransferService,
              private config: ConfigService) {
    super();
  }

  getInfo(): ThemePark {
    return {
      id: 'artis',
      name: 'ARTIS',
      timezone: 'Europe/Amsterdam',
      parkType: ParkType.ZOO,
      countryCode: 'nl',
      location: {
        lat: 0,
        lng: 0,
      },
      description: '',
      image: '',
    }
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: true,
      supportsEvents: false,
      supportsOpeningTimes: true,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: true,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: false,
      supportsRideWaitTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsRides: false,
      supportsShopOpeningTimes: false,
      supportsShops: false,
      supportsShowTimes: false,
      supportsShows: true,
      supportsTranslations: false,
      textType: 'HTML'
    }
  }

  async getAnimals(): Promise<Poi[]> {
    return super.getAnimals();
  }

  async getShows(): Promise<Poi[]> {
    const url = this.config.get('ARTIS_API_URL');

    // TODO: Fix timezone
    const date = moment().format();

    return this.http.get(`${url}/api/v1/agenda?date=${date}`)
      .toPromise()
      .then((res) => this.transfer.transferShowsToPois(res.data.agenda))
      .catch((reason) => {
        console.error(reason);
        Sentry.captureException(reason);
        throw reason;
      })
  }

  async getPois(): Promise<Poi[]> {
    const url = this.config.get('ARTIS_API_URL');

    // TODO: Artis supports "cultures" in the URL
    return this.http.get(`${url}/api/v1/map?culture=nl-NL`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
        'Accept-Language': 'nl-NL,nl;q=0.9',
        'Referer': 'https://www.artis.nl/nl/artis-park/plattegrond?app=true',
        'Sec-Fetch-Mode': '*/*',
      }
    })
      .toPromise()
      .then((res) => this.transfer.transferPoisToPois(res.data.items.filter((i) => i.category !== 'featured')))
      .catch((reason) => {
        console.error(reason);
        Sentry.captureException(reason);
        throw reason;
      })
  }
}
