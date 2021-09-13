import { Injectable } from '@nestjs/common';
import { CedarfairBaseService } from '../cedarfair-base/cedarfair-base.service';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class WorldsOfFunService extends CedarfairBaseService {
  protected getParkId(): string {
    return 'CF_WF';
  }

  getInfo(): ThemePark {
    return {
      parkType: ParkType.THEMEPARK,
      countryCode: 'us',
      timezone: '',
      id: 'worlds-of-fun',
      name: 'Worlds of Fun',
      description: '',
      image: '',
    }
  }
}
