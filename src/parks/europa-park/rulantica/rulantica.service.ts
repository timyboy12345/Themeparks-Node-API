import { Injectable } from '@nestjs/common';
import { EuropaParkBaseService } from '../europa-park-base/europa-park-base.service';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class RulanticaService extends EuropaParkBaseService {
  getInfo(): ThemePark {
    return {
      countryCode: 'de',
      description: 'Rulantica is een waterpark bij de plaats Rust in Duitsland. Het waterpark is onderdeel van het Europa-Park Resort en is het eigendom van de familie Mack. In totaal heeft het waterpark 27 glijbanen verspreid over binnen- en buitengebieden. Naast het park is het hotel Krønasår gelegen',
      id: 'rulantica',
      image: 'https://www.europapark.de/sites/default/files/media_image/2019-12/rulantica_skip_strand_europa-park.jpg',
      name: 'Rulantica',
      parkType: ParkType.WATER_PARK,
      location: {
        lat: 48.261207289302405,
        lng: 7.739833683725659,
      },
    };
  }

  getParkName(): string {
    return 'rulantica';
  }
}
