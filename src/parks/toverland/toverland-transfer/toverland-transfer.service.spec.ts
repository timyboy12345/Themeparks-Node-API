import { Test, TestingModule } from '@nestjs/testing';
import { ToverlandTransferService } from './toverland-transfer.service';

describe('ToverlandTransferService', () => {
  let service: ToverlandTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToverlandTransferService],
    }).compile();

    service = module.get<ToverlandTransferService>(ToverlandTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
