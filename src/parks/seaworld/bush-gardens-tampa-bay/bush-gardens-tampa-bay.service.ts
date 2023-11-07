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
      image: 'https://buschgardens.com/tampa/-/media/busch-gardens-tampa/listing-images/357x229/rides-and-kid-friendly-attractions/2017_buschgardenstampabay_rollercoasters_cobrascurse_listingimage_357x229.ashx',
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
