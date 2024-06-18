import { Test, TestingModule } from '@nestjs/testing';
import { BellewaerdeService } from './bellewaerde.service';
import { HttpModule } from '@nestjs/axios';
import { BellewaerdeTransferService } from '../bellewaerde-transfer/bellewaerde-transfer.service';

describe('BellewaerdeService', () => {
  let service: BellewaerdeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BellewaerdeService, BellewaerdeTransferService],
      imports: [HttpModule]
    }).compile();

    service = module.get<BellewaerdeService>(BellewaerdeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return info', () => {
    expect(service.getInfo().id).toBeDefined();
  });

  it('should return a list of POIs', async () => {
    const data = await service.getPois();
    expect(data).toBeInstanceOf(Array);
  }, 1000 * 60);
});
