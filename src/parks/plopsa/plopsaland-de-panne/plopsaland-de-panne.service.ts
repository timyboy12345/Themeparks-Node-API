import { Injectable } from '@nestjs/common';
import { PlopsaBaseService } from '../plopsa-base/plopsa-base.service';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class PlopsalandDePanneService extends PlopsaBaseService {
  getInfo(): ThemePark {
    return {
      id: 'plopsaland-de-panne',
      name: 'Plopsalande de Panne',
      image: 'https://www.old.plopsa.com/sites/default/files/public/brand/logos/Plopsaland%20De%20Panne.jpg',
      description: 'Plopsaland De Panne is een themapark van Studio 100 in de Belgische plaats De Panne, aan de Noordzeekust en de Franse grens. De kusttram heeft een halte voor de ingang. Het themapark is genoemd naar de kinderprogramma\'s Kabouter Plop en Samson en Gert van Studio 100.',
      countryCode: 'be',
      parkType: ParkType.THEMEPARK,
      timezone: 'Europe/Brussels',
      location: {
        lat: 51.080857219669724,
        lng: 2.5987519692562495,
      },
    };
  }

  getParkSlug(): string {
    return 'plopsaland-de-panne';
  }
}
