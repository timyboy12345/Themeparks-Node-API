import { Test, TestingModule } from '@nestjs/testing';
import { PlopsaIndoorCoevordenService } from './plopsa-indoor-coevorden.service';
import { PlopsaTransferService } from '../plopsa-transfer/plopsa-transfer.service';
import { ConfigModule } from '@nestjs/config';
import { LocaleModule } from '../../../_services/locale/locale.module';
import { HttpModule } from '@nestjs/axios';

describe('PlopsaIndoorCoevordenService', () => {
  let service: PlopsaIndoorCoevordenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlopsaIndoorCoevordenService, PlopsaTransferService],
      imports: [ConfigModule.forRoot(), LocaleModule, HttpModule],
    }).compile();

    service = module.get<PlopsaIndoorCoevordenService>(PlopsaIndoorCoevordenService);
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
    expect(data.length).toBeGreaterThan(6);
  }, 1000 * 60);

  it('should return a list of Opening Times', async () => {
    const data = await service.getOpeningTimes();
    expect(data).toBeInstanceOf(Array);
    expect(data.length).toBeGreaterThan(6);
  }, 1000 * 60);
});
