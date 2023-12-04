import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ParqueDeAtraccionesService } from './parque-de-atracciones/parque-de-atracciones.service';
import { ParquesReunidosTransfer } from './parques-reunidos-transfer/parques-reunidos.transfer';
import { MovieParkService } from './movie-park/movie-park.service';
import { ParquesReunidosParkService } from './parques-reunidos-park.service';
import { ParqueWarnerMadridBeachService } from './parque-warner-madrid-beach/parque-warner-madrid-beach.service';
import { BobbejaanlandService } from './bobbejaanland/bobbejaanland.service';
import { MirabilandiaService } from './mirabilandia/mirabilandia.service';
import { MarinelandCoteDazurService } from './marineland-cote-dazur/marineland-cote-dazur.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  providers: [ParquesReunidosParkService, ParqueDeAtraccionesService, ParquesReunidosTransfer, MovieParkService, ParqueWarnerMadridBeachService, BobbejaanlandService, MirabilandiaService, MarinelandCoteDazurService],
  exports: [ParqueDeAtraccionesService, MovieParkService, ParqueWarnerMadridBeachService, BobbejaanlandService, MirabilandiaService, MarinelandCoteDazurService],
})

export class ParquesReunidosModule {}
