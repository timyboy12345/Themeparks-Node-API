import { Injectable, NotImplementedException } from '@nestjs/common';
import { ThemeParkService } from '../../../_services/themepark/theme-park.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PortaVenturaTransferService } from '../portaventura-transfer/porta-ventura-transfer.service';
import { LocaleService } from '../../../_services/locale/locale.service';
import { PortaventuraBaseRideInterface, PortaventuraWaitingTime } from '../interfaces/portaventura-base-ride.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import * as Sentry from '@sentry/node';

@Injectable()
export class PortaventuraBaseServiceService extends ThemeParkService {
  private readonly _apiUrl = null;

  constructor(private readonly http: HttpService,
              private readonly config: ConfigService,
              private readonly transfer: PortaVenturaTransferService,
              private readonly locale: LocaleService) {
    super();

    this._apiUrl = config.get('PORTAVENTURA_API_URL');
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
      supportsHalloween: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: true,
      supportsPois: true,
      supportsRestaurantOpeningTimes: true,
      supportsRestaurants: true,
      supportsRideWaitTimes: true,
      supportsRideWaitTimesHistory: false,
      supportsRides: true,
      supportsShopOpeningTimes: false,
      supportsShops: true,
      supportsShowTimes: true,
      supportsShows: true,
      supportsTranslations: false,
    };
  }

  public getAuthToken() {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzE4ODMzOTk2LCJleHAiOjE3MjE0MjU5OTZ9.QlIFeolcJrY90wVAd-Py8ooYZBsnKpaHww2yVmlbe00';
  }

  public getParkName() {
    throw new NotImplementedException('Park Name not set');
  }

  async getPois(): Promise<Poi[]> {
    const promises = [
      this.getRides(),
      this.getShows(),
      this.getShops(),
      this.getRestaurants(),
    ];

    return []
      .concat
      .apply([], await Promise.all(promises));
  }

  async getRides(): Promise<Poi[]> {
    const rawRides: PortaventuraBaseRideInterface[] = await this.request('rides');
    const waitingTimes: PortaventuraWaitingTime[] = await this.request('rides/waitingtimes', false, false);
    const rides = this.transfer.transferRidesToPois(rawRides);

    console.log(waitingTimes);
    waitingTimes.forEach((wt) => {
      rides
        .filter((r) => r.id === wt.id)
        .map((r) => {
          r.currentWaitTime = wt.queue;
        });
    });

    return rides;
  }

  async getShows(): Promise<Poi[]> {
    const rides: PortaventuraBaseRideInterface[] = await this.request('shows');
    return this.transfer.transferShowsToPois(rides);
  }

  async getRestaurants(): Promise<Poi[]> {
    const rides: PortaventuraBaseRideInterface[] = await this.request('restaurants');
    return this.transfer.transferRestaurantsToPois(rides);
  }

  async getShops(): Promise<Poi[]> {
    const rides: PortaventuraBaseRideInterface[] = await this.request('shops');
    return this.transfer.transferShopsToPois(rides);
  }

  async request(route: string, useLocale = true, shouldFilter = true): Promise<any[]> {
    const url = this._apiUrl + '/' + route;
    let lang: string;
    switch (this.locale.getLocale()) {
      case 'es':
        lang = 'es-ES';
        break;
      case 'fr':
        lang = 'fr-FR';
        break;
      default:
        lang = 'en';
        break;
    }

    const params = useLocale ? { lang: lang } : {};

    return this.http.get(url, {
      params: params,
      headers: {
        'Authorization': 'Bearer ' + this.getAuthToken(),
        'Content-Type': 'application/json',
        'User-Agent': 'PortAventura/441 CFNetwork/1496.0.7 Darwin/23.5.0',
        'Host': 'api.adventurelabs.xyz',
      },
    })
      .toPromise()
      .then((r) => r.data.filter((r) => !shouldFilter || r.park === this.getParkName()))
      .catch((exception) => {
        console.error(exception);
        Sentry.captureException(exception);
        throw exception;
      });
  }
}
