import { Test, TestingModule } from '@nestjs/testing';
import { MarinelandCoteDazurService } from './marineland-cote-dazur.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ParquesReunidosTransfer } from '../parques-reunidos-transfer/parques-reunidos.transfer';

describe('MarinelandCoteDazurService', () => {
  let service: MarinelandCoteDazurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarinelandCoteDazurService, ParquesReunidosTransfer],
      imports: [HttpModule, ConfigModule.forRoot()]
    }).compile();

    service = module.get<MarinelandCoteDazurService>(MarinelandCoteDazurService);
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
