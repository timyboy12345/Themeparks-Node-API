import { Injectable } from '@nestjs/common';
import { CedarfairBaseService } from '../cedarfair-base/cedarfair-base.service';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class KnottsBerryFarmService extends CedarfairBaseService {
  protected getParkId(): string {
    return 'CF_KBF';
  }

  getInfo(): ThemePark {
    return {
      id: 'knotts-berry-farm',
      name: 'Knotts Berry Farm',
      description: 'Knott\'s Berry Farm is een attractiepark en voedingsbedrijf in Buena Park in de Amerikaanse staat Californië. Het park, dat zichzelf Amerika\'s eerste themapark noemt, telt 40 attracties, waaronder 9 achtbanen en 4 waterattracties.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Knott%27s_Gate.jpg',
      parkType: ParkType.THEMEPARK,
      countryCode: 'us',
      timezone: 'America/Los_Angeles',
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
      supportsShowTimes: false,
      supportsRestaurantOpeningTimes: false,
      supportsPois: true,
      supportsPoiLocations: true,
      supportsShopOpeningTimes: false,
      supportsShops: true,
      supportsRides: true,
      supportsShows: true,
      supportsRestaurants: true,
      supportsRideWaitTimes: false,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: false,
      supportsRideWaitTimesHistory: false,
    };
  }
}
