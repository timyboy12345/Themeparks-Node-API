import { Test, TestingModule } from '@nestjs/testing';
import { ParquesReunidosParkService } from './parques-reunidos-park.service';

describe('ParquesReunidosParkService', () => {
  let service: ParquesReunidosParkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParquesReunidosParkService],
    }).compile();

    service = module.get<ParquesReunidosParkService>(ParquesReunidosParkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
