import { Injectable } from '@nestjs/common';
import { HerschendBaseService } from '../herschend-base/herschend-base.service';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';

@Injectable()
export class SilverDollarCityService extends HerschendBaseService {
  getInfo(): ThemePark {
    return {
      id: 'silver-dollar-city',
      name: 'Silver Dollar City',
      description: 'Silver Dollar City is een 61 hectare groot pretpark in Stone County, Missouri, in de buurt van de steden Branson en Branson West. Het park ligt langs Missouri Route 76 op het schiereiland Indian Point van Table Rock Lake. Silver Dollar City werd geopend op 1 mei 1960.',
      image: 'https://www.explorebranson.com/sites/default/files/styles/hero/public/articles/adc-header.jpg?itok=HVr5m2Nd',
      timezone: 'America/Chicago',
      countryCode: 'us',
      parkType: ParkType.THEMEPARK,
      location: {
        lat: 36.667506051464756,
        lng: -93.3385858874428
      }
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
      supportsShowTimes: false,
      supportsRestaurantOpeningTimes: false,
      supportsPois: true,
      supportsPoiLocations: false,
      supportsShopOpeningTimes: false,
      supportsShops: false,
      supportsRides: true,
      supportsShows: false,
      supportsRestaurants: false,
      supportsRideWaitTimes: false,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: false,
      supportsRideWaitTimesHistory: false
    }
  }

  protected getParkId(): number {
    return 1;
  }
}
