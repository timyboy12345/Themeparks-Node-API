import { Injectable } from '@nestjs/common';
import { CedarfairBaseService } from '../cedarfair-base/cedarfair-base.service';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class MichigansAdventureService extends CedarfairBaseService {
  protected getParkId(): string {
    return 'CF_MA';
  }

  getInfo(): ThemePark {
    return {
      parkType: ParkType.THEMEPARK,
      countryCode: 'us',
      timezone: '',
      id: 'michigans-adventure',
      name: 'Michigans Adventure',
      description: '',
      image: '',
    }
  }
}
