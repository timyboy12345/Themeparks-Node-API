import { Test, TestingModule } from '@nestjs/testing';
import { SesamePlaceSanDiegoService } from './sesame-place-san-diego.service';
import { SeaworldTransferService } from '../seaworld-transfer/seaworld-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('SesamePlaceSanDiegoService', () => {
  let service: SesamePlaceSanDiegoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SesamePlaceSanDiegoService, SeaworldTransferService],
      imports: [
        HttpModule,
        ConfigModule.forRoot()
      ]
    }).compile();

    service = module.get<SesamePlaceSanDiegoService>(SesamePlaceSanDiegoService);
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
