import { Test, TestingModule } from '@nestjs/testing';
import { DailyAnalysisService } from './daily-analysis.service';

describe('DailyAnalysisService', () => {
  let service: DailyAnalysisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyAnalysisService],
    }).compile();

    service = module.get<DailyAnalysisService>(DailyAnalysisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
