import { Test, TestingModule } from '@nestjs/testing';
import { CompagnieDesAlpesTransferService } from './compagnie-des-alpes-transfer.service';

describe('CompagnieDesAlpesTransferService', () => {
  let service: CompagnieDesAlpesTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompagnieDesAlpesTransferService],
    }).compile();

    service = module.get<CompagnieDesAlpesTransferService>(CompagnieDesAlpesTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
