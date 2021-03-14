import { Test, TestingModule } from '@nestjs/testing';
import { BellewaerdeService } from './bellewaerde.service';

describe('BellewaerdeService', () => {
  let service: BellewaerdeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BellewaerdeService],
    }).compile();

    service = module.get<BellewaerdeService>(BellewaerdeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
