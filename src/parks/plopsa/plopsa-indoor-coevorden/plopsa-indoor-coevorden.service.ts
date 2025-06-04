import { Injectable } from '@nestjs/common';
import { PlopsaBaseService } from '../plopsa-base/plopsa-base.service';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class PlopsaIndoorCoevordenService extends PlopsaBaseService {
  getInfo(): ThemePark {
    return {
      id: 'plopsa-indoor-coevorden',
      name: 'Plopsa Indoor Coevorden',
      image: 'https://www.looopings.nl/img/foto/24/0110coelkvajdp.jpg',
      description: 'Plopsa Indoor Coevorden is een deels overdekt attractiepark in de Nederlandse plaats Dalen en behoort tot de Plopsa-groep, de themaparkdivisie van Studio 100. De verscheidene attracties zijn gethematiseerd naar Studio 100-personages, zoals Samson & Gert, Kabouter Plop, K3, Mega Mindy, Bumba, Bobo en Wickie de Viking',
      countryCode: 'nl',
      parkType: ParkType.THEMEPARK,
      timezone: 'Europe/Amsterdam',
      location: {
        lat: 52.67853722468824,
        lng: 6.774093739988459,
      },
    };
  }

  getParkSlug(): string {
    return 'plopsa-indoor-coevorden';
  }
}
