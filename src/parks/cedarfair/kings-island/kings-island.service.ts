import { Injectable } from '@nestjs/common';
import { CedarfairBaseService } from '../cedarfair-base/cedarfair-base.service';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class KingsIslandService extends CedarfairBaseService {
  protected getParkId(): string {
    return "20";
  }

  getInfo(): ThemePark {
    return {
      id: 'kings-island',
      name: 'Kings Island',
      description: 'Kings Island is een attractiepark in het Amerikaanse Mason, Ohio. Het totale grondoppervlak in bezit van het park is 314 ha maar slechts 147 ha is bebouwd. Kings Island is eigendom van de Cedar Fair Entertainment Company die het park kocht van Paramount Parks.',
      image: 'https://cdn-cloudfront.cfauthx.com/binaries/content/gallery/kings-island/menu/features/ki-orion-menufeaturev2.jpg',
      parkType: ParkType.THEMEPARK,
      countryCode: 'us',
      timezone: 'America/Los_Angeles',
      company: Company.CEDAR_FAIR,
    };
  }
}
