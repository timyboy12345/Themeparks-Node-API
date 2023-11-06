import { Test, TestingModule } from '@nestjs/testing';
import { HersheyparkTransferService } from './hersheypark-transfer.service';

describe('HersheyparkTransferService', () => {
  let service: HersheyparkTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HersheyparkTransferService],
    }).compile();

    service = module.get<HersheyparkTransferService>(HersheyparkTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
