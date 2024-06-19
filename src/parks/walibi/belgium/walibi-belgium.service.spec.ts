import { Test, TestingModule } from '@nestjs/testing';
import { WalibiBelgiumService } from './walibi-belgium.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import {
  CompagnieDesAlpesTransferService
} from '../../compagnie-des-alpes/compagnie-des-alpes-transfer/compagnie-des-alpes-transfer.service';
import { LocaleModule } from '../../../_services/locale/locale.module';

describe('WalibiBelgiumService', () => {
  let service: WalibiBelgiumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, LocaleModule, ConfigModule.forRoot()],
      providers: [WalibiBelgiumService, CompagnieDesAlpesTransferService],
    }).compile();

    service = module.get<WalibiBelgiumService>(WalibiBelgiumService);
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
