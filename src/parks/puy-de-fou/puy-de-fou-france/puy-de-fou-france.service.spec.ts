import { Test, TestingModule } from '@nestjs/testing';
import { PuyDeFouFranceService } from './puy-de-fou-france.service';

describe('PuyDeFouFranceService', () => {
  let service: PuyDeFouFranceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PuyDeFouFranceService],
    }).compile();

    service = module.get<PuyDeFouFranceService>(PuyDeFouFranceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
