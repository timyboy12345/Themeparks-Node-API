import { HttpModule, Module } from '@nestjs/common';
import { ChessingtonResortService } from './chessington-resort.service';
import { ConfigModule } from '@nestjs/config';
import { AioTransferServiceService } from '../../_services/aio/transfer-service/aio-transfer-service.service';

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
