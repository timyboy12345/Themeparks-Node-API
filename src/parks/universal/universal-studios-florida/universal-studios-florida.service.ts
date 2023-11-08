import { Injectable } from '@nestjs/common';
import { UniversalBaseService } from '../universal-base/universal-base.service';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class UniversalStudiosFloridaService extends UniversalBaseService {
  getInfo(): ThemePark {
    return {
      countryCode: 'us',
      description: 'Universal Studios Florida is een attractiepark in Orlando in de Verenigde Staten. Het park maakt deel uit van het Universal Orlando Resort en is het tweede attractiepark van Universal ter wereld. Het park is vernoemd naar de filmmaatschappij Universal Studios',
      id: 'universal-studios-orlando',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/USF_Entrance.jpg',
      name: 'Universal Studios Orlando',
      parkType: ParkType.THEMEPARK,
      company: Company.UNIVERSAL,
      location: {
        lat: 28.47931881682444,
        lng: -81.46858511534481,
      },
    };
  }

  getCity(): string {
    return 'Orlando';
  }

  getVenueId(): string {
    return '10010';
  }
}
