import { Test, TestingModule } from '@nestjs/testing';
import { TivoliTransferService } from './tivoli-transfer.service';

describe('TivoliTransferService', () => {
  let service: TivoliTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TivoliTransferService],
    }).compile();

    service = module.get<TivoliTransferService>(TivoliTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
