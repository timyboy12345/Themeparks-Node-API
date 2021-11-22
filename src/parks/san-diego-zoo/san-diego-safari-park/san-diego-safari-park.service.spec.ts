import { Test, TestingModule } from '@nestjs/testing';
import { SanDiegoSafariParkService } from './san-diego-safari-park.service';

describe('SanDiegoSafariParkService', () => {
  let service: SanDiegoSafariParkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SanDiegoSafariParkService],
    }).compile();

    service = module.get<SanDiegoSafariParkService>(SanDiegoSafariParkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
