import { Injectable } from '@nestjs/common';
import { ParquesReunidosParkService } from '../parques-reunidos-park.service';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class MarinelandCoteDazurService extends ParquesReunidosParkService {
  getInfo(): ThemePark {
    return {
      countryCode: 'fr',
      description: 'Marinepark met dolfijnenshows, haaienbassin en vogels, plus apart waterpark, golfbaan en dierentuin vlakbij.',
      id: 'marineland-cote-dazur',
      image: 'https://www.marineland.fr/content/dam/mar/fr/images/discover-the-zoo/preparer-votre-visite/animaux-extraordinaires/orques/Animaux-Orques-Marineland-main.jpg.transform/rendition-sm/image.jpg',
      name: 'Marineland Cote D\'azure',
      parkType: ParkType.THEMEPARK,
      company: Company.PARQUES_REUNIDOS,
      location: {
        lat: 43.61387018300226,
        lng: 7.125566770590017
      },
      timezone: 'Europe/Paris'
    }
  }

  getShowType(): 'new' | 'old' | 'unsupported' {
    return 'new';
  }

  supportsRestaurants(): boolean {
    return true;
  }

  getShowCategoryID(): string {
    return '8555';
  }

  supportsAnimals(): boolean {
    return true;
  }

  getStayEstablishment(): string {
    return 'D4g6';
  }
}
