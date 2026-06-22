import { Injectable } from '@nestjs/common';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import {
  CompagnieDesAlpesBaseService
} from '../../compagnie-des-alpes/compagnie-des-alpes-base/compagnie-des-alpes-base.service';

@Injectable()
export class WalibiFranceService extends CompagnieDesAlpesBaseService {
  getInfo(): ThemePark {
    return {
      id: 'walibi-rhone-alpes',
      name: 'Walibi Rhône-Alpes',
      description: 'Walibi Rhône-Alpes is een pretpark in Zuid-Frankrijk dat eigendom is van de Compagnie des Alpes. Het trekt jaarlijks zo\'n 400.000 bezoekers. Het park telt ongeveer dertig attracties.',
      countryCode: 'fr',
      image: 'https://www.walibi.fr/adobe/dynamicmedia/deliver/dm-aid--144fb382-9e49-4f46-bcff-f910a24749aa/walibi-ra-2022-0055.jpg?preferwebp=true&quality=85',
      parkType: ParkType.THEMEPARK,
      location: {
        lat: 45.62165,
        lng: 5.5707,
      },
    };
  }

  getParkCode(): string {
    return 'wra';
  }

  getBaseUrl(): string {
    return 'https://www.walibi.fr';
  }

  getLocaleCode(l): string {
    switch (l) {
      // case 'fr':
      //   return 'fr';
      default:
        return 'fr';
    }
  }

  supportsShows(): boolean {
    return false;
  }
}
