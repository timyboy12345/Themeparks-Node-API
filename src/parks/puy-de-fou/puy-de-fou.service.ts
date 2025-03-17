import { Injectable } from '@nestjs/common';
import { CompanyService } from '../../_services/company/company.service';
import { ThemeParkService } from '../../_services/themepark/theme-park.service';
import { PuyDeFouFranceService } from './puy-de-fou-france/puy-de-fou-france.service';

@Injectable()
export class PuyDeFouService extends CompanyService {
  constructor(private _puyDeFouFrance: PuyDeFouFranceService) {
    super();
  }

  async getParkServices(): Promise<ThemeParkService[]> {
    return [
      this._puyDeFouFrance,
    ]
  }
}
