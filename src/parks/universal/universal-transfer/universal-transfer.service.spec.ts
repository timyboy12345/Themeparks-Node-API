import { Test, TestingModule } from '@nestjs/testing';
import { UniversalTransferService } from './universal-transfer.service';

describe('UniversalTransferService', () => {
  let service: UniversalTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniversalTransferService],
    }).compile();

    service = module.get<UniversalTransferService>(UniversalTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
