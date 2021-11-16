import { Test, TestingModule } from '@nestjs/testing';
import { HerschendTransferService } from './herschend-transfer.service';

describe('HerschendTransferService', () => {
  let service: HerschendTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HerschendTransferService],
    }).compile();

    service = module.get<HerschendTransferService>(HerschendTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
