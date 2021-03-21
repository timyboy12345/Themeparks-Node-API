import { Test, TestingModule } from '@nestjs/testing';
import { HolidayParkService } from './holiday-park.service';

describe('HolidayParkService', () => {
  let service: HolidayParkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HolidayParkService],
    }).compile();

    service = module.get<HolidayParkService>(HolidayParkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
