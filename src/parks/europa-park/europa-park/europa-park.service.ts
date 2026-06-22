import { Injectable } from '@nestjs/common';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { EuropaParkBaseService } from '../europa-park-base/europa-park-base.service';

@Injectable()
export class EuropaParkService extends EuropaParkBaseService {
  getInfo(): ThemePark {
    return {
      id: 'europa-park',
      timezone: 'Europe/Berlin',
      parkType: ParkType.THEMEPARK,
      countryCode: 'de',
      description: 'Europa-Park, geopend in 1975, is een attractiepark bij Rust in de Duitse deelstaat Baden-Württemberg. Het thema is het werelddeel Europa met haar verschillende landen. In 2023 was het na het Disneyland (Park) in Parijs het meest bezochte attractiepark van Europa',
      image: 'https://www.europapark.de/sites/default/files/media_image/2026-02/panorama_europa-park_1.jpg',
      name: 'Europa Park',
      location: {
        lat: 48.26608365626527,
        lng: 7.722061242161103,
      },
    };
  }

  getParkName(){
    return "europapark"
  }
}
