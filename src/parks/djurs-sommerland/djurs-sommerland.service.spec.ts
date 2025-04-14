import { Test, TestingModule } from '@nestjs/testing';
import { DjursSommerlandService } from './djurs-sommerland.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AioTransferServiceService } from '../../_services/aio/transfer-service/aio-transfer-service.service';

describe('DjursSommerlandService', () => {
  jest.retryTimes(3)

  let service: DjursSommerlandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DjursSommerlandService, AioTransferServiceService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<DjursSommerlandService>(DjursSommerlandService);
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
