import { Injectable } from '@nestjs/common';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import {
  CompagnieDesAlpesBaseService
} from '../../compagnie-des-alpes/compagnie-des-alpes-base/compagnie-des-alpes-base.service';

@Injectable()
export class WalibiBelgiumService extends CompagnieDesAlpesBaseService {
  getInfo(): ThemePark {
    return {
      id: 'walibi-belgium',
      name: 'Walibi Belgium',
      description: 'Walibi Belgium is een pretpark in de Belgische gemeente Waver. Het park, geopend in 1975, heeft meerdere namen gehad en is ook nog een tijdje onderdeel geweest van het Amerikaanse concern Six Flags.',
      image: 'https://www.walibi.be/adobe/dynamicmedia/deliver/dm-aid--245d4c53-64c1-4c1b-ba39-8d7788fcc140/23-kondaa.jpg?quality=85&preferwebp=true',
      countryCode: 'be',
      parkType: ParkType.THEMEPARK,
      location: {
        lat: 50.701962206947776,
        lng: 4.594036198076961,
      },
    };
  }

  getParkCode(): string {
    return 'wbe';
  }

  getBaseUrl(): string {
    return 'https://www.walibi.be';
  }

  getRealTimeURL(): string {
    return 'https://www.walibi.be/api/wbe/waitingtimes.v1.json';
  }

  getLocaleCode(l): string {
    switch (l) {
      case 'fr':
        return 'fr';
      default:
        return 'nl';
    }
  }

  getApiKey(): string {
    return 'e0fe3a8d975b-who';
  }

  supportsShows(): boolean {
    return false;
  }
}
