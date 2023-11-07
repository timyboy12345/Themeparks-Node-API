import { Injectable } from '@nestjs/common';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { SeaworldBaseService } from '../seaworld-base/seaworld-base.service';

@Injectable()
export class SeaworldSanAntonioService extends SeaworldBaseService {
  getInfo(): ThemePark {
    return {
      countryCode: 'us',
      id: 'seaworld-san-antonio',
      name: 'Seaworld San Antonio',
      description: 'SeaWorld San Antonio is een 250 hectare groot zeezoogdierenpark, oceanarium en dierenthemapark in het Westover Hills District van San Antonio, Texas, aan de westkant van de stad. Het is het grootste van de drie parken in de SeaWorld-keten die eigendom is van en beheerd wordt door SeaWorld Parks & Entertainment.',
      image: 'https://seaworld.com/orlando/-/media/seaworld-orlando/images/landing-pages/2-parks/seaworld-and-aquatica_1900x600.ashx',
      parkType: ParkType.THEMEPARK,
      company: Company.SEAWORLD,
      location: {
        lat: 29.4584,
        lng: -98.6998
      }
    }
  }

  getParkId(): string {
    return 'F4040D22-8B8D-4394-AEC7-D05FA5DEA945';
  }
}
