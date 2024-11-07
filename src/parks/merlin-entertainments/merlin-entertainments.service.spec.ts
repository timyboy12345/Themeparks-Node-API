import { Test, TestingModule } from '@nestjs/testing';
import { MerlinEntertainmentsService } from './merlin-entertainments.service';

describe('MerlinEntertainmentsService', () => {
  let service: MerlinEntertainmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MerlinEntertainmentsService],
    }).compile();

    service = module.get<MerlinEntertainmentsService>(MerlinEntertainmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
