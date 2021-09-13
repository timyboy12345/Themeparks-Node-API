import { Test, TestingModule } from '@nestjs/testing';
import { ParqueWarnerTransferService } from './parque-warner-transfer.service';
import { ConfigModule } from '@nestjs/config';

describe('ParqueWarnerTransferService', () => {
  let service: ParqueWarnerTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [ParqueWarnerTransferService],
    }).compile();

    service = module.get<ParqueWarnerTransferService>(ParqueWarnerTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
