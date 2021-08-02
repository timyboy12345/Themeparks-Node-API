import { Test, TestingModule } from '@nestjs/testing';
import { PortaVenturaTransferService } from './porta-ventura-transfer.service';

describe('PortaventuraTransferService', () => {
  let service: PortaVenturaTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortaVenturaTransferService],
    }).compile();

    service = module.get<PortaVenturaTransferService>(PortaVenturaTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
