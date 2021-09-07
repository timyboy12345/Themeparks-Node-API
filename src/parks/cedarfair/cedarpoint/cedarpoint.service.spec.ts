import { Test, TestingModule } from '@nestjs/testing';
import { CedarpointService } from './cedarpoint.service';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CedarfairTransferService } from '../cedarfair-transfer/cedarfair-transfer.service';

describe('CedarpointService', () => {
  let service: CedarpointService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CedarpointService, CedarfairTransferService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<CedarpointService>(CedarpointService);
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
