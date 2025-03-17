import { Test, TestingModule } from '@nestjs/testing';
import { RulanticaService } from './rulantica.service';

describe('RulanticaService', () => {
  let service: RulanticaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RulanticaService],
    }).compile();

    service = module.get<RulanticaService>(RulanticaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
