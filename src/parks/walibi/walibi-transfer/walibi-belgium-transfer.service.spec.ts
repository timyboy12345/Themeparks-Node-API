import { Test, TestingModule } from '@nestjs/testing';
import { WalibiTransferService } from './walibi-transfer.service';

describe('WalibiBelgiumTransferService', () => {
  let service: WalibiTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalibiTransferService],
    }).compile();

    service = module.get<WalibiTransferService>(WalibiTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
