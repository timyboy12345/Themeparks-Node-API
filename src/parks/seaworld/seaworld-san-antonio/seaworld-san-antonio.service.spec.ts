import { Test, TestingModule } from '@nestjs/testing';
import { SeaworldSanAntonioService } from './seaworld-san-antonio.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { SeaworldTransferService } from '../seaworld-transfer/seaworld-transfer.service';

describe('SeaworldSanAntonioService', () => {
  let service: SeaworldSanAntonioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeaworldSanAntonioService, SeaworldTransferService],
      imports: [
        HttpModule,
        ConfigModule.forRoot()
      ]
    }).compile();

    service = module.get<SeaworldSanAntonioService>(SeaworldSanAntonioService);
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
