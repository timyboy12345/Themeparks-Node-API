import { Test, TestingModule } from '@nestjs/testing';
import { ThorpeParkService } from './thorpe-park.service';
import { AioTransferServiceService } from '../../_services/aio/transfer-service/aio-transfer-service.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('ThorpeParkService', () => {
  let service: ThorpeParkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThorpeParkService, AioTransferServiceService],
      imports: [
        HttpModule,
        ConfigModule.forRoot()
      ]
    }).compile();

    service = module.get<ThorpeParkService>(ThorpeParkService);
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
