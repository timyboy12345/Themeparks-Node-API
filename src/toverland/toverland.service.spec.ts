import { Test, TestingModule } from '@nestjs/testing';
import { ToverlandService } from './toverland.service';

describe('ToverlandService', () => {
  let service: ToverlandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToverlandService],
    }).compile();

    service = module.get<ToverlandService>(ToverlandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
