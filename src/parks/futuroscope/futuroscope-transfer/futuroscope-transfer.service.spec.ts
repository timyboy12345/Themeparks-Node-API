import { Test, TestingModule } from '@nestjs/testing';
import { FuturoscopeTransferService } from './futuroscope-transfer.service';

describe('FuturoscopeTransferService', () => {
  let service: FuturoscopeTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuturoscopeTransferService],
    }).compile();

    service = module.get<FuturoscopeTransferService>(FuturoscopeTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
