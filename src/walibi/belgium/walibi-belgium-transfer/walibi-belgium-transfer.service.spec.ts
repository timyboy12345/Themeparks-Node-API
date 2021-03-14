import { Test, TestingModule } from '@nestjs/testing';
import { WalibiBelgiumTransferService } from './walibi-belgium-transfer.service';

describe('WalibiBelgiumTransferService', () => {
  let service: WalibiBelgiumTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalibiBelgiumTransferService],
    }).compile();

    service = module.get<WalibiBelgiumTransferService>(WalibiBelgiumTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
