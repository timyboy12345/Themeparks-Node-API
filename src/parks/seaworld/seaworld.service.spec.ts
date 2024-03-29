import { Test, TestingModule } from '@nestjs/testing';
import { SeaworldService } from './seaworld.service';
import { SeaworldSanDiegoService } from './seaworld-san-diego/seaworld-san-diego.service';
import { SeaworldSanAntonioService } from './seaworld-san-antonio/seaworld-san-antonio.service';
import { SeaworldOrlandoService } from './seaworld-orlando/seaworld-orlando.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { SeaworldTransferService } from './seaworld-transfer/seaworld-transfer.service';
import { BushGardensTampaBayService } from './bush-gardens-tampa-bay/bush-gardens-tampa-bay.service';
import { BushGardensWilliamsburgService } from './bush-gardens-williamsburg/bush-gardens-williamsburg.service';

describe('SeaworldService', () => {
  let service: SeaworldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeaworldService, SeaworldTransferService, SeaworldSanDiegoService, SeaworldSanAntonioService, SeaworldOrlandoService, BushGardensTampaBayService, BushGardensWilliamsburgService],
      imports: [ConfigModule.forRoot(), HttpModule],
    }).compile();

    service = module.get<SeaworldService>(SeaworldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
