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

@Module({
  providers: [CedarfairBaseService, CarowindsService, CedarfairTransferService, GreatAmericaService, CedarpointService, CanadasWonderlandService, KingsIslandService, KnottsBerryFarmService],
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
