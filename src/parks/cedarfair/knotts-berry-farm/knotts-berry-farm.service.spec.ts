import { Test, TestingModule } from '@nestjs/testing';
import { KnottsBerryFarmService } from './knotts-berry-farm.service';

describe('KnottsBerryFarmService', () => {
  let service: KnottsBerryFarmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KnottsBerryFarmService],
    }).compile();

    service = module.get<KnottsBerryFarmService>(KnottsBerryFarmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
