import { Injectable } from '@nestjs/common';
import { UniversalBaseService } from '../universal-base/universal-base.service';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class UniversalStudiosHollywoodService extends UniversalBaseService {
  getInfo(): ThemePark {
    return {
      countryCode: 'us',
      description: 'Universal Studios Hollywood is een filmstudio en een themapark in Universal City. Woody Woodpecker is de mascotte van Universal Studios Hollywood en de rest van de Universal Studios Parks. Wikipedia',
      id: 'universal-studios-hollywood',
      image: 'https://www.universalstudioshollywood.com/contentdata/ush/en/us/files/images/ush-arch-front-gate-evening-red-carpet-B1.jpg',
      name: 'Universal Studios Hollywood',
      parkType: ParkType.THEMEPARK,
      company: Company.UNIVERSAL,
      location: {
        lat: 34.1381345602379,
        lng: -118.35342121534478,
      },
    };
  }

  getCity(): string {
    return 'Hollywood'
  }

  getVenueId(): string {
    return '13825';
  }
}
