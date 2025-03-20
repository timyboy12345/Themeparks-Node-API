import { Test, TestingModule } from '@nestjs/testing';
import { PuyDeFouService } from './puy-de-fou.service';
import { PuyDeFouTransferService } from './puy-de-fou-transfer/puy-de-fou-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('PuyDeFouService', () => {
  let service: PuyDeFouService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PuyDeFouService, PuyDeFouTransferService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<PuyDeFouService>(PuyDeFouService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
