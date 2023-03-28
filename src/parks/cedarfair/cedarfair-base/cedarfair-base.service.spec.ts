import { Test, TestingModule } from '@nestjs/testing';
import { CedarfairBaseService } from './cedarfair-base.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CedarfairTransferService } from '../cedarfair-transfer/cedarfair-transfer.service';

describe('CedarfairBaseService', () => {
  let service: CedarfairBaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CedarfairBaseService, CedarfairTransferService],
      imports: [HttpModule, ConfigModule.forRoot()]
    }).compile();

    service = module.get<CedarfairBaseService>(CedarfairBaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
