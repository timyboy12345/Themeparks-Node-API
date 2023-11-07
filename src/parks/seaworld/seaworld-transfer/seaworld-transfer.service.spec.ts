import { Test, TestingModule } from '@nestjs/testing';
import { SeaworldTransferService } from './seaworld-transfer.service';

describe('SeaworldTransferService', () => {
  let service: SeaworldTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeaworldTransferService],
    }).compile();

    service = module.get<SeaworldTransferService>(SeaworldTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
