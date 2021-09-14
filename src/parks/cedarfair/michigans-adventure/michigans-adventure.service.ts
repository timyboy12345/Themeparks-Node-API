import { Injectable } from '@nestjs/common';
import { CedarfairBaseService } from '../cedarfair-base/cedarfair-base.service';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';

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
      description: 'Michigan\'s Adventure is een pretpark van 250 hectare in Muskegon County, Michigan, ongeveer halverwege tussen Muskegon en Whitehall. Het is het grootste pretpark in de staat en is sinds 2001 eigendom van en wordt beheerd door Cedar Fair.',
      image: 'https://cdn-cloudfront.cfauthx.com/binaries/content/gallery/ma-en-us/blogs/v2/season-pass-perks-banner.jpg',
      company: Company.CEDAR_FAIR
    }
  }
}
