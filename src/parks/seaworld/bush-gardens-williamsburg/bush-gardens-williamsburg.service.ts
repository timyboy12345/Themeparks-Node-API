import { Injectable } from '@nestjs/common';
import { SeaworldBaseService } from '../seaworld-base/seaworld-base.service';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class BushGardensWilliamsburgService extends SeaworldBaseService {
  getInfo(): ThemePark {
    return {
      countryCode: 'us',
      description: 'Busch Gardens Williamsburg is een pretpark van 422 hectare in James City County nabij Williamsburg, Virginia, Verenigde Staten. Het park ligt ongeveer 60 mijl ten noordwesten van Virginia Beach, is ontwikkeld door Anheuser-Busch en is eigendom van SeaWorld Parks & Entertainment.',
      id: 'bush-gardens-williamsburg',
      image: 'https://buschgardens.com/williamsburg/-/media/media-migration/busch-gardens-williamsburg/images/homepage/seasonal/fall/2023/featured-story/660x410_bgw_fall_homepage_coasters_featured_story.ashx',
      name: 'Bush Gardens Williamsburg',
      parkType: ParkType.THEMEPARK,
      company: Company.SEAWORLD,
      location: {
        lat: 37.233801320153354,
        lng: -76.64381793862077,
      },
    };
  }

  getParkId(): string {
    return '45FE1F31-D4E4-4B1E-90E0-5255111070F2';
  }
}
