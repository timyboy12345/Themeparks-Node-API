import { Injectable } from '@nestjs/common';
import { CedarfairBaseService } from '../cedarfair-base/cedarfair-base.service';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class CedarpointService extends CedarfairBaseService {
  protected getParkId(): string {
    return 'CF_CP';
  }

  getInfo(): ThemePark {
    return {
      id: 'cedarpoint',
      name: 'Cedar Point',
      image: 'https://www.clickondetroit.com/resizer/J01xOnuMS5b-ElARSjfqYMHNOq4=/640x360/smart/filters:format(jpeg):strip_exif(true):strip_icc(true):no_upscale(true):quality(65)/cloudfront-us-east-1.images.arcpublishing.com/gmg/LQQ3OD4KU5GXTBCIVRQDW644VU.jpg',
      description: 'Cedar Point is een attractiepark, gelegen in Sandusky op een schiereiland aan de zuidelijke oever van het Eriemeer in Ohio en bestaat sinds 1870. Het park trekt ongeveer drie miljoen bezoekers per jaar. Het vlakbijgelegen waterpark Soak City is ook onderdeel van Cedar Point. De mascotte van het park is Snoopy.',
      timezone: 'America/New_York',
      countryCode: 'us',
      parkType: ParkType.THEMEPARK,
      company: Company.CEDAR_FAIR
    };
  }
}
