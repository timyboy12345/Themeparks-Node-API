import { Injectable } from '@nestjs/common';
import { BellewaerdeBaseService } from '../bellewaerde-base/bellewaerde-base.service';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';

@Injectable()
export class BellewaerdeService extends BellewaerdeBaseService {
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
      // TODO: Fix animals
      supportsAnimals: false,
      supportsHalloween: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: true,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: false,
      // TODO: Fix wait times
      supportsRideWaitTimes: false,
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
}
