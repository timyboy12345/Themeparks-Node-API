import { Test, TestingModule } from '@nestjs/testing';
import { PlopsaTransferService } from './plopsa-transfer.service';

describe('PlopsaTransferService', () => {
  let service: PlopsaTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlopsaTransferService],
    }).compile();

    service = module.get<PlopsaTransferService>(PlopsaTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
