import { HttpModule, Module } from '@nestjs/common';
import { CedarfairBaseService } from './cedarfair-base/cedarfair-base.service';
import { ConfigModule } from '@nestjs/config';
import { CarowindsService } from './carowinds/carowinds.service';
import { CedarfairTransferService } from './cedarfair-transfer/cedarfair-transfer.service';
import { GreatAmericaService } from './great-america/great-america.service';
import { CedarpointService } from './cedarpoint/cedarpoint.service';
import { CanadasWonderlandService } from './canadas-wonderland/canadas-wonderland.service';
import { KingsIslandService } from './kings-island/kings-island.service';
import { KnottsBerryFarmService } from './knotts-berry-farm/knotts-berry-farm.service';
import { MichigansAdventureService } from './michigans-adventure/michigans-adventure.service';
import { ValleyfairService } from './valleyfair/valleyfair.service';
import { WorldsOfFunService } from './worlds-of-fun/worlds-of-fun.service';
import { KingsDominionService } from './kings-dominion/kings-dominion.service';
import { DorneyParkService } from './dorney-park/dorney-park.service';

@Module({
  providers: [CedarfairBaseService, CarowindsService, CedarfairTransferService, GreatAmericaService, CedarpointService, CanadasWonderlandService, KingsIslandService, KnottsBerryFarmService, MichigansAdventureService, ValleyfairService, WorldsOfFunService, KingsDominionService, DorneyParkService],
  exports: [CarowindsService, GreatAmericaService, CedarpointService],
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    })
  ]
})
export class CedarfairModule {}
