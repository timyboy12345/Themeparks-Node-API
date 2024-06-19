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

  // it('should return info', () => {
  //   service.setParkId('1');
  //   expect(service.getInfo().id).toBeDefined();
  // });

  it('should return a list of POIs', async () => {
    service.setParkId('1');
    const data = await service.getPois();
    expect(data).toBeInstanceOf(Array);
  }, 1000 * 60);
});
