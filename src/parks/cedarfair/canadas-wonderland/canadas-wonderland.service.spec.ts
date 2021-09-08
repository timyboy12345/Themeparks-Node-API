import { Test, TestingModule } from '@nestjs/testing';
import { CanadasWonderlandService } from './canadas-wonderland.service';

describe('CanadasWonderlandService', () => {
  let service: CanadasWonderlandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CanadasWonderlandService],
    }).compile();

    service = module.get<CanadasWonderlandService>(CanadasWonderlandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
