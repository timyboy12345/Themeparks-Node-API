import { HttpModule, Module } from '@nestjs/common';
import { CedarfairBaseService } from './cedarfair-base/cedarfair-base.service';
import { ConfigModule } from '@nestjs/config';
import { CarowindsService } from './carowinds/carowinds.service';
import { CedarfairTransferService } from './cedarfair-transfer/cedarfair-transfer.service';
import { GreatAmericaService } from './great-america/great-america.service';
import { CedarpointService } from './cedarpoint/cedarpoint.service';

@Module({
  providers: [CedarfairBaseService, CarowindsService, CedarfairTransferService, GreatAmericaService, CedarpointService],
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
