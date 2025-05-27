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
      image: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/sanantoniotx/SeaWorld-Banner_CC3F1C85-5056-BFCE-A8355C4E28F5857F-cc3f1be65056bfc_cc3f2ced-5056-bfce-a85a4f59c700585a.jpg',
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
