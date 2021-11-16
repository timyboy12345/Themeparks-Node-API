import { Test, TestingModule } from '@nestjs/testing';
import { SixflagsTransferService } from './sixflags-transfer.service';

describe('SixflagsTransferService', () => {
  let service: SixflagsTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SixflagsTransferService],
    }).compile();

    service = module.get<SixflagsTransferService>(SixflagsTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
