import { Test, TestingModule } from '@nestjs/testing';
import { MerlinEntertainmentsService } from './merlin-entertainments.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { HeidiParkService } from './heidi-park/heidi-park.service';
import { AioTransferServiceService } from '../../_services/aio/transfer-service/aio-transfer-service.service';

describe('MerlinEntertainmentsService', () => {
  let service: MerlinEntertainmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MerlinEntertainmentsService, HeidiParkService, AioTransferServiceService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<MerlinEntertainmentsService>(MerlinEntertainmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
