import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LegolandDeutschlandService } from './legoland-deutschland/legoland-deutschland.service';
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
  providers: [LegolandDeutschlandService, AioTransferServiceService],
  exports: [LegolandDeutschlandService],
})
export class LegolandModule {
}
