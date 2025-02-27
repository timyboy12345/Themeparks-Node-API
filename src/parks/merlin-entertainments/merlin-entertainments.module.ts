import { Module } from '@nestjs/common';
import { MerlinEntertainmentsService } from './merlin-entertainments.service';
import { HeidiParkService } from './heidi-park/heidi-park.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AioTransferServiceService } from '../../_services/aio/transfer-service/aio-transfer-service.service';
import { GardalandService } from './gardaland/gardaland.service';
import { LegolandDeutschlandService } from './legoland-deutschland/legoland-deutschland.service';
import { LegolandBillundService } from './legoland-billund/legoland-billund.service';
import { LegolandCaliforniaService } from './legoland-california/legoland-california.service';
import { LegolandWindsorResortService } from './legoland-windsor-resort/legoland-windsor-resort.service';

@Module({
  providers: [MerlinEntertainmentsService, HeidiParkService, GardalandService, AioTransferServiceService, LegolandDeutschlandService, LegolandBillundService, LegolandBillundService, LegolandCaliforniaService, LegolandWindsorResortService],
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  exports: [MerlinEntertainmentsService, HeidiParkService, GardalandService, LegolandDeutschlandService, LegolandBillundService],
})
export class MerlinEntertainmentsModule {
}
