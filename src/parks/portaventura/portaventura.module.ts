import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PortaventuraService } from './portaventura/portaventura.service';
import { FerrariLandService } from './ferrariland/ferrariland.service';
import { PortaVenturaTransferService } from './portaventura-transfer/porta-ventura-transfer.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  providers: [PortaventuraService, FerrariLandService, PortaVenturaTransferService],
  exports: [PortaventuraService, FerrariLandService],
})
export class PortaventuraModule {
}
