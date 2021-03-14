import { Test, TestingModule } from '@nestjs/testing';
import { ThemeParkService } from './theme-park.service';

describe('ThemeparkService', () => {
  let service: ThemeParkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThemeParkService],
    }).compile();

    service = module.get<ThemeParkService>(ThemeParkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
