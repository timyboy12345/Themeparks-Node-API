import { Test, TestingModule } from '@nestjs/testing';
import { WalibiService } from './walibi.service';

describe('WalibiService', () => {
  let service: WalibiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalibiService],
    }).compile();

    service = module.get<WalibiService>(WalibiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
