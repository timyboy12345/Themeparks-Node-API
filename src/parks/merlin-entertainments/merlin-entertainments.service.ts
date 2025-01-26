import { Injectable } from '@nestjs/common';
import { CompanyService } from '../../_services/company/company.service';
import { ThemeParkService } from '../../_services/themepark/theme-park.service';
import { HeidiParkService } from './heidi-park/heidi-park.service';

@Injectable()
export class MerlinEntertainmentsService extends CompanyService{
  constructor(private _heidiPark: HeidiParkService) {
    super();
  }

  async getParkServices(): Promise<ThemeParkService[]> {
    return [
      this._heidiPark,
    ];
  }
}
