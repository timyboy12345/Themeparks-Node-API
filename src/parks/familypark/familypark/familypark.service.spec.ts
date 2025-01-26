import { Test, TestingModule } from '@nestjs/testing';
import { FamilyparkService } from './familypark.service';

describe('FamilyparkService', () => {
  let service: FamilyparkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FamilyparkService],
    }).compile();

    service = module.get<FamilyparkService>(FamilyparkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should return info', () => {
  //   expect(service.getInfo().id).toBeDefined();
  // });
  //
  // it('should return a list of POIs', async () => {
  //   const data = await service.getPois();
  //   expect(data).toBeInstanceOf(Array);
  //   expect(data.length).toBeGreaterThan(6);
  // }, 1000 * 60);
});
