import { Test, TestingModule } from '@nestjs/testing';
import { HellendoornService } from './hellendoorn.service';

describe('HellendoornService', () => {
  let service: HellendoornService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HellendoornService],
    }).compile();

    service = module.get<HellendoornService>(HellendoornService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
