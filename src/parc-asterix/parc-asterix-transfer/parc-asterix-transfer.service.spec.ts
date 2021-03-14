import { Test, TestingModule } from '@nestjs/testing';
import { ParcAsterixTransferService } from './parc-asterix-transfer.service';

describe('ParcAsterixTransferService', () => {
  let service: ParcAsterixTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParcAsterixTransferService],
    }).compile();

    service = module.get<ParcAsterixTransferService>(ParcAsterixTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
