import { Injectable } from '@nestjs/common';
import { CedarfairBaseService } from '../cedarfair-base/cedarfair-base.service';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class KingsDominionService extends CedarfairBaseService {
  protected getParkId(): string {
    return "25";
  }

  getInfo(): ThemePark {
    return {
      parkType: ParkType.THEMEPARK,
      countryCode: 'us',
      timezone: '',
      id: 'kings-dominion',
      name: 'King\'s Dominion',
      description: 'Kings Dominion is een attractiepark gelegen in Doswell, Virginia in Hannover County. Het park bestrijkt 1,6 km² oppervlakte. Het park is eigendom van de Cedar Fair Entertainment Company. De voormalige eigenaar was onderdeel van de Paramount Parks keten die overgenomen werd door Cedar Fair op 30 juni 2006.',
      image: 'https://media.wusa9.com/assets/WUSA/images/8d0e9ca8-d762-4bec-8910-91bc542f1636/8d0e9ca8-d762-4bec-8910-91bc542f1636_1920x1080.jpg',
      company: Company.CEDAR_FAIR
    }
  }
}
