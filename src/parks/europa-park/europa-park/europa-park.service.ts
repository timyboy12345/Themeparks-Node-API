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
      location: {
        lat: 48.26608365626527,
        lng: 7.722061242161103,
      },
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
      supportsHalloween: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: false,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: false,
      supportsRideWaitTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsRides: true,
      supportsShopOpeningTimes: false,
      supportsShops: false,
      supportsShowTimes: false,
      supportsShows: false,
      supportsTranslations: false,
    };
  }
}
