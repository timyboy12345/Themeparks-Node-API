import { Test, TestingModule } from '@nestjs/testing';
import { CompagnieDesAlpesBaseService } from './compagnie-des-alpes-base.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CompagnieDesAlpesTransferService } from '../compagnie-des-alpes-transfer/compagnie-des-alpes-transfer.service';
import { LocaleModule } from '../../../_services/locale/locale.module';

describe('CompagnieDesAlpesBaseService', () => {
  let service: CompagnieDesAlpesBaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompagnieDesAlpesBaseService, CompagnieDesAlpesTransferService],
      imports: [HttpModule, ConfigModule.forRoot(), LocaleModule],
    }).compile();

    service = module.get<CompagnieDesAlpesBaseService>(CompagnieDesAlpesBaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
