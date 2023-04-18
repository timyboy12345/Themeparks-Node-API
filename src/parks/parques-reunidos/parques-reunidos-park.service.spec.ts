import { Test, TestingModule } from '@nestjs/testing';
import { ParquesReunidosParkService } from './parques-reunidos-park.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ParquesReunidosTransfer } from './parques-reunidos-transfer/parques-reunidos.transfer';

describe('ParquesReunidosParkService', () => {
  let service: ParquesReunidosParkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParquesReunidosParkService, ParquesReunidosTransfer],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<ParquesReunidosParkService>(ParquesReunidosParkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
