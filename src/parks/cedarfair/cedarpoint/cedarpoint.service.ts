import { Injectable } from '@nestjs/common';
import { CedarfairBaseService } from '../cedarfair-base/cedarfair-base.service';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';

@Injectable()
export class CedarpointService extends CedarfairBaseService{
  protected getParkId(): string {
    return 'CF_CP';
  }

  getInfo(): ThemePark {
    return {
      id: 'cedarpoint',
      name: 'Cedar Point',
      image: '',
      description: '',
      timezone: '',
      countryCode: 'us',
      parkType: ParkType.THEMEPARK
    }
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsRideWaitTimesHistory: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsRideWaitTimes: false,
      supportsRestaurants: true,
      supportsShows: true,
      supportsRides: true,
      supportsShops: true,
      supportsShopOpeningTimes: false,
      supportsPoiLocations: true,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsShowTimes: false,
      supportsAnimals: false
    }
  }
}
