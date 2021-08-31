import { Injectable } from '@nestjs/common';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { WalibiService } from '../walibi.service';

@Injectable()
export class WalibiBelgiumService extends WalibiService {
  getInfo(): ThemePark {
    return {
      id: 'walibi_belgium',
      name: 'Walibi Belgium',
      description: 'Walibi Belgium is een pretpark in de Belgische gemeente Waver.',
      image: 'https://www.walibi.be/sites/default/files/styles/1280x711/public/content/editorial/2020-06/W18-TIKIWAKA_0629-1.jpg?itok=69V5PXVt',
      countryCode: 'be',
      parkType: ParkType.THEMEPARK,
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: false,
      supportsRides: true,
      supportsShowTimes: false,
      supportsShows: true,
      supportsPoiLocations: true,
      supportsShops: true,
      supportsShopOpeningTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: false,
      supportsAnimals: false,
    };
  }

  getLocale(): string {
    return 'be';
  }
}
