import { Test, TestingModule } from '@nestjs/testing';
import { FerrariLandService } from './ferrariland.service';

describe('FerrarilandService', () => {
  let service: FerrariLandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FerrariLandService],
    }).compile();

    service = module.get<FerrariLandService>(FerrariLandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
