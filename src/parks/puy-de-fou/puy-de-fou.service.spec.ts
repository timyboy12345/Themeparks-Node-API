import { Test, TestingModule } from '@nestjs/testing';
import { PuyDeFouService } from './puy-de-fou.service';

describe('PuyDeFouService', () => {
  let service: PuyDeFouService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PuyDeFouService],
    }).compile();

    service = module.get<PuyDeFouService>(PuyDeFouService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
