import { Test, TestingModule } from '@nestjs/testing';
import { MirabilandiaService } from './mirabilandia.service';
import { ParquesReunidosTransfer } from '../parques-reunidos-transfer/parques-reunidos.transfer';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('MirabilandiaService', () => {
  let service: MirabilandiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MirabilandiaService, ParquesReunidosTransfer],
      imports: [HttpModule, ConfigModule.forRoot()]
    }).compile();

    service = module.get<MirabilandiaService>(MirabilandiaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
