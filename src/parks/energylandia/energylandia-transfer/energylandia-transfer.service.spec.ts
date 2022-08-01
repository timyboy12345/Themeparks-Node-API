import { Test, TestingModule } from '@nestjs/testing';
import { EnergylandiaTransferService } from './energylandia-transfer.service';

describe('EnergylandiaTransferService', () => {
  let service: EnergylandiaTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnergylandiaTransferService],
    }).compile();

    service = module.get<EnergylandiaTransferService>(EnergylandiaTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
