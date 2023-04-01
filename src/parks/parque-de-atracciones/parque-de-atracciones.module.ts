import { Module } from '@nestjs/common';
import { ParqueDeAtraccionesService } from './parque-de-atracciones.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ParqueDeAtraccionesTransferService } from './parque-de-atracciones-transfer/parque-de-atracciones-transfer.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  providers: [ParqueDeAtraccionesService, ParqueDeAtraccionesTransferService],
  exports: [ParqueDeAtraccionesService]
})
export class ParqueDeAtraccionesModule {}
