import { Injectable } from '@nestjs/common';
import { ParqueDeAtraccionesService } from '../parque-de-atracciones/parque-de-atracciones.service';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class MirabilandiaService extends ParqueDeAtraccionesService {
  getInfo(): ThemePark {
    return {
      countryCode: 'it',
      description: 'Mirabilandia is een Italiaans pretpark, gelegen in Savio nabij Ravenna, Emilia-Romagna. Het park ontvangt jaarlijks ongeveer 1,8 miljoen bezoekers en is daarmee het op een na grootste pretpark van Italië. Het heeft een oppervlakte van 30 hectare met een extra 10 hectare voor het waterwereld gedeelte',
      id: 'mirabilandia',
      image: 'https://www.mirabilandia.it/content/mir/en/scopri-il-parco/organizza-la-tua-visita/aree-tematiche/ducati-world/_jcr_content/responsiveGrid/cc18_columns_copy/col_1/ca03_image.coreimg.jpeg/1622553207215/ducati-world-thematic-areas-mirabilandia-2.jpeg',
      name: 'Mirabilandia',
      parkType: ParkType.THEMEPARK,
      location: {
        lat: 44.337796958387614,
        lng: 12.26365557672404,
      },
    };
  }

  // TODO: This probably isn't unsupported in the summer
  getShowType(): 'new' | 'old' | 'unsupported' {
    return 'unsupported';
  }

  supportsRestaurants(): boolean {
    return true;
  }

  getStayEstablishment(): string {
    return 'm5Oo';
  }
}
