import { Test, TestingModule } from '@nestjs/testing';
import { BushGardensWilliamsburgService } from './bush-gardens-williamsburg.service';
import { SeaworldTransferService } from '../seaworld-transfer/seaworld-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('BushGardensWilliamsburgService', () => {
  let service: BushGardensWilliamsburgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BushGardensWilliamsburgService, SeaworldTransferService],
      imports: [
        HttpModule,
        ConfigModule.forRoot()
      ]
    }).compile();

    service = module.get<BushGardensWilliamsburgService>(BushGardensWilliamsburgService);
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
