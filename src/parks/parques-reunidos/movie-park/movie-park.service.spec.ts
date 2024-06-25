import { Test, TestingModule } from '@nestjs/testing';
import { MovieParkService } from './movie-park.service';
import { ParquesReunidosTransfer } from '../parques-reunidos-transfer/parques-reunidos.transfer';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('MovieParkService', () => {
  let service: MovieParkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieParkService, ParquesReunidosTransfer],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<MovieParkService>(MovieParkService);
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
