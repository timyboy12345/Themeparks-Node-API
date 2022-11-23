import { Test, TestingModule } from '@nestjs/testing';
import { FamilyparkService } from './familypark.service';

describe('FamilyparkService', () => {
  let service: FamilyparkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FamilyparkService],
    }).compile();

    service = module.get<FamilyparkService>(FamilyparkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
