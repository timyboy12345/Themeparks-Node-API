import { Injectable } from '@nestjs/common';
import { CedarfairBaseService } from '../cedarfair-base/cedarfair-base.service';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class KingsDominionService extends CedarfairBaseService {
  protected getParkId(): string {
    return 'CF_KD';
  }

  getInfo(): ThemePark {
    return {
      parkType: ParkType.THEMEPARK,
      countryCode: 'us',
      timezone: '',
      id: 'kings-dominion',
      name: 'King\'s Dominion',
      description: '',
      image: '',
    }
  }
}
