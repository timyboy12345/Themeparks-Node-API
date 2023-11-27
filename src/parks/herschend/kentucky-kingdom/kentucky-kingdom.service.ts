import { Injectable } from '@nestjs/common';
import { HerschendBaseService } from '../herschend-base/herschend-base.service';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class KentuckyKingdomService extends HerschendBaseService {
  getInfo(): ThemePark {
    return {
      countryCode: 'us',
      description: 'Seizoenspretpark en waterpark met spannende attracties, kinderattracties, waterglijbanen en golfslagbaden.',
      id: 'kentucky-kingdom',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Kentucky_Kingdom_-_Entrance_Fountain_2021.jpg/1024px-Kentucky_Kingdom_-_Entrance_Fountain_2021.jpg',
      name: 'Kentucky Kingdom',
      parkType: ParkType.THEMEPARK,
      location: {
        lat: 38.19773316318615,
        lng: -85.74476355396558,
      },
    };
  }

  protected getParkId(): number {
    return 4;
  }
}
