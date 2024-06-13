import { Injectable } from '@nestjs/common';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { SeaworldBaseService } from '../seaworld-base/seaworld-base.service';

@Injectable()
export class SesamePlaceSanDiegoService extends SeaworldBaseService {
  getInfo(): ThemePark {
    return {
      countryCode: 'us',
      description: 'Familievriendelijk pretpark in Sesamstraat-thema met attracties, waterglijbanen, parades en shows.\n',
      id: 'sesame-place-san-diego',
      image: 'https://sesameplace.com/san-diego/-/media/commercial/sesame-place-san-diego/featured-story/751x470_spsd_rides.jpg?h=470&w=751&la=en&hash=E28A59D1E9A571C7DD11E7D0074B1868',
      name: 'Sesame Place San Diego',
      parkType: ParkType.THEMEPARK,
      company: Company.SEAWORLD,
      location: {
        lat: 32.58743,
        lng: -117.01183,
      },
    };
  }

  getParkId(): string {
    return 'A988F4CE-6A81-4527-9535-DDB378689E52';
  }
}
