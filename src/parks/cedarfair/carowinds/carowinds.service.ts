import { Injectable } from '@nestjs/common';
import { CedarfairBaseService } from '../cedarfair-base/cedarfair-base.service';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class CarowindsService extends CedarfairBaseService {
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
      supportsAnimals: false,
    };
  }

  getInfo(): ThemePark {
    return {
      name: 'Carowinds',
      image: 'https://d2j8c2rj2f9b78.cloudfront.net/uploads/carowinds/DSC_9931.jpg',
      description: 'Carowinds is een attractiepark gelegen in Charlotte, North Carolina in de Verenigde Staten. Het park bestrijkt 1,61 km² oppervlakte. Het park is eigendom van de Cedar Fair Entertainment Company. De voormalige eigenaar was onderdeel van de Paramount Parks keten die overgenomen werd door Cedar Fair op 30 juni 2006.',
      timezone: 'America/New_York',
      countryCode: 'us',
      parkType: ParkType.THEMEPARK,
      id: 'carowinds'
    };
  }

  protected getParkId(): string {
    return 'CF_CP';
  }
}