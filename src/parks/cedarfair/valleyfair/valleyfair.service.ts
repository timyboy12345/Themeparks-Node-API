import { Injectable } from '@nestjs/common';
import { CedarfairBaseService } from '../cedarfair-base/cedarfair-base.service';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class ValleyfairService extends CedarfairBaseService {
  protected getParkId(): string {
    return 'CF_VF';
  }

  getInfo(): ThemePark {
    return {
      parkType: ParkType.THEMEPARK,
      countryCode: 'us',
      timezone: '',
      id: 'valley-fair',
      name: 'Valley Fair',
      description: '',
      image: '',
    }
  }
}
