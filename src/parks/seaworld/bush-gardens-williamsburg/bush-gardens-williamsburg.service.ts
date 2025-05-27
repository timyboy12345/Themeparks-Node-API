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
      image: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,q_75,w_1200/v1/crm/WilliamsburgVA/BGW_19_Social_Media_Images_16_626cab62-6f08-44a3-b441-524f835bbd22.jpg',
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
