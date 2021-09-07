import { Test, TestingModule } from '@nestjs/testing';
import { CedarfairTransferService } from './cedarfair-transfer.service';

describe('CedarfairTransferService', () => {
  let service: CedarfairTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CedarfairTransferService],
    }).compile();

    service = module.get<CedarfairTransferService>(CedarfairTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
