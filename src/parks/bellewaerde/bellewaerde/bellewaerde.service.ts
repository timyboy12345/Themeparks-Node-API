import { Injectable } from '@nestjs/common';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
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
      image: 'https://www.bellewaerde.be/content/dam/blw/nl/algemeen/afbeeldingen/keyvisuals/2024/mundo-amazonia.jpg/_jcr_content/renditions/social.png',
      countryCode: 'be',
      parkType: ParkType.THEMEPARK,
      timezone: 'Europe/Berlin',
      location: {
        lat: 50.846996,
        lng: 2.947948,
      },
    };
  }

  getParkCode(): string {
    return "blw";
  }

  getBaseUrl(): string {
    return 'https://www.bellewaerde.be';
  }

  // TODO: Find new realtime URL
  // getRealTimeURL(): string {
  //   return 'https://bellewaer.de/realtime/api/api-realtime.php';
  // }

  getLocaleCode(l): string {
    switch (l) {
      case 'fr':
        return 'fr';
      default:
        return 'nl';
    }
  }
}
