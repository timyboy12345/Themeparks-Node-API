import { Injectable } from '@nestjs/common';
import { CedarfairBaseService } from '../cedarfair-base/cedarfair-base.service';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class DorneyParkService extends CedarfairBaseService {
  protected getParkId(): string {
    return 'CF_DP';
  }

  getInfo(): ThemePark {
    return {
      parkType: ParkType.THEMEPARK,
      countryCode: 'us',
      timezone: '',
      id: 'dorney-park',
      name: 'Dorney Park',
      description: '',
      image: '',
    }
  }
}
