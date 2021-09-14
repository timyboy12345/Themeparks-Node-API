import { Test, TestingModule } from '@nestjs/testing';
import { CedarFairService } from './cedar-fair.service';

describe('CedarFairService', () => {
  let service: CedarFairService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CedarFairService],
    }).compile();

    service = module.get<CedarFairService>(CedarFairService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
