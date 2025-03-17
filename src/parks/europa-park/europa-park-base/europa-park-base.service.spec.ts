import { Test, TestingModule } from '@nestjs/testing';
import { EuropaParkBaseService } from './europa-park-base.service';

describe('EuropaParkBaseService', () => {
  let service: EuropaParkBaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EuropaParkBaseService],
    }).compile();

    service = module.get<EuropaParkBaseService>(EuropaParkBaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
