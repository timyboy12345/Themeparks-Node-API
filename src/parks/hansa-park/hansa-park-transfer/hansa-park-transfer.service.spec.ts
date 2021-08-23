import { Test, TestingModule } from '@nestjs/testing';
import { HansaParkTransferService } from './hansa-park-transfer.service';

describe('HansaParkTransferService', () => {
  let service: HansaParkTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HansaParkTransferService],
    }).compile();

    service = module.get<HansaParkTransferService>(HansaParkTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
