import { Injectable } from '@nestjs/common';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { ThemeParkService } from '../../../_services/themepark/theme-park.service';

@Injectable()
export class EuropaParkService extends ThemeParkService {
  getInfo(): ThemePark {
    return {
      id: 'europa-park',
      timezone: 'Europa/Berlin',
      parkType: ParkType.THEMEPARK,
      countryCode: 'de',
      description: '',
      image: '',
      name: 'Europa Park',
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsRideWaitTimesHistory: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsRideWaitTimes: false,
      supportsRestaurants: false,
      supportsShows: false,
      supportsRides: true,
      supportsShops: false,
      supportsShopOpeningTimes: false,
      supportsPoiLocations: false,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsShowTimes: false,
      supportsAnimals: false,
    };
  }
}
