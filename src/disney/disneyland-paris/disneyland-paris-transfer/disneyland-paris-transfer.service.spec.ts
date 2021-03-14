import { Test, TestingModule } from '@nestjs/testing';
import { DisneylandParisTransferService } from './disneyland-paris-transfer.service';

describe('DisneylandParisTransferService', () => {
  let service: DisneylandParisTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisneylandParisTransferService],
    }).compile();

    service = module.get<DisneylandParisTransferService>(DisneylandParisTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
