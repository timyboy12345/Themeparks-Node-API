import { Test, TestingModule } from '@nestjs/testing';
import { SfOverTexasService } from './sf-over-texas.service';

describe('SfOverTexasService', () => {
  let service: SfOverTexasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SfOverTexasService],
    }).compile();

    service = module.get<SfOverTexasService>(SfOverTexasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
