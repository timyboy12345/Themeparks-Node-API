import { Test, TestingModule } from '@nestjs/testing';
import { ParqueDeAtraccionesService } from './parque-de-atracciones.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ParquesReunidosTransfer } from '../parques-reunidos-transfer/parques-reunidos.transfer';

describe('ParqueDeAtraccionesService', () => {
  let service: ParqueDeAtraccionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParqueDeAtraccionesService, ParquesReunidosTransfer],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<ParqueDeAtraccionesService>(ParqueDeAtraccionesService);
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
  });
});
