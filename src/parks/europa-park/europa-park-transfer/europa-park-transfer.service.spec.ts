import { Test, TestingModule } from '@nestjs/testing';
import { EuropaParkTransferService } from './europa-park-transfer.service';

describe('EuropaParkTransferService', () => {
  let service: EuropaParkTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EuropaParkTransferService],
    }).compile();

    service = module.get<EuropaParkTransferService>(EuropaParkTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
