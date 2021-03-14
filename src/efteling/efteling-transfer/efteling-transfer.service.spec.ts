import { Test, TestingModule } from '@nestjs/testing';
import { EftelingTransferService } from './efteling-transfer.service';

describe('EftelingTransferService', () => {
  let service: EftelingTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EftelingTransferService],
    }).compile();

    service = module.get<EftelingTransferService>(EftelingTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
