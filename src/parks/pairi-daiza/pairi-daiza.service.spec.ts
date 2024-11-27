import { Test, TestingModule } from '@nestjs/testing';
import { PairiDaizaService } from './pairi-daiza.service';
import { PairiDaizaTransferService } from './pairi-daiza-transfer/pairi-daiza-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { LocaleModule } from '../../_services/locale/locale.module';

describe('PairiDaizaService', () => {
  let service: PairiDaizaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot(), LocaleModule],
      providers: [PairiDaizaService, PairiDaizaTransferService],
    }).compile();

    service = module.get<PairiDaizaService>(PairiDaizaService);
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
