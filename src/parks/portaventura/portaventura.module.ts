import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PortaventuraService } from './portaventura/portaventura.service';
import { FerrariLandService } from './ferrariland/ferrariland.service';
import { PortaVenturaTransferService } from './portaventura-transfer/porta-ventura-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { PortaventuraServiceService } from './portaventura-service/portaventura-service.service';
import { LocaleModule } from '../../_services/locale/locale.module';

@Module({
  imports: [
    HttpModule,
    LocaleModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  providers: [PortaventuraService, FerrariLandService, PortaVenturaTransferService, PortaventuraServiceService],
  exports: [PortaventuraService, FerrariLandService],
})
export class PortaventuraModule {
}
