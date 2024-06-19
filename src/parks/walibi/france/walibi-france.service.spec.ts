import { Test, TestingModule } from '@nestjs/testing';
import { WalibiFranceService } from './walibi-france.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import {
  CompagnieDesAlpesTransferService
} from '../../compagnie-des-alpes/compagnie-des-alpes-transfer/compagnie-des-alpes-transfer.service';
import { LocaleModule } from '../../../_services/locale/locale.module';

describe('WalibiFranceService', () => {
  let service: WalibiFranceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, LocaleModule, ConfigModule.forRoot()],
      providers: [WalibiFranceService, CompagnieDesAlpesTransferService],
    }).compile();

    service = module.get<WalibiFranceService>(WalibiFranceService);
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
  });
});
