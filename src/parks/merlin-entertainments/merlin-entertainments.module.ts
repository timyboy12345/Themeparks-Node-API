import { Module } from '@nestjs/common';
import { MerlinEntertainmentsService } from './merlin-entertainments.service';
import { HeidiParkService } from './heidi-park/heidi-park.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AioTransferServiceService } from '../../_services/aio/transfer-service/aio-transfer-service.service';

@Module({
  providers: [MerlinEntertainmentsService, HeidiParkService, AioTransferServiceService],
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  exports: [MerlinEntertainmentsService, HeidiParkService],
})
export class MerlinEntertainmentsModule {}
