import { Test, TestingModule } from '@nestjs/testing';
import { SixflagsService } from './sixflags.service';

describe('SixflagsService', () => {
  let service: SixflagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SixflagsService],
    }).compile();

    service = module.get<SixflagsService>(SixflagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
