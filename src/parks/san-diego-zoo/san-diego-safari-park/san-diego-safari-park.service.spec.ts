import { Test, TestingModule } from '@nestjs/testing';
import { SanDiegoSafariParkService } from './san-diego-safari-park.service';
import { AioTransferServiceService } from '../../../_services/aio/transfer-service/aio-transfer-service.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('SanDiegoSafariParkService', () => {
  let service: SanDiegoSafariParkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SanDiegoSafariParkService, AioTransferServiceService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<SanDiegoSafariParkService>(SanDiegoSafariParkService);
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
