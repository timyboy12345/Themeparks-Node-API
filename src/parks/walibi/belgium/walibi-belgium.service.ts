import { Injectable } from '@nestjs/common';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { WalibiService } from '../walibi.service';

@Injectable()
export class WalibiBelgiumService extends WalibiService {
  getInfo(): ThemePark {
    return {
      id: 'walibi_belgium',
      name: 'Walibi Belgium',
      description: 'Walibi Belgium is een pretpark in de Belgische gemeente Waver. Het park, geopend in 1975, heeft meerdere namen gehad en is ook nog een tijdje onderdeel geweest van het Amerikaanse concern Six Flags.',
      image: 'https://www.walibi.be/sites/default/files/styles/1280x711/public/content/editorial/2020-06/W18-TIKIWAKA_0629-1.jpg?itok=69V5PXVt',
      countryCode: 'be',
      parkType: ParkType.THEMEPARK,
      location: {
        lat: 50.701962206947776,
        lng: 4.594036198076961,
      },
    };
  }

  getLocale(): string {
    return 'be';
  }
}
