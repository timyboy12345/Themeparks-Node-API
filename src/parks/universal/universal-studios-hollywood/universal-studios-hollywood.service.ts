import { Injectable } from '@nestjs/common';
import { UniversalBaseService } from '../universal-base/universal-base.service';
import { Company, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class UniversalStudiosHollywoodService extends UniversalBaseService {
  getInfo(): ThemePark {
    return {
      countryCode: 'us',
      description: 'Universal Studios Hollywood is én een filmstudio én een themapark in Universal City. Woody Woodpecker is de mascotte van Universal Studios Hollywood en de rest van de Universal Studios Parks. Wikipedia',
      id: 'universal-studios-hollywood',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Rolled_out_red_carpet_at_Universal_Studios_Hollywood.JPG/1024px-Rolled_out_red_carpet_at_Universal_Studios_Hollywood.JPG',
      name: 'Universal Studios Hollywood',
      parkType: undefined,
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
