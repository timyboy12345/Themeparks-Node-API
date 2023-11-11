import { Injectable } from '@nestjs/common';
import { ParquesReunidosParkService } from '../parques-reunidos-park.service';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class BobbejaanlandService extends ParquesReunidosParkService {
  getInfo(): ThemePark {
    return {
      timezone: 'Europe/Amsterdam',
      name: 'Bobbejaanland',
      parkType: ParkType.THEMEPARK,
      image: 'https://www.bobbejaanland.be/content/dam/bjl/images/generals/KVDS-20190616-171430-NIKON%20D5-2.jpg',
      countryCode: 'be',
      description: 'Bobbejaanland is een pretpark in Lichtaart, gelegen tussen Herentals en Kasterlee in België, en is genoemd naar zijn oprichter Bobbejaan Schoepen. Het pretpark is gelegen in een moerassig gebied in de vallei van de Kleine Nete.',
      id: 'bobbejaanland',
      location: {
        lat: 51.2009421,
        lng: 4.9040014,
      },
    };
  }

  getStayEstablishment(): string {
    return 'mGvE'
  }

  supportsRestaurants(): boolean {
    return true;
  }

  getShowCategoryID(): string {
    return '';
  }

  halloweenCategories(): (string | number)[] {
    return []
  }

  getShowType(): 'new' | 'old' | 'unsupported' {
    return 'unsupported';
  }
}
