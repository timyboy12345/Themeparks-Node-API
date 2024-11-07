import { Test, TestingModule } from '@nestjs/testing';
import { HeidiParkService } from './heidi-park.service';

describe('HeidiParkService', () => {
  let service: HeidiParkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeidiParkService],
    }).compile();

    service = module.get<HeidiParkService>(HeidiParkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
