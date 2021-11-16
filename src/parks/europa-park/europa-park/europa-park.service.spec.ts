import { Test, TestingModule } from '@nestjs/testing';
import { EuropaParkService } from './europa-park.service';

describe('EuropaParkService', () => {
  let service: EuropaParkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EuropaParkService],
    }).compile();

    service = module.get<EuropaParkService>(EuropaParkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
