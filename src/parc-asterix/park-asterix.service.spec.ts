import { Test, TestingModule } from '@nestjs/testing';
import { ParcAsterixService } from './parc-asterix.service';

describe('ParkAsterixService', () => {
  let service: ParcAsterixService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParcAsterixService],
    }).compile();

    service = module.get<ParcAsterixService>(ParcAsterixService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
