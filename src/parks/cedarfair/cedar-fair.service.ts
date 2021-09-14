import { Injectable } from '@nestjs/common';
import { CompanyService } from '../../_services/company/company.service';
import { ThemeParkService } from '../../_services/themepark/theme-park.service';
import { CanadasWonderlandService } from './canadas-wonderland/canadas-wonderland.service';
import { CarowindsService } from './carowinds/carowinds.service';
import { CedarpointService } from './cedarpoint/cedarpoint.service';
import { DorneyParkService } from './dorney-park/dorney-park.service';
import { GreatAmericaService } from './great-america/great-america.service';
import { KingsDominionService } from './kings-dominion/kings-dominion.service';
import { KingsIslandService } from './kings-island/kings-island.service';
import { KnottsBerryFarmService } from './knotts-berry-farm/knotts-berry-farm.service';
import { MichigansAdventureService } from './michigans-adventure/michigans-adventure.service';
import { ValleyfairService } from './valleyfair/valleyfair.service';
import { WorldsOfFunService } from './worlds-of-fun/worlds-of-fun.service';

@Injectable()
export class CedarFairService extends CompanyService {
  constructor(private readonly _canadasWonderlandService: CanadasWonderlandService,
              private readonly _carowindsService: CarowindsService,
              private readonly _cedarPointService: CedarpointService,
              private readonly _dorneyParkService: DorneyParkService,
              private readonly _greatAmericaService: GreatAmericaService,
              private readonly _kingsDominionService: KingsDominionService,
              private readonly _kingsIslandService: KingsIslandService,
              private readonly _knottsBerryFarmService: KnottsBerryFarmService,
              private readonly _michigansAdventureService: MichigansAdventureService,
              private readonly _valleyFairService: ValleyfairService,
              private readonly _worldsOfFunService: WorldsOfFunService) {
    super();
  }

  async getParkServices(): Promise<ThemeParkService[]> {
    return [
      this._canadasWonderlandService,
      this._carowindsService,
      this._cedarPointService,
      this._dorneyParkService,
      this._greatAmericaService,
      this._kingsDominionService,
      this._kingsIslandService,
      this._knottsBerryFarmService,
      this._michigansAdventureService,
      this._valleyFairService,
      this._worldsOfFunService
    ]
  }
}
