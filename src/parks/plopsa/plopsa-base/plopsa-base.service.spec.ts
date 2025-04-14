import { Test, TestingModule } from '@nestjs/testing';
import { PlopsaBaseService } from './plopsa-base.service';
import { PlopsaTransferService } from '../plopsa-transfer/plopsa-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { LocaleModule } from '../../../_services/locale/locale.module';

describe('PlopsaBaseService', () => {
  let service: PlopsaBaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlopsaBaseService, PlopsaTransferService],
      imports: [HttpModule, ConfigModule.forRoot(), LocaleModule],
    }).compile();

    service = module.get<PlopsaBaseService>(PlopsaBaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
