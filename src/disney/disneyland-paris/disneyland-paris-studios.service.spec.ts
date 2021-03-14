import { Test, TestingModule } from '@nestjs/testing';
import { DisneylandParisStudiosService } from './disneyland-paris-studios.service';

describe('DisneylandParisStudiosService', () => {
  let service: DisneylandParisStudiosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisneylandParisStudiosService],
    }).compile();

    service = module.get<DisneylandParisStudiosService>(DisneylandParisStudiosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
