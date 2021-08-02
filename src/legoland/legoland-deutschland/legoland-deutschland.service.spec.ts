import { Test, TestingModule } from '@nestjs/testing';
import { LegolandDeutschlandService } from './legoland-deutschland.service';

describe('LegolandDeutschlandService', () => {
  let service: LegolandDeutschlandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LegolandDeutschlandService],
    }).compile();

    service = module.get<LegolandDeutschlandService>(LegolandDeutschlandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
