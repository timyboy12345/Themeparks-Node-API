import { Test, TestingModule } from '@nestjs/testing';
import { FuturoscopeService } from './futuroscope.service';
import { FuturoscopeTransferService } from './futuroscope-transfer/futuroscope-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('FuturoscopeService', () => {
  let service: FuturoscopeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuturoscopeService, FuturoscopeTransferService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<FuturoscopeService>(FuturoscopeService);
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
