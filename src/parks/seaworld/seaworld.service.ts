import { Injectable } from '@nestjs/common';
import { CompanyService } from '../../_services/company/company.service';
import { ThemeParkService } from '../../_services/themepark/theme-park.service';
import { SeaworldSanAntonioService } from './seaworld-san-antonio/seaworld-san-antonio.service';
import { SeaworldSanDiegoService } from './seaworld-san-diego/seaworld-san-diego.service';
import { SeaworldOrlandoService } from './seaworld-orlando/seaworld-orlando.service';
import { BushGardensTampaBayService } from './bush-gardens-tampa-bay/bush-gardens-tampa-bay.service';
import { BushGardensWilliamsburgService } from './bush-gardens-williamsburg/bush-gardens-williamsburg.service';

@Injectable()
export class SeaworldService extends CompanyService {
  constructor(
    private readonly seaworldSanAntonio: SeaworldSanAntonioService,
    private readonly seaworldSanDiego: SeaworldSanDiegoService,
    private readonly seaworldOrlando: SeaworldOrlandoService,
    private readonly bushGardensTampaBay: BushGardensTampaBayService,
    private readonly bushGardensWilliamsburg: BushGardensWilliamsburgService,
  ) {
    super();
  }

  async getParkServices(): Promise<ThemeParkService[]> {
    return [
      this.seaworldSanAntonio,
      this.seaworldSanDiego,
      this.seaworldOrlando,
      this.bushGardensTampaBay,
      this.bushGardensWilliamsburg
    ];
  }
}
