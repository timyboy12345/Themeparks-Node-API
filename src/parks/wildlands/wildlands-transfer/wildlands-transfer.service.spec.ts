import { Test, TestingModule } from '@nestjs/testing';
import { WildlandsTransferService } from './wildlands-transfer.service';
import { ConfigModule } from '@nestjs/config';

describe('WildlandsTransferService', () => {
  let service: WildlandsTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WildlandsTransferService],
      imports: [ConfigModule.forRoot()]
    }).compile();

    service = module.get<WildlandsTransferService>(WildlandsTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
