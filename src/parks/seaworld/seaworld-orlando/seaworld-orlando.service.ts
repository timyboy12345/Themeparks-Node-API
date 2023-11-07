import { Injectable } from '@nestjs/common';
import { SeaworldBaseService } from '../seaworld-base/seaworld-base.service';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class SeaworldOrlandoService extends SeaworldBaseService {
  getInfo(): ThemePark {
    return {
      countryCode: 'us',
      description: 'SeaWorld Orlando is een attractiepark in Orlando te Florida. SeaWorld Orlando is opgedeeld in 2 delen: een dierendeel en een attractiedeel. Beide delen vormen één park',
      id: 'seaworld-orlando',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Journey_to_Atlantis_-_SeaWorld_Orlando.jpg',
      name: 'Seaworld Orlando',
      parkType: ParkType.THEMEPARK,
      company: Company.SEAWORLD,
      location: {
        lat: 28.406498374,
        lng:  -81.45749817
      }
    };
  }

  getParkId(): string {
    return 'AC3AF402-3C62-4893-8B05-822F19B9D2BC';
  }
}
