import { Test, TestingModule } from '@nestjs/testing';
import { PuyDeFouGeneralService } from './puy-de-fou-general.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PuyDeFouTransferService } from '../puy-de-fou-transfer/puy-de-fou-transfer.service';

describe('PuyDeFouGeneralService', () => {
  let service: PuyDeFouGeneralService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PuyDeFouGeneralService, PuyDeFouTransferService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<PuyDeFouGeneralService>(PuyDeFouGeneralService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
