import { Module } from '@nestjs/common';
import { GardalandService } from './gardaland.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AioTransferServiceService } from '../../_services/aio/transfer-service/aio-transfer-service.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  providers: [GardalandService, AioTransferServiceService],
  exports: [GardalandService],
})
export class GardalandModule {}
