import { Test, TestingModule } from '@nestjs/testing';
import { ParqueDeAtraccionesTransferService } from './parque-de-atracciones-transfer.service';

describe('ParqueDeAtraccionesTransferService', () => {
  let service: ParqueDeAtraccionesTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParqueDeAtraccionesTransferService],
    }).compile();

    service = module.get<ParqueDeAtraccionesTransferService>(ParqueDeAtraccionesTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
