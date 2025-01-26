import { Test, TestingModule } from '@nestjs/testing';
import { PairiDaizaTransferService } from './pairi-daiza-transfer.service';

describe('PairiDaizaTransferService', () => {
  let service: PairiDaizaTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PairiDaizaTransferService],
    }).compile();

    service = module.get<PairiDaizaTransferService>(PairiDaizaTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
