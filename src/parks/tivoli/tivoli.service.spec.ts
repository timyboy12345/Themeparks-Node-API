import { Test, TestingModule } from '@nestjs/testing';
import { TivoliService } from './tivoli.service';
import { TivoliTransferService } from './tivoli-transfer/tivoli-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { LocaleModule } from '../../_services/locale/locale.module';

describe('TivoliService', () => {
  let service: TivoliService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TivoliService, TivoliTransferService],
      imports: [HttpModule, ConfigModule.forRoot(), LocaleModule]
    }).compile();

    service = module.get<TivoliService>(TivoliService);
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
