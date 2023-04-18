import { Injectable } from '@nestjs/common';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ParquesReunidosParkService } from '../parques-reunidos-park.service';

@Injectable()
export class ParqueDeAtraccionesService extends ParquesReunidosParkService {
  getInfo(): ThemePark {
    return {
      countryCode: 'es',
      description: 'Het Parque de Atracciones de Madrid is een attractiepark in de buurt van Madrid in het park Casa de Campo. Het werd geopend in 1969. Parque de Atracciones is wat ligging betreft vergelijkbaar met Tivoli in Kopenhagen. Het park ligt in de groene zone van de stad en is vlot bereikbaar met de metro.',
      id: 'parque-de-atracciones-madrid',
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Entrada_Parque_de_Atracciones_de_Madrid.jpg',
      location: { lat: 40.413120, lng: -3.750970 },
      name: 'Parque de Atracciones Madrid',
      parkType: ParkType.THEMEPARK,
      timezone: 'Europe/Madrid'
    }
  }

  getStayEstablishment(): string {
    return 'QRMy';
  }

  getShowCategoryID(): string {
    return '117626';
  }
}
