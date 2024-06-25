import { Injectable } from '@nestjs/common';
import { CedarfairBaseService } from '../cedarfair-base/cedarfair-base.service';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class ValleyfairService extends CedarfairBaseService {
  protected getParkId(): string {
    return "14";
  }

  getInfo(): ThemePark {
    return {
      parkType: ParkType.THEMEPARK,
      countryCode: 'us',
      id: 'valley-fair',
      name: 'Valley Fair',
      description: 'Valleyfair is een pretpark van 125 hectare in Shakopee, Minnesota, Verenigde Staten. Eigendom van Cedar Fair, het park werd geopend in 1976 en biedt nu meer dan 75 attracties en attracties, waaronder acht achtbanen. Valleyfair heeft ook een waterpark genaamd Soak City, dat bij de toegangsprijs is inbegrepen.',
      image: 'https://cdn-cloudfront.cfauthx.com/binaries/content/gallery/vf-en-us/blogs/2017/july/banner---things-to-do-at-valleyfair.jpg',
      company: Company.CEDAR_FAIR
    }
  }
}
