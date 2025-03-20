import { Test, TestingModule } from '@nestjs/testing';
import { LisebergService } from './liseberg.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { LisebergTransferService } from './liseberg-transfer/liseberg-transfer.service';

describe('LisebergService', () => {
  let service: LisebergService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LisebergService, LisebergTransferService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<LisebergService>(LisebergService);
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
