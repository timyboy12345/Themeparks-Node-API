import { Test, TestingModule } from '@nestjs/testing';
import { WaitTimeService } from './wait-time.service';

describe('WaitTimeService', () => {
  let service: WaitTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaitTimeService],
    }).compile();

    service = module.get<WaitTimeService>(WaitTimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
