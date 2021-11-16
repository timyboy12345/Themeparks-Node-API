import { Test, TestingModule } from '@nestjs/testing';
import { WildlandsService } from './wildlands.service';
import { WildlandsTransferService } from './wildlands-transfer/wildlands-transfer.service';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

describe('WildlandsService', () => {
  let service: WildlandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [WildlandsService, WildlandsTransferService],
    }).compile();

    service = module.get<WildlandsService>(WildlandsService);
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
