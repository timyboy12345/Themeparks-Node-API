import { Test, TestingModule } from '@nestjs/testing';
import { DisneylandParisService } from './disneyland-paris.service';

describe('DisneylandParisService', () => {
  let service: DisneylandParisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisneylandParisService],
    }).compile();

    service = module.get<DisneylandParisService>(DisneylandParisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
