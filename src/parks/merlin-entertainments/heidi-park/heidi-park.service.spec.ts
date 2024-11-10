import { Test, TestingModule } from '@nestjs/testing';
import { HeidiParkService } from './heidi-park.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AioTransferServiceService } from '../../../_services/aio/transfer-service/aio-transfer-service.service';

describe('HeidiParkService', () => {
  let service: HeidiParkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeidiParkService, AioTransferServiceService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<HeidiParkService>(HeidiParkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
