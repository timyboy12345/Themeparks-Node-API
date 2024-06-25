import { Test, TestingModule } from '@nestjs/testing';
import { DippieDoeService } from './dippie-doe.service';

describe('DippiedoeService', () => {
  let service: DippieDoeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DippieDoeService],
    }).compile();

    service = module.get<DippieDoeService>(DippieDoeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return info', () => {
    expect(service.getInfo().id).toBeDefined();
  });

  it('should return a list of POIs', async () => {
    const data = await service.getPois();
    expect(data).toBeInstanceOf(Array);
    expect(data.length).toBeGreaterThan(6);
  });
});
