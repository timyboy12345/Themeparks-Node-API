import { Test, TestingModule } from '@nestjs/testing';
import { BeekseBergenTransferService } from './beekse-bergen-transfer.service';

describe('BeekseBergenTransferService', () => {
  let service: BeekseBergenTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeekseBergenTransferService],
    }).compile();

    service = module.get<BeekseBergenTransferService>(BeekseBergenTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
