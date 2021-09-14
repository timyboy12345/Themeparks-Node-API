import { Injectable } from '@nestjs/common';
import { CedarfairBaseService } from '../cedarfair-base/cedarfair-base.service';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';

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
      description: 'Worlds of Fun is een pretpark van 235 hectare in Kansas City, Missouri, Verenigde Staten. Opgericht door Amerikaanse zakenlieden Lamar Hunt en Jack Steadman, opende het park in 1973 onder eigendom van Hunt\'s bedrijf, Mid-America Enterprises.',
      image: 'https://assets.simpleviewinc.com/simpleview/image/fetch/c_limit,q_75,w_1200/https://assets.simpleviewinc.com/simpleview/image/upload/crm/overlandpark/Mamba-2-1c094b5e5056a36_1c094eec-5056-a36a-0935f5f62dc8a9d3.jpg',
      company: Company.CEDAR_FAIR
    }
  }
}
