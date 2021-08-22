import { Test, TestingModule } from '@nestjs/testing';
import { HansaParkService } from './hansa-park.service';
import { HansaParkTransferService } from './hansa-park-transfer/hansa-park-transfer.service';
import { HttpModule, HttpService } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('HansaParkService', () => {
  let service: HansaParkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HansaParkService, HansaParkTransferService],
      imports: [HttpModule, ConfigModule.forRoot()]
    }).compile();

    service = module.get<HansaParkService>(HansaParkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
