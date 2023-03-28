import { Test, TestingModule } from '@nestjs/testing';
import { SanDiegoZooService } from './san-diego-zoo.service';
import { AioTransferServiceService } from '../../../_services/aio/transfer-service/aio-transfer-service.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('SanDiegoZooService', () => {
  let service: SanDiegoZooService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SanDiegoZooService, AioTransferServiceService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<SanDiegoZooService>(SanDiegoZooService);
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
  }, 1000 * 60);
});
