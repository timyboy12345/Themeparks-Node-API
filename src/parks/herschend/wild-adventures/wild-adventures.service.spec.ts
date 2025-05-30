import { Test, TestingModule } from '@nestjs/testing';
import { WildAdventuresService } from './wild-adventures.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { HerschendTransferService } from '../herschend-transfer/herschend-transfer.service';

describe('WildAdventuresService', () => {
  let service: WildAdventuresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WildAdventuresService, HerschendTransferService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<WildAdventuresService>(WildAdventuresService);
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
  }, 5000 * 60);
});
