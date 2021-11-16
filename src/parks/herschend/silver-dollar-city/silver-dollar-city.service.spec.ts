import { Test, TestingModule } from '@nestjs/testing';
import { SilverDollarCityService } from './silver-dollar-city.service';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HerschendTransferService } from '../herschend-transfer/herschend-transfer.service';

describe('SilverDollarCityService', () => {
  let service: SilverDollarCityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SilverDollarCityService, HerschendTransferService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<SilverDollarCityService>(SilverDollarCityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
