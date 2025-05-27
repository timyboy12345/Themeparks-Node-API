import { Injectable } from '@nestjs/common';
import { SeaworldBaseService } from '../seaworld-base/seaworld-base.service';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class BushGardensTampaBayService extends SeaworldBaseService {
  getInfo(): ThemePark {
    return {
      company: Company.SEAWORLD,
      countryCode: 'us',
      description: 'Busch Gardens Tampa Bay is een dierenattractiepark bij Tampa in de Verenigde Staten. Het pretpark is eigendom van SeaWorld Parks & Entertainment. In het park leven meer dan tweehonderd diersoorten en daarmee is het park het grootste dierenpark van Tampa',
      id: 'bush-gardens-tampa-bay',
      image: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_1600,q_75,w_2400/v1/crm/tampabay/Premium-Page-Sponsor-1244x620-BGT-Phoenix-Rising_9D99BA1C-EDE8-9173-A3DD58038AFCE6E6-9d99b8b2afb6546_9d99c4ca-f0ed-8bf9-d6fb90fffdcfc960.jpg',
      location: {
        lat: 28.03688816535075,
        lng: -82.41940295118617,
      },
      name: 'Bush Gardens Tampa Bay',
      parkType: ParkType.THEMEPARK,
    };
  }

  getParkId(): string {
    return 'C001866B-555D-4E92-B48E-CC67E195DE96';
  }
}
