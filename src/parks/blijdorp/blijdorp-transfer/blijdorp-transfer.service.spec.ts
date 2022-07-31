import { Test, TestingModule } from '@nestjs/testing';
import { BlijdorpTransferService } from './blijdorp-transfer.service';

describe('BlijdorpTransferService', () => {
  let service: BlijdorpTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlijdorpTransferService],
    }).compile();

    service = module.get<BlijdorpTransferService>(BlijdorpTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
