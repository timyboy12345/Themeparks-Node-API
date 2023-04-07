import { Test, TestingModule } from '@nestjs/testing';
import { WalibiFranceService } from './walibi-france.service';

describe('WalibiFranceService', () => {
  let service: WalibiFranceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalibiFranceService],
    }).compile();

    service = module.get<WalibiFranceService>(WalibiFranceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
