import { Test, TestingModule } from '@nestjs/testing';
import { BellewaerdeService } from './bellewaerde.service';
import { BellewaerdeTransferService } from './bellewaerde-transfer/bellewaerde-transfer.service';
import { HttpModule } from '@nestjs/common';

describe('BellewaerdeService', () => {
  let service: BellewaerdeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BellewaerdeService, BellewaerdeTransferService],
      imports: [
        HttpModule
      ]
    }).compile();

    service = module.get<BellewaerdeService>(BellewaerdeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
