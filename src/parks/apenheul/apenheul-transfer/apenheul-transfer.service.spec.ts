import { Test, TestingModule } from '@nestjs/testing';
import { ApenheulTransferService } from './apenheul-transfer.service';

describe('ApenheulTransferService', () => {
  let service: ApenheulTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApenheulTransferService],
    }).compile();

    service = module.get<ApenheulTransferService>(ApenheulTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
