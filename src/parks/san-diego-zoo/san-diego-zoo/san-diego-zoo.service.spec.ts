import { Test, TestingModule } from '@nestjs/testing';
import { SanDiegoZooService } from './san-diego-zoo.service';

describe('SanDiegoZooService', () => {
  let service: SanDiegoZooService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SanDiegoZooService],
    }).compile();

    service = module.get<SanDiegoZooService>(SanDiegoZooService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
