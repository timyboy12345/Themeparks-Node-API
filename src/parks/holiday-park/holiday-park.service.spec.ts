import { Test, TestingModule } from '@nestjs/testing';
import { HolidayParkService } from './holiday-park.service';
import { HolidayParkTransferService } from './holiday-park-transfer/holiday-park-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('HolidayParkService', () => {
  let service: HolidayParkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [HolidayParkService, HolidayParkTransferService],
    }).compile();

    service = module.get<HolidayParkService>(HolidayParkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return info', () => {
    expect(service.getInfo().id).toBeDefined();
  });

  it('should return a list of POIs', async () => {
    const data = await service.getPois();
    expect(data).toBeInstanceOf(Array);
  });
});
