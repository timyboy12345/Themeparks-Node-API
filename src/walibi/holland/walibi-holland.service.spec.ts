import { Test, TestingModule } from '@nestjs/testing';
import { WalibiHollandService } from './walibi-holland.service';

describe('WalibiHollandService', () => {
  let service: WalibiHollandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalibiHollandService],
    }).compile();

    service = module.get<WalibiHollandService>(WalibiHollandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
