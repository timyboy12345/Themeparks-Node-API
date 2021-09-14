import { Test, TestingModule } from '@nestjs/testing';
import { CedarFairService } from './cedar-fair.service';
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
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CedarfairTransferService } from './cedarfair-transfer/cedarfair-transfer.service';

describe('CedarFairService', () => {
  let service: CedarFairService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CedarFairService, CanadasWonderlandService, CarowindsService, CedarpointService, DorneyParkService, GreatAmericaService, KingsDominionService, KingsIslandService, KnottsBerryFarmService, MichigansAdventureService, ValleyfairService, WorldsOfFunService, CedarfairTransferService],
      imports: [
        HttpModule, ConfigModule.forRoot()
      ]
    }).compile();

    service = module.get<CedarFairService>(CedarFairService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a list of parks', () => {
    expect(service.getParkServices()).toBeDefined();
  });
});
