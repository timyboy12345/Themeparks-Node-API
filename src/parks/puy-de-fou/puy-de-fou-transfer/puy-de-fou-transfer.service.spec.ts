import { Test, TestingModule } from '@nestjs/testing';
import { PuyDeFouTransferService } from './puy-de-fou-transfer.service';

describe('PuyDeFouTransferService', () => {
  let service: PuyDeFouTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PuyDeFouTransferService],
    }).compile();

    service = module.get<PuyDeFouTransferService>(PuyDeFouTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
