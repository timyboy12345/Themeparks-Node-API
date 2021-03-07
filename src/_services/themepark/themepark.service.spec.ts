import { Test, TestingModule } from '@nestjs/testing';
import { ThemeparkService } from './themepark.service';

describe('ThemeparkService', () => {
  let service: ThemeparkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThemeparkService],
    }).compile();

    service = module.get<ThemeparkService>(ThemeparkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
