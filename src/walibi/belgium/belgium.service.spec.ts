import { Test, TestingModule } from '@nestjs/testing';
import { WalibiBelgiumService } from './walibi-belgium.service';

describe('BelgiumService', () => {
  let service: WalibiBelgiumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalibiBelgiumService],
    }).compile();

    service = module.get<WalibiBelgiumService>(WalibiBelgiumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
