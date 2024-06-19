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
import { SesamePlaceSanDiegoService } from './sesame-place-san-diego/sesame-place-san-diego.service';
import { SesamePlaceLanghorneService } from './sesame-place-langhorne/sesame-place-langhorne.service';

describe('SeaworldService', () => {
  let service: SeaworldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeaworldService, SeaworldTransferService, SeaworldSanDiegoService, SeaworldSanAntonioService, SeaworldOrlandoService, BushGardensTampaBayService, BushGardensWilliamsburgService, SesamePlaceSanDiegoService, SesamePlaceLanghorneService],
      imports: [ConfigModule.forRoot(), HttpModule],
    }).compile();

    service = module.get<SeaworldService>(SeaworldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
