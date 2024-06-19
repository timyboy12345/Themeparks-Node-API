import { Injectable } from '@nestjs/common';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import {
  CompagnieDesAlpesBaseService
} from '../../compagnie-des-alpes/compagnie-des-alpes-base/compagnie-des-alpes-base.service';

@Injectable()
export class BellewaerdeService extends CompagnieDesAlpesBaseService {
  getInfo(): ThemePark {
    return {
      id: 'bellewaerde',
      name: 'Bellewaerde',
      description: 'Bellewaerde is een pret- en dierenpark bij Ieper, gelegen in de Belgische provincie West-Vlaanderen. Het park is in handen van het Franse Compagnie des Alpes, waar de Walibiparken ook deel van uitmaken. Bellewaerde telt 54 hectare grond en is vooral beroemd om zijn vele dieren en de aandacht voor thematisering.',
      image: 'https://www.bellewaerde.be/sites/default/files/home/2021-03/wakala-home_0.jpg',
      countryCode: 'be',
      parkType: ParkType.THEMEPARK,
      timezone: 'Europe/Berlin',
      location: {
        lat: 50.846996,
        lng: 2.947948,
      },
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: true,
      supportsHalloween: false,
      supportsOpeningTimes: true,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: true,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: true,
      supportsRideWaitTimesHistory: false,
      supportsRides: true,
      supportsShopOpeningTimes: false,
      supportsShops: true,
      supportsShowTimes: false,
      supportsShows: true,
      supportsTranslations: false,
    };
  }

  getParkCode(): string {
    return "blw";
  }

  getBaseUrl(): string {
    return 'https://www.bellewaerde.be';
  }

  getRealTimeURL(): string {
    return 'https://bellewaer.de/realtime/api/api-realtime.php';
  }

  getLocaleCode(l): string {
    switch (l) {
      case 'fr':
        return 'fr';
      default:
        return 'nl';
    }
  }
}
