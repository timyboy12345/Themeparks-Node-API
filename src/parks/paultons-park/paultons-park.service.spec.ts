import { Test, TestingModule } from '@nestjs/testing';
import { PaultonsParkService } from './paultons-park.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AioTransferServiceService } from '../../_services/aio/transfer-service/aio-transfer-service.service';

describe('PaultonsParkService', () => {
  jest.retryTimes(3)

  let service: PaultonsParkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaultonsParkService, AioTransferServiceService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<PaultonsParkService>(PaultonsParkService);
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
