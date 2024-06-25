import { Test, TestingModule } from '@nestjs/testing';
import { GardalandService } from './gardaland.service';
import { AioTransferServiceService } from '../../_services/aio/transfer-service/aio-transfer-service.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('GardalandService', () => {
  let service: GardalandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GardalandService, AioTransferServiceService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<GardalandService>(GardalandService);
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
