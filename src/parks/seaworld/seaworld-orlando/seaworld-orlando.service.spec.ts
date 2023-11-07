import { Test, TestingModule } from '@nestjs/testing';
import { SeaworldOrlandoService } from './seaworld-orlando.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { SeaworldTransferService } from '../seaworld-transfer/seaworld-transfer.service';

describe('SeaworldOrlandoService', () => {
  let service: SeaworldOrlandoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeaworldOrlandoService, SeaworldTransferService],
      imports: [
        HttpModule,
        ConfigModule.forRoot()
      ]
    }).compile();

    service = module.get<SeaworldOrlandoService>(SeaworldOrlandoService);
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
