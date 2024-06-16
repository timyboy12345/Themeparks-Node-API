import { Injectable, NotImplementedException } from '@nestjs/common';
import { ThroughPoisThemeParkService } from '../../../_services/themepark/through-pois-theme-park.service';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { ConfigService } from '@nestjs/config';
import { Poi } from '../../../_interfaces/poi.interface';
import { HttpService } from '@nestjs/axios';
import { SeaworldTransferService } from '../seaworld-transfer/seaworld-transfer.service';
import * as moment from 'moment';
import { SeaworldWaitTimesInterface } from '../interfaces/seaworld-wait-times.interface';

@Injectable()
export class SeaworldBaseService extends ThroughPoisThemeParkService {
  private _apiUrl: string;

  constructor(config: ConfigService, private readonly http: HttpService, private readonly transfer: SeaworldTransferService) {
    super();

    this._apiUrl = config.get('SEAWORLD_API_URL');
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: true,
      supportsHalloween: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: true,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsRides: true,
      supportsShopOpeningTimes: false,
      supportsShops: true,
      supportsShowTimes: false,
      supportsShows: true,
      supportsTranslations: false,
    };
  }

  getParkId(): string {
    throw new NotImplementedException('Seaworld Park ID not set');
  }

  async getPois(): Promise<Poi[]> {
    const rides = await this.http.get(`${this._apiUrl}/park/${this.getParkId()}/poi`)
      .toPromise()
      .then((res) => this.transfer.transferPoisToPois(res.data));

    const waitTimes = await this.getWaitTimes();
    return rides.map((r) => {
      const wait = waitTimes.WaitTimes.find((w) => w.Id == r.id);

      if (wait) {
        r.currentWaitTime = wait.Minutes;
      }

      return r;
    })
  }

  async getWaitTimes(): Promise<SeaworldWaitTimesInterface> {
    const date = moment().format('YYYY-MM-DD');

    return this.http.get<SeaworldWaitTimesInterface>(`${this._apiUrl}/park/${this.getParkId()}/availability?searchDate=${date}`)
      .toPromise()
      .then((res) => res.data);
  }
}
