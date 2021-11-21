import { HttpModule, Module } from '@nestjs/common';
import { ThorpeParkService } from './thorpe-park.service';
import { ConfigModule } from '@nestjs/config';
import { AioTransferServiceService } from '../../_services/aio/transfer-service/aio-transfer-service.service';

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
