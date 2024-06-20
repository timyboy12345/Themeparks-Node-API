import { Test, TestingModule } from '@nestjs/testing';
import { SeaworldSanDiegoService } from './seaworld-san-diego.service';
import { SeaworldTransferService } from '../seaworld-transfer/seaworld-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('SeaworldSanDiegoService', () => {
  let service: SeaworldSanDiegoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeaworldSanDiegoService, SeaworldTransferService],
      imports: [
        HttpModule,
        ConfigModule.forRoot()
      ]
    }).compile();

    service = module.get<SeaworldSanDiegoService>(SeaworldSanDiegoService);
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
