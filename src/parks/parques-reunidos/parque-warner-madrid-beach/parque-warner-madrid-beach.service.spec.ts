import { Test, TestingModule } from '@nestjs/testing';
import { ParqueWarnerMadridBeachService } from './parque-warner-madrid-beach.service';
import { ParquesReunidosTransfer } from '../parques-reunidos-transfer/parques-reunidos.transfer';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('ParqueWarnerMadridBeachService', () => {
  let service: ParqueWarnerMadridBeachService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParqueWarnerMadridBeachService, ParquesReunidosTransfer],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<ParqueWarnerMadridBeachService>(ParqueWarnerMadridBeachService);
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
  }, 1000 * 60);
});
