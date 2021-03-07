import { HttpException, Injectable } from '@nestjs/common';
import { ThemeparkService } from '../themepark/themepark.service';
import { EftelingService } from '../../efteling/efteling.service';
import { ToverlandService } from '../../toverland/toverland.service';
import { WalibiHollandService } from '../../walibi/holland/walibi-holland.service';

@Injectable()
export class ParksService {
  private readonly _parks: ThemeparkService[];

  constructor(private readonly _eftelingService: EftelingService,
              private readonly _toverlandService: ToverlandService,
              private readonly _walibiHollandService: WalibiHollandService) {
    this._parks = [];
    this._parks.push(_eftelingService);
    this._parks.push(_toverlandService);
    this._parks.push(_walibiHollandService);
  }

  public getParks() {
    return this._parks;
  }

  public findPark(id: string, throwError = false) {
    const park = this.getParks().find(park => park.getInfo().id == id);

    if (park == null && throwError) {
      throw new HttpException('Park not found', 404);
    }

    return park;
  }
}
