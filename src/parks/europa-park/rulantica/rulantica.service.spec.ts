import { Test, TestingModule } from '@nestjs/testing';
import { RulanticaService } from './rulantica.service';
import { EuropaParkTransferService } from '../europa-park-transfer/europa-park-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { LocaleModule } from '../../../_services/locale/locale.module';

describe('RulanticaService', () => {
  let service: RulanticaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RulanticaService, EuropaParkTransferService],
      imports: [HttpModule, ConfigModule.forRoot(), LocaleModule, CacheModule.register()],
    }).compile();

    service = module.get<RulanticaService>(RulanticaService);
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
