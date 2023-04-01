import { Test, TestingModule } from '@nestjs/testing';
import { ParqueDeAtraccionesService } from './parque-de-atracciones.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ParqueDeAtraccionesTransferService } from './parque-de-atracciones-transfer/parque-de-atracciones-transfer.service';

describe('ParqueDeAtraccionesService', () => {
  let service: ParqueDeAtraccionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParqueDeAtraccionesService, ParqueDeAtraccionesTransferService],
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
