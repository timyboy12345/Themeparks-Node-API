import { Test, TestingModule } from '@nestjs/testing';
import { KnottsBerryFarmService } from './knotts-berry-farm.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CedarfairTransferService } from '../cedarfair-transfer/cedarfair-transfer.service';

describe('KnottsBerryFarmService', () => {
  let service: KnottsBerryFarmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [KnottsBerryFarmService, CedarfairTransferService],
    }).compile();

    service = module.get<KnottsBerryFarmService>(KnottsBerryFarmService);
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
