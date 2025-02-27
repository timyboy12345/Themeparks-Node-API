import { Test, TestingModule } from '@nestjs/testing';
import { FamilyparkTransferService } from './familypark-transfer.service';

describe('FamilyparkTransferService', () => {
  let service: FamilyparkTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FamilyparkTransferService],
    }).compile();

    service = module.get<FamilyparkTransferService>(FamilyparkTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
