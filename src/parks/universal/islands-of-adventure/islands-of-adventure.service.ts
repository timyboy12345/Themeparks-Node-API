import { Injectable } from '@nestjs/common';
import { UniversalBaseService } from '../universal-base/universal-base.service';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class IslandsOfAdventureService extends UniversalBaseService {
  getInfo(): ThemePark {
    return {
      countryCode: 'us',
      description: 'Universal\'s Islands of Adventure, kortweg Islands of Adventure, is een pretpark in het Universal Orlando Resort bij Orlando. Het was het tweede park binnen dit resort en werd geopend op 28 mei 1999. Het park was in 2021 het op een na meest bezochte attractiepark ter wereld.',
      id: 'islands-of-adventure',
      image: 'https://www.uomeetingsandevents.com/Images/Carousel/UniversalExperience/1_BB_IOA_composite.jpg',
      name: 'Islands of Adventure',
      parkType: ParkType.THEMEPARK,
      company: Company.UNIVERSAL,
      location: {
        lat: 28.47178541278897,
        lng: -81.4708881,
      },
    };
  }

  getCity(): string {
    return 'Orlando';
  }

  getVenueId(): string {
    return '10000';
  }
}
