import { Test, TestingModule } from '@nestjs/testing';
import { KingsIslandService } from './kings-island.service';

describe('KingsIslandService', () => {
  let service: KingsIslandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KingsIslandService],
    }).compile();

    service = module.get<KingsIslandService>(KingsIslandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
