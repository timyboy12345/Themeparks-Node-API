import { Injectable } from '@nestjs/common';
import { HerschendBaseService } from '../herschend-base/herschend-base.service';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class DollywoodService extends HerschendBaseService {
  getInfo(): ThemePark {
    return {
      id: 'dollywood',
      name: 'Dollywood',
      description: 'Dollywood is een themapark in handen van entertainer Dolly Parton en Herschend Family Entertainment. Het is gelegen in Pigeon Forge, Tennessee in de Verenigde Staten.',
      image: 'https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F619298038%2F0x0.jpg',
      parkType: ParkType.THEMEPARK,
      countryCode: 'us',
      timezone: 'America/New_York',
      location: {
        lat: 35.79526792382862,
        lng: -83.53114328709876,
      },
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
      supportsRideWaitTimesHistory: false,
      supportsTranslations: false,
    }
  }

  protected getParkId(): number {
    return 1;
  }
}
