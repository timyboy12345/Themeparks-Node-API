import { Test, TestingModule } from '@nestjs/testing';
import { OuwehandsDierenparkTransferService } from './ouwehands-dierenpark-transfer.service';
import { ConfigModule } from '@nestjs/config';

describe('OuwehandsDierenparkTransferService', () => {
  let service: OuwehandsDierenparkTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OuwehandsDierenparkTransferService],
      imports: [ConfigModule.forRoot()]
    }).compile();

    service = module.get<OuwehandsDierenparkTransferService>(OuwehandsDierenparkTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
