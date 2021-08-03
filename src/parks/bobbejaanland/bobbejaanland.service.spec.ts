import { Test, TestingModule } from '@nestjs/testing';
import { BobbejaanlandService } from './bobbejaanland.service';

describe('BobbejaanlandService', () => {
  let service: BobbejaanlandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BobbejaanlandService],
    }).compile();

    service = module.get<BobbejaanlandService>(BobbejaanlandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
