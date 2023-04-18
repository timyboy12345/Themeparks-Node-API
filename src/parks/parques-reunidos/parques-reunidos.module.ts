import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ParqueDeAtraccionesService } from './parque-de-atracciones/parque-de-atracciones.service';
import { ParquesReunidosTransfer } from './parques-reunidos-transfer/parques-reunidos.transfer';
import { MovieParkService } from './movie-park/movie-park.service';
import { ParquesReunidosParkService } from './parques-reunidos-park.service';
import { ParqueWarnerMadridBeachService } from './parque-warner-madrid-beach/parque-warner-madrid-beach.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  providers: [ParquesReunidosParkService, ParqueDeAtraccionesService, ParquesReunidosTransfer, MovieParkService, ParqueWarnerMadridBeachService],
  exports: [ParqueDeAtraccionesService, MovieParkService, ParqueWarnerMadridBeachService],
})

export class ParquesReunidosModule {}
