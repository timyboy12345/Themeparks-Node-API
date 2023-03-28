import { Module } from '@nestjs/common';
import { ThorpeParkService } from './thorpe-park.service';
import { ConfigModule } from '@nestjs/config';
import { AioTransferServiceService } from '../../_services/aio/transfer-service/aio-transfer-service.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [ThorpeParkService, AioTransferServiceService],
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  exports: [
    ThorpeParkService
  ]
})
export class ThorpeParkModule {}
