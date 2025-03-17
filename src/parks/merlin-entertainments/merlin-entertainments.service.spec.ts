import { Test, TestingModule } from '@nestjs/testing';
import { MerlinEntertainmentsService } from './merlin-entertainments.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { HeideParkService } from './heide-park/heide-park.service';
import { AioTransferServiceService } from '../../_services/aio/transfer-service/aio-transfer-service.service';
import { GardalandService } from './gardaland/gardaland.service';
import { LegolandWindsorResortService } from './legoland-windsor-resort/legoland-windsor-resort.service';
import { LegolandCaliforniaService } from './legoland-california/legoland-california.service';
import { LegolandBillundService } from './legoland-billund/legoland-billund.service';
import { LegolandDeutschlandService } from './legoland-deutschland/legoland-deutschland.service';

describe('MerlinEntertainmentsService', () => {
  let service: MerlinEntertainmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MerlinEntertainmentsService, HeideParkService, GardalandService, LegolandWindsorResortService, LegolandCaliforniaService, LegolandBillundService, LegolandDeutschlandService, AioTransferServiceService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<MerlinEntertainmentsService>(MerlinEntertainmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
