import { Test, TestingModule } from '@nestjs/testing';
import { BlijdorpService } from './blijdorp.service';
import { HttpModule } from '@nestjs/axios';
import { BlijdorpTransferService } from '../blijdorp-transfer/blijdorp-transfer.service';
import { ConfigModule } from '@nestjs/config';
import { LocaleModule } from '../../../_services/locale/locale.module';

describe('BlijdorpService', () => {
  let service: BlijdorpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlijdorpService, BlijdorpTransferService],
      imports: [
        HttpModule,
        ConfigModule.forRoot(),
        LocaleModule,
      ],
    }).compile();

    service = module.get<BlijdorpService>(BlijdorpService);
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
    expect(data.length).toBeGreaterThan(4);
  }, 1000 * 60);
});
