import { Test, TestingModule } from '@nestjs/testing';
import { SixFlagsGeneralParkService } from './six-flags-general-park.service';

describe('SixFlagsGeneralParkService', () => {
  let service: SixFlagsGeneralParkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SixFlagsGeneralParkService],
    }).compile();

    service = module.get<SixFlagsGeneralParkService>(SixFlagsGeneralParkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
