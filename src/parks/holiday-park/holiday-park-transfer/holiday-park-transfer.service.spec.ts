import { Test, TestingModule } from '@nestjs/testing';
import { HolidayParkTransferService } from './holiday-park-transfer.service';

describe('HolidayParkTransferService', () => {
  let service: HolidayParkTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HolidayParkTransferService],
    }).compile();

    service = module.get<HolidayParkTransferService>(HolidayParkTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
