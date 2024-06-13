import { Module } from '@nestjs/common';
import { SeaworldBaseService } from './seaworld-base/seaworld-base.service';
import { SeaworldSanAntonioService } from './seaworld-san-antonio/seaworld-san-antonio.service';
import { SeaworldService } from './seaworld.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { SeaworldTransferService } from './seaworld-transfer/seaworld-transfer.service';
import { SeaworldOrlandoService } from './seaworld-orlando/seaworld-orlando.service';
import { SeaworldSanDiegoService } from './seaworld-san-diego/seaworld-san-diego.service';
import { BushGardensWilliamsburgService } from './bush-gardens-williamsburg/bush-gardens-williamsburg.service';
import { BushGardensTampaBayService } from './bush-gardens-tampa-bay/bush-gardens-tampa-bay.service';
import { SesamePlaceSanDiegoService } from './sesame-place-san-diego/sesame-place-san-diego.service';
import { SesamePlaceLanghorneService } from './sesame-place-langhorne/sesame-place-langhorne.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  providers: [SeaworldBaseService, SeaworldSanAntonioService, SeaworldService, SeaworldTransferService, SeaworldOrlandoService, SeaworldSanDiegoService, BushGardensWilliamsburgService, BushGardensTampaBayService, SesamePlaceSanDiegoService, SesamePlaceLanghorneService],
  exports: [SeaworldService],
})
export class SeaworldModule {}
