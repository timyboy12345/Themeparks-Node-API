import { Test, TestingModule } from '@nestjs/testing';
import { CanadasWonderlandService } from './canadas-wonderland.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CedarfairTransferService } from '../cedarfair-transfer/cedarfair-transfer.service';

describe('CanadasWonderlandService', () => {
  let service: CanadasWonderlandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [CanadasWonderlandService, CedarfairTransferService],
    }).compile();

    service = module.get<CanadasWonderlandService>(CanadasWonderlandService);
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
  });
});
