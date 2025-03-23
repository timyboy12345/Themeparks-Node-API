import { Test, TestingModule } from '@nestjs/testing';
import { PuyDeFouFranceService } from './puy-de-fou-france.service';
import { PuyDeFouTransferService } from '../puy-de-fou-transfer/puy-de-fou-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('PuyDeFouFranceService', () => {
  let service: PuyDeFouFranceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PuyDeFouFranceService, PuyDeFouTransferService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<PuyDeFouFranceService>(PuyDeFouFranceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return info', () => {
    expect(service.getInfo().id).toBeDefined();
  });

  it('should return a list of POIs', async () => {
    const data = await service.getPois();
    expect(data).toBeInstanceOf(Array);
  }, 1000 * 60);
});
