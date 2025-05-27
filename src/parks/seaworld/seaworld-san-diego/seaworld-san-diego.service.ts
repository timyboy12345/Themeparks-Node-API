import { Injectable } from '@nestjs/common';
import { SeaworldBaseService } from '../seaworld-base/seaworld-base.service';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class SeaworldSanDiegoService extends SeaworldBaseService {
  getInfo(): ThemePark {
    return {
      countryCode: 'us',
      description: 'SeaWorld San Diego is een pretpark rond zeezoogdieren in San Diego, in het zuidwesten van de Amerikaanse staat Californië. Het is het oudste park van de SeaWorld-keten.',
      id: 'seaworld-san-diego',
      image: 'https://seaworld.com/san-diego/-/media/migrated-media/seaworld-san-diego/images/featured-story/750x450-swc-dolphin-adventures.jpg?h=450&w=750&la=en&hash=FFBEF45F207DD036AB02C55968CED159',
      name: 'Seaworld San Diego',
      parkType: ParkType.THEMEPARK,
      company: Company.SEAWORLD,
      location: {
        lat: 32.76406122974365,
        lng: -117.22635376930869,
      }
    }
  }

  getParkId(): string {
    return '4325312F-FDF1-41FF-ABF4-361A4FF03443'
  }
}
