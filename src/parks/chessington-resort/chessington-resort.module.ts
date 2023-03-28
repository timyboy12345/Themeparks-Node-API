import { Module } from '@nestjs/common';
import { ChessingtonResortService } from './chessington-resort.service';
import { ConfigModule } from '@nestjs/config';
import { AioTransferServiceService } from '../../_services/aio/transfer-service/aio-transfer-service.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [ChessingtonResortService, AioTransferServiceService],
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  exports: [ChessingtonResortService],
})
export class ChessingtonResortModule {
}
