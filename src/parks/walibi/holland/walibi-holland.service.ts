import { Injectable } from '@nestjs/common';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { WalibiService } from '../walibi.service';

@Injectable()
export class WalibiHollandService extends WalibiService {
  getInfo(): ThemePark {
    return {
      id: 'walibi_holland',
      name: 'Walibi Holland',
      description: 'Walibi Holland is een attractiepark, gelegen in Biddinghuizen in de Nederlandse provincie Flevoland. Voorheen heette dit park Walibi World, daarvoor Six Flags Holland, daarvoor Walibi Flevo, terwijl het park startte als Flevohof.',
      countryCode: 'nl',
      image: 'https://www.walibi.nl/sites/default/files/styles/1280x711/public/content/editorial/2020-01/Goliath-ALG-04_0.jpg?itok=SGL1LdeZ',
      parkType: ParkType.THEMEPARK,
      location: {
        lat: 52.44020062282858,
        lng: 5.76276265766736,
      },
    };
  }

  getLocale(): string {
    return 'nl';
  }
}
