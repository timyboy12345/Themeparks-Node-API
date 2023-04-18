import { Test, TestingModule } from '@nestjs/testing';
import { ParquesReunidosTransfer } from './parques-reunidos.transfer';

describe('ParqueDeAtraccionesTransferService', () => {
  let service: ParquesReunidosTransfer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParquesReunidosTransfer],
    }).compile();

    service = module.get<ParquesReunidosTransfer>(ParquesReunidosTransfer);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
