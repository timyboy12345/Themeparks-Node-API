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
      image: 'https://drupal8-prod.visitcalifornia.com/sites/drupal8-prod.visitcalifornia.com/files/styles/fluid_1200/public/GreatAmerica_CourtesyGreatAmerica_1280x642.jpg?itok=pu0lKHY9',
      name: 'California\'s Great Adventure',
      company: Company.CEDAR_FAIR
    }
  }
}
