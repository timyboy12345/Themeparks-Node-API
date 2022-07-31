import { Injectable } from '@nestjs/common';
import { CedarfairBaseService } from '../cedarfair-base/cedarfair-base.service';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class CanadasWonderlandService extends CedarfairBaseService {
  protected getParkId(): string {
    return 'CF_CW';
  }

  getInfo(): ThemePark {
    return {
      id: 'canadas-wonderland',
      name: 'Canada\'s Wonderland',
      description: 'Canada\'s Wonderland is een attractiepark in Vaughan in Canada, zo´n 30 km ten noorden van Toronto. Het park is eigendom van Cedar Fair Entertainment Company, een parkengroep die vooral bekend is van het park Cedar Point. Het park krijgt jaarlijks tussen 3 en 4 miljoen bezoekers.',
      image: 'https://pbs.twimg.com/media/E3UDlLOX0AU_Ze-.jpg',
      parkType: ParkType.THEMEPARK,
      countryCode: 'us',
      timezone: 'America/Toronto',
      company: Company.CEDAR_FAIR,
    };
  }
}
