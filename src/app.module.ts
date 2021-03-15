import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './_services/app.service';
import { EftelingService } from './efteling/efteling.service';
import { ThemeParkService } from './_services/themepark/theme-park.service';
import { ParksService } from './_services/parks/parks.service';
import { ToverlandService } from './toverland/toverland.service';
import { ConfigModule } from '@nestjs/config';
import { WalibiHollandService } from './walibi/holland/walibi-holland.service';
import { EftelingTransferService } from './efteling/efteling-transfer/efteling-transfer.service';
import { PhantasialandService } from './phantasialand/phantasialand.service';
import { ErrorService } from './_services/error/error.service';
import { PhantasialandTransferService } from './phantasialand/phantasialand-transfer/phantasialand-transfer.service';
import { WalibiBelgiumService } from './walibi/belgium/walibi-belgium.service';
import { WalibiBelgiumTransferService } from './walibi/belgium/walibi-belgium-transfer/walibi-belgium-transfer.service';
import { DisneylandParisService } from './disney/disneyland-paris/disneyland-paris.service';
import { DisneylandParisTransferService } from './disney/disneyland-paris/disneyland-paris-transfer/disneyland-paris-transfer.service';
import { DisneylandParisStudiosService } from './disney/disneyland-paris/disneyland-paris-studios.service';
import { ParcAsterixService } from './parc-asterix/parc-asterix.service';
import { ParcAsterixTransferService } from './parc-asterix/parc-asterix-transfer/parc-asterix-transfer.service';
import { PortaventuraService } from './portaventura/portaventura.service';
import { PortaVenturaTransferService } from './portaventura/portaventura-transfer/porta-ventura-transfer.service';
import { FerrariLandService } from './portaventura/ferrariland.service';
import { BellewaerdeService } from './bellewaerde/bellewaerde.service';
import { DippieDoeService } from './dippiedoe/dippie-doe.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    CacheModule.register({
      ttl: 60 * 5,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, EftelingService, ThemeParkService, ParksService, ToverlandService, WalibiHollandService, EftelingTransferService, PhantasialandService, ErrorService, PhantasialandTransferService, WalibiBelgiumService, WalibiBelgiumTransferService, DisneylandParisService, DisneylandParisTransferService, DisneylandParisStudiosService, ParcAsterixService, ParcAsterixTransferService, PortaventuraService, PortaVenturaTransferService, FerrariLandService, BellewaerdeService, DippieDoeService],
})
export class AppModule {
}
