import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HellendoornService } from './hellendoorn.service';
import { AioTransferServiceService } from '../../_services/aio/transfer-service/aio-transfer-service.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  exports: [HellendoornService],
  providers: [HellendoornService, AioTransferServiceService],
})
export class HellendoornModule {
}
