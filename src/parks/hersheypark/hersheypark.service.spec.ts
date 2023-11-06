import { Test, TestingModule } from '@nestjs/testing';
import { HersheyparkService } from './hersheypark.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { HersheyparkTransferService } from './hersheypark-transfer/hersheypark-transfer.service';

describe('HersheyparkService', () => {
  let service: HersheyparkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule],
      providers: [HersheyparkService, HersheyparkTransferService],
    }).compile();

    service = module.get<HersheyparkService>(HersheyparkService);
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
