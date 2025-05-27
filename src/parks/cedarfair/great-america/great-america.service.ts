import { Injectable } from '@nestjs/common';
import { CedarfairBaseService } from '../cedarfair-base/cedarfair-base.service';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class GreatAmericaService extends CedarfairBaseService{
  protected getParkId(): string {
    return "35";
  }

  getInfo(): ThemePark {
    return {
      id: 'great-america',
      parkType: ParkType.THEMEPARK,
      countryCode: 'us',
      timezone: 'America/Los_Angeles',
      description: 'California\'s Great America is een attractiepark in de Amerikaanse stad Santa Clara (Californië). Het pretpark is in het bezit van en wordt uitgebaat door de firma Cedar Fair Entertainment Company uit Ohio.',
      image: 'https://external-preview.redd.it/KgaCbi6Y0K6ndiqqtv9RiL1ATB6cF8lF0IUxtHf2tMg.jpg?auto=webp&s=667649ec33b6205b1e73d30c8d7463cef747fdc5',
      name: 'California\'s Great America',
      company: Company.CEDAR_FAIR
    }
  }
}
