import { Test, TestingModule } from '@nestjs/testing';
import { SixFlagsGeneralParkService } from './six-flags-general-park.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { SixflagsTransferService } from '../../sixflags-transfer/sixflags-transfer.service';

describe('SixFlagsGeneralParkService', () => {
  let service: SixFlagsGeneralParkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SixFlagsGeneralParkService, SixflagsTransferService],
      imports: [
        HttpModule,
        ConfigModule.forRoot()
      ]
    }).compile();

    service = module.get<SixFlagsGeneralParkService>(SixFlagsGeneralParkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
