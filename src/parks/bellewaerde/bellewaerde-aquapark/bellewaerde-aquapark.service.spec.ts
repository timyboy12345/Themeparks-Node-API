import { Test, TestingModule } from '@nestjs/testing';
import { BellewaerdeAquaparkService } from './bellewaerde-aquapark.service';
import { BellewaerdeTransferService } from '../bellewaerde-transfer/bellewaerde-transfer.service';
import { HttpModule } from '@nestjs/axios';

describe('BellewaerdeAquaparkService', () => {
  let service: BellewaerdeAquaparkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BellewaerdeAquaparkService, BellewaerdeTransferService],
      imports: [HttpModule]
    }).compile();

    service = module.get<BellewaerdeAquaparkService>(BellewaerdeAquaparkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
