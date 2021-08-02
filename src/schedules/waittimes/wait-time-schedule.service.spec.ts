import { Test, TestingModule } from '@nestjs/testing';
import { WaitTimeScheduleService } from './wait-time-schedule.service';

describe('WaittimesService', () => {
  let service: WaitTimeScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaitTimeScheduleService],
    }).compile();

    service = module.get<WaitTimeScheduleService>(WaitTimeScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
