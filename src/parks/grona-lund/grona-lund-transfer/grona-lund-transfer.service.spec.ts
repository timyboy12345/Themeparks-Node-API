import { Test, TestingModule } from '@nestjs/testing';
import { GronaLundTransferService } from './grona-lund-transfer.service';

describe('GronaLundTransferService', () => {
  let service: GronaLundTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GronaLundTransferService],
    }).compile();

    service = module.get<GronaLundTransferService>(GronaLundTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
