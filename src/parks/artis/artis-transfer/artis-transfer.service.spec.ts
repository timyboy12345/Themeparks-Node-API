import { Test, TestingModule } from '@nestjs/testing';
import { ArtisTransferService } from './artis-transfer.service';

describe('ArtisTransferService', () => {
  let service: ArtisTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtisTransferService],
    }).compile();

    service = module.get<ArtisTransferService>(ArtisTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
