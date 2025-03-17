import { Module } from '@nestjs/common';
import { DjursSommerlandService } from './djurs-sommerland.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AioTransferServiceService } from '../../_services/aio/transfer-service/aio-transfer-service.service';

@Module({
  providers: [DjursSommerlandService, AioTransferServiceService],
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  exports: [DjursSommerlandService],
})
export class DjursSommerlandModule {}
