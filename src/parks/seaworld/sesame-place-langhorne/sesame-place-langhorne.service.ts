import { Injectable } from '@nestjs/common';
import { SeaworldBaseService } from '../seaworld-base/seaworld-base.service';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class SesamePlaceLanghorneService extends SeaworldBaseService {
  getInfo(): ThemePark {
    return {
      countryCode: 'us',
      description: 'Sesame Place Philadelphia is een kinderthemapark en waterpark gebaseerd op het educatieve kindertelevisieprogramma Sesamstraat',
      id: 'sesame-place-philadelphia-langhorne',
      image: 'https://sesameplace.com/philadelphia/-/media/migrated-media/sesame-place-langhorne/images/scope/1900x700/1900x700_frontgate2.jpg?h=700&w=1900&la=en&hash=28BEF8C86BE23964B53D2450B858C938',
      name: 'Sesame Place Philadelphia',
      parkType: ParkType.THEMEPARK,
      company: Company.SEAWORLD,
      location: {
        lat: 40.185808,
        lng: -74.871976,
      },
    };
  }

  getParkId(): string {
    return 'F7408854-28CB-4B1E-98E5-4449FE600E85';
  }
}
