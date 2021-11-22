import { HttpModule, Module } from '@nestjs/common';
import { SanDiegoZooService } from './san-diego-zoo/san-diego-zoo.service';
import { SanDiegoSafariParkService } from './san-diego-safari-park/san-diego-safari-park.service';
import { ConfigModule } from '@nestjs/config';
import { AioTransferServiceService } from '../../_services/aio/transfer-service/aio-transfer-service.service';

@Module({
  providers: [SanDiegoZooService, SanDiegoSafariParkService, AioTransferServiceService],
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  exports: [SanDiegoZooService, SanDiegoSafariParkService]
})
export class SanDiegoZooModule {}
