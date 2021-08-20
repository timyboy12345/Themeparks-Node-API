import { Test, TestingModule } from '@nestjs/testing';
import { BellewaerdeTransferService } from './bellewaerde-transfer.service';

describe('BellewaerdeTransferService', () => {
  let service: BellewaerdeTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BellewaerdeTransferService],
    }).compile();

    service = module.get<BellewaerdeTransferService>(BellewaerdeTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
