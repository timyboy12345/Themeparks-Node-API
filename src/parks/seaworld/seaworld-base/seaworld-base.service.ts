import { Injectable, NotImplementedException } from '@nestjs/common';
import { ThroughPoisThemeParkService } from '../../../_services/themepark/through-pois-theme-park.service';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { ConfigService } from '@nestjs/config';
import { Poi } from '../../../_interfaces/poi.interface';
import { HttpService } from '@nestjs/axios';
import { SeaworldTransferService } from '../seaworld-transfer/seaworld-transfer.service';

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
      supportsTranslations: false
    }
  }

  getParkId(): string {
    throw new NotImplementedException('Seaworld Park ID not set');
  }

  async getPois(): Promise<Poi[]> {
    return this.http.get(`${this._apiUrl}/park/${this.getParkId()}/poi`)
      .toPromise()
      .then((res) => this.transfer.transferPoisToPois(res.data));
  }
}
