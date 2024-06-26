import { Module } from '@nestjs/common';
import { PaultonsParkService } from './paultons-park.service';
import { ConfigModule } from '@nestjs/config';
import { AioTransferServiceService } from '../../_services/aio/transfer-service/aio-transfer-service.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [PaultonsParkService, AioTransferServiceService],
  exports: [PaultonsParkService],
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ]
})
export class PaultonsParkModule {}
