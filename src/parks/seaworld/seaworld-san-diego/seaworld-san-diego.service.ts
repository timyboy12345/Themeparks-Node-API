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
      image: 'https://seaworld.com/san-diego/-/media/seaworld-san-diego/images/featured-story/750x450-swc-dolphin-adventures.ashx?version=1_202209200306&h=450&w=750&la=en&hash=01150F399E0A90CB78170A48F5F7D318F77E3FF9',
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
