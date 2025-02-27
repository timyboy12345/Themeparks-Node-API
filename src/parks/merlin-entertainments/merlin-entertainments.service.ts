import { Injectable } from '@nestjs/common';
import { CompanyService } from '../../_services/company/company.service';
import { ThemeParkService } from '../../_services/themepark/theme-park.service';
import { HeidiParkService } from './heidi-park/heidi-park.service';
import { GardalandService } from './gardaland/gardaland.service';
import { LegolandDeutschlandService } from './legoland-deutschland/legoland-deutschland.service';
import { LegolandBillundService } from './legoland-billund/legoland-billund.service';
import { LegolandCaliforniaService } from './legoland-california/legoland-california.service';
import { LegolandWindsorResortService } from './legoland-windsor-resort/legoland-windsor-resort.service';

@Injectable()
export class MerlinEntertainmentsService extends CompanyService{
  constructor(private _heidiPark: HeidiParkService,
              private _gardaland: GardalandService,
              private _legolandDeutschland: LegolandDeutschlandService,
              private _legolandBillund: LegolandBillundService,
              private _legolandCalifornia: LegolandCaliforniaService,
              private _legolandWindsor: LegolandWindsorResortService) {
    super();
  }

  async getParkServices(): Promise<ThemeParkService[]> {
    return [
      this._heidiPark,
      this._gardaland,
      this._legolandDeutschland,
      this._legolandBillund,
      this._legolandCalifornia,
      this._legolandWindsor
    ];
  }
}
