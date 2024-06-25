import { Test, TestingModule } from '@nestjs/testing';
import { BellewaerdeService } from './bellewaerde.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import {
  CompagnieDesAlpesTransferService
} from '../../compagnie-des-alpes/compagnie-des-alpes-transfer/compagnie-des-alpes-transfer.service';
import { LocaleModule } from '../../../_services/locale/locale.module';

describe('BellewaerdeService', () => {
  let service: BellewaerdeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BellewaerdeService, CompagnieDesAlpesTransferService],
      imports: [HttpModule, ConfigModule.forRoot(), LocaleModule]
    }).compile();

    service = module.get<BellewaerdeService>(BellewaerdeService);
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
    expect(data.length).toBeGreaterThan(6);
  }, 1000 * 60);
});
