import { HttpService, Injectable } from '@nestjs/common';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { ThroughPoisThemeParkService } from '../../_services/themepark/through-pois-theme-park.service';
import { Poi } from '../../_interfaces/poi.interface';
import { HansaParkTransferService } from './hansa-park-transfer/hansa-park-transfer.service';
import { HansaParkDataResponseInterface } from './interfaces/hansa-park-data-response.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HansaParkService extends ThroughPoisThemeParkService {
  constructor(private readonly hansaParkTransferService: HansaParkTransferService,
              private readonly httpService: HttpService,
              private readonly configService: ConfigService) {
    super();
  }

  getInfo(): ThemePark {
    return {
      name: 'Hansa Park',
      image: '',
      description: '',
      countryCode: 'de',
      parkType: ParkType.THEMEPARK,
      timezone: 'Europe/Berlin',
      id: 'hansa-park',
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
      supportsShowTimes: false,
      supportsRestaurantOpeningTimes: false,
      supportsPois: true,
      supportsPoiLocations: true,
      supportsShopOpeningTimes: true,
      supportsShops: true,
      supportsRides: true,
      supportsShows: true,
      supportsRestaurants: true,
      supportsRideWaitTimes: true,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: false,
      supportsRideWaitTimesHistory: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    return this.getData()
      .then(value => {
        return this.hansaParkTransferService.transferPoisToPois(value.data);
      });
  }

  async getData(): Promise<HansaParkDataResponseInterface> {
    const locale = 'en';
    const order = 'name';
    const key = 'ef1feceffbb0284b3e2cc353dc5ad483';
    const baseUrl = this.configService.get('HANSA_PARK_API_URL');

    const url = `${baseUrl}/attractions/?locale=${locale}&orderBy=${order}&orderDir=ASC&key=${key}`;

    return new Promise((resolve, reject) => {
      return this.httpService.get<HansaParkDataResponseInterface>(url)
        .toPromise()
        .then(value => {
          resolve(value.data);
        })
        .catch(reason => {
          reject(reason);
        });
    });
  }
}
