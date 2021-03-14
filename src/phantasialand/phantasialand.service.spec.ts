import { Test, TestingModule } from '@nestjs/testing';
import { PhantasialandService } from './phantasialand.service';

describe('PhantasialandService', () => {
  let service: PhantasialandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhantasialandService],
    }).compile();

    service = module.get<PhantasialandService>(PhantasialandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
