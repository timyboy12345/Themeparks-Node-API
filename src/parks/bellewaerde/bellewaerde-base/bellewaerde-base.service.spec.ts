import { Test, TestingModule } from '@nestjs/testing';
import { BellewaerdeBaseService } from './bellewaerde-base.service';
import { HttpModule } from '@nestjs/axios';
import { BellewaerdeTransferService } from '../bellewaerde-transfer/bellewaerde-transfer.service';

describe('BellewaerdeBaseService', () => {
  let service: BellewaerdeBaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BellewaerdeBaseService, BellewaerdeTransferService],
      imports: [HttpModule]
    }).compile();

    service = module.get<BellewaerdeBaseService>(BellewaerdeBaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
