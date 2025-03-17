import { Test, TestingModule } from '@nestjs/testing';
import { PuyDeFouGeneralService } from './puy-de-fou-general.service';

describe('PuyDeFouGeneralService', () => {
  let service: PuyDeFouGeneralService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PuyDeFouGeneralService],
    }).compile();

    service = module.get<PuyDeFouGeneralService>(PuyDeFouGeneralService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
