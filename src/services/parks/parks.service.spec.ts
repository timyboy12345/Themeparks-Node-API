import { Test, TestingModule } from '@nestjs/testing';
import { ParksService } from './parks.service';

describe('ParksService', () => {
  let service: ParksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParksService],
    }).compile();

    service = module.get<ParksService>(ParksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
