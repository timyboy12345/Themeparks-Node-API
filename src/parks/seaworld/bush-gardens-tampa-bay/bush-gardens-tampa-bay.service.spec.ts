import { Test, TestingModule } from '@nestjs/testing';
import { BushGardensTampaBayService } from './bush-gardens-tampa-bay.service';
import { SeaworldTransferService } from '../seaworld-transfer/seaworld-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('BushGardensTampaBayService', () => {
  let service: BushGardensTampaBayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BushGardensTampaBayService, SeaworldTransferService],
      imports: [
        HttpModule,
        ConfigModule.forRoot()
      ]
    }).compile();

    service = module.get<BushGardensTampaBayService>(BushGardensTampaBayService);
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
