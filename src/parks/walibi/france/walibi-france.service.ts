import { Injectable } from '@nestjs/common';
import { WalibiService } from '../walibi.service';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class WalibiFranceService extends WalibiService {
  getInfo(): ThemePark {
    return {
      id: 'walibi-rhone-alpes',
      name: 'Walibi Rhône-Alpes',
      description: 'Walibi Rhône-Alpes is een pretpark in Zuid-Frankrijk dat eigendom is van de Compagnie des Alpes. Het trekt jaarlijks zo\'n 400.000 bezoekers. Het park telt ongeveer dertig attracties.',
      countryCode: 'fr',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/EqWalizer.jpg/1024px-EqWalizer.jpg',
      parkType: ParkType.THEMEPARK,
      location: {
        lat: 45.62165,
        lng: 5.5707,
      },
    };
  }

  getLocale(): string {
    return 'fr';
  }
}
