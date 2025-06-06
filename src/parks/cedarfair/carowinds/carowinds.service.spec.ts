import { Test, TestingModule } from '@nestjs/testing';
import { CarowindsService } from './carowinds.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CedarfairTransferService } from '../cedarfair-transfer/cedarfair-transfer.service';

describe('CarowindsService', () => {
  let service: CarowindsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarowindsService, CedarfairTransferService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<CarowindsService>(CarowindsService);
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
  });
});
