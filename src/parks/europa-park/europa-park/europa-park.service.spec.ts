import { Test, TestingModule } from '@nestjs/testing';
import { EuropaParkService } from './europa-park.service';
import { EuropaParkTransferService } from '../europa-park-transfer/europa-park-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { LocaleModule } from '../../../_services/locale/locale.module';
import { CacheModule } from '@nestjs/cache-manager';

describe('EuropaParkService', () => {
  let service: EuropaParkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EuropaParkService, EuropaParkTransferService],
      imports: [HttpModule, ConfigModule.forRoot(), LocaleModule, CacheModule.register()],
    }).compile();

    service = module.get<EuropaParkService>(EuropaParkService);
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
});
