import { Test, TestingModule } from '@nestjs/testing';
import { LegolandCaliforniaService } from './legoland-california.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AioTransferServiceService } from '../../../_services/aio/transfer-service/aio-transfer-service.service';

describe('LegolandCaliforniaService', () => {
  let service: LegolandCaliforniaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LegolandCaliforniaService, AioTransferServiceService],
      imports: [
        HttpModule,
        ConfigModule.forRoot()
      ]
    }).compile();

    service = module.get<LegolandCaliforniaService>(LegolandCaliforniaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
