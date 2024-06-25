import { Injectable } from '@nestjs/common';
import { CedarfairBaseService } from '../cedarfair-base/cedarfair-base.service';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class CarowindsService extends CedarfairBaseService {
  getInfo(): ThemePark {
    return {
      name: 'Carowinds',
      image: 'https://d2j8c2rj2f9b78.cloudfront.net/uploads/carowinds/DSC_9931.jpg',
      description: 'Carowinds is een attractiepark gelegen in Charlotte, North Carolina in de Verenigde Staten. Het park bestrijkt 1,61 km² oppervlakte. Het park is eigendom van de Cedar Fair Entertainment Company. De voormalige eigenaar was onderdeel van de Paramount Parks keten die overgenomen werd door Cedar Fair op 30 juni 2006.',
      timezone: 'America/New_York',
      countryCode: 'us',
      parkType: ParkType.THEMEPARK,
      id: 'carowinds',
      company: Company.CEDAR_FAIR
    };
  }

  protected getParkId(): string {
    return "30";
  }
}
