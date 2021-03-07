import { Test, TestingModule } from '@nestjs/testing';
import { EftelingService } from './efteling.service';

describe('EftelingService', () => {
  let service: EftelingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EftelingService],
    }).compile();

    service = module.get<EftelingService>(EftelingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
