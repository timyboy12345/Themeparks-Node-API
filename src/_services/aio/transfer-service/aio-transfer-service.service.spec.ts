import { Test, TestingModule } from '@nestjs/testing';
import { AioTransferServiceService } from './aio-transfer-service.service';

describe('AioTransferServiceService', () => {
  jest.retryTimes(3)

  let service: AioTransferServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AioTransferServiceService],
    }).compile();

    service = module.get<AioTransferServiceService>(AioTransferServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
