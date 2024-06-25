import { Test, TestingModule } from '@nestjs/testing';
import { AltonTowersService } from './alton-towers.service';
import { AioTransferServiceService } from '../../_services/aio/transfer-service/aio-transfer-service.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

describe('AltonTowersService', () => {
  let service: AltonTowersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AltonTowersService, AioTransferServiceService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<AltonTowersService>(AltonTowersService);
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
