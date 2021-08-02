import { Test, TestingModule } from '@nestjs/testing';
import { PhantasialandTransferService } from './phantasialand-transfer.service';

describe('PhantasialandTransferService', () => {
  let service: PhantasialandTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhantasialandTransferService],
    }).compile();

    service = module.get<PhantasialandTransferService>(PhantasialandTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
