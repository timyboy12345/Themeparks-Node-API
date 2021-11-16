import { Test, TestingModule } from '@nestjs/testing';
import { LisebergTransferService } from './liseberg-transfer.service';

describe('LisebergTransferService', () => {
  let service: LisebergTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LisebergTransferService],
    }).compile();

    service = module.get<LisebergTransferService>(LisebergTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
