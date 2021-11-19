import { Test, TestingModule } from '@nestjs/testing';
import { ThorpeParkService } from './thorpe-park.service';

describe('ThorpeParkService', () => {
  let service: ThorpeParkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThorpeParkService],
    }).compile();

    service = module.get<ThorpeParkService>(ThorpeParkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
