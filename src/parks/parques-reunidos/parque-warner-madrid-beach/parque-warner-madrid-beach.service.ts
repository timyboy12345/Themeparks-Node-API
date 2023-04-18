import { Injectable } from '@nestjs/common';
import { ParquesReunidosParkService } from '../parques-reunidos-park.service';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class ParqueWarnerMadridBeachService extends ParquesReunidosParkService {
  getInfo(): ThemePark {
    return {
      countryCode: 'es',
      description: 'Parque Warner Beach is een waterpark en is een zusterpark van het naastgelegen attractiepark Parque Warner Madrid.',
      id: 'parque-warner-beach',
      image: 'https://parquewarnerbeach.parquewarner.com/content/dam/wbe/images/attractions/aquaman/Aquaman.jpg',
      location: { lat: 40.230101, lng: -3.588639 },
      name: 'Parque Warner Beach',
      parkType: ParkType.WATER_PARK,
      timezone: 'Europe/Madrid',
    };
  }

  supportsRestaurants(): boolean {
    return true;
  }

  getStayEstablishment(): string {
    return 'Qee4';
  }

  getShowType(): 'new' | 'old' | 'unsupported' {
    return 'unsupported';
  }
}
