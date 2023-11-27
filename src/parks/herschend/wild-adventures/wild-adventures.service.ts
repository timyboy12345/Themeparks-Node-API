import { Injectable } from '@nestjs/common';
import { HerschendBaseService } from '../herschend-base/herschend-base.service';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class WildAdventuresService extends HerschendBaseService {
  getInfo(): ThemePark {
    return {
      countryCode: 'us',
      description: 'Wild Adventures is een zoölogisch themapark in Clyattville, Georgia, 8 km ten zuiden van Valdosta, Georgia, Verenigde Staten. Het is eigendom van Herschend Family Entertainment en wordt sinds oktober 2020 beheerd door Jon Vigue.',
      id: 'Wild Adventures',
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/77/60/56/img-20180622-145836680.jpg?w=1200&h=1200&s=1',
      name: 'Wild Adventures',
      parkType: ParkType.THEMEPARK,
      location: {
        lat: 30.719381940178394,
        lng: -83.32258344603443,
      }
    }
  }

  protected getParkId(): number {
    return 3;
  }
}
