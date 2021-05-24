import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './_services/app.service';
import { EftelingService } from './efteling/efteling.service';
import { ThemeParkService } from './_services/themepark/theme-park.service';
import { ThroughPoisThemeParkService } from './_services/themepark/through-pois-theme-park.service';
import { ParksService } from './_services/parks/parks.service';
import { ToverlandService } from './toverland/toverland.service';
import { ConfigModule } from '@nestjs/config';
import { WalibiHollandService } from './walibi/holland/walibi-holland.service';
import { EftelingTransferService } from './efteling/efteling-transfer/efteling-transfer.service';
import { PhantasialandService } from './phantasialand/phantasialand.service';
import { ErrorService } from './_services/error/error.service';
import { PhantasialandTransferService } from './phantasialand/phantasialand-transfer/phantasialand-transfer.service';
import { WalibiBelgiumService } from './walibi/belgium/walibi-belgium.service';
import { WalibiTransferService } from './walibi/walibi-transfer/walibi-transfer.service';
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
import { HolidayParkService } from './holiday-park/holiday-park.service';
import { HolidayParkTransferService } from './holiday-park/holiday-park-transfer/holiday-park-transfer.service';
import { AttractionsIoThemeParkService } from './_services/attractions-io-theme-park/attractions-io-theme-park.service';
import { HellendoornService } from './hellendoorn/hellendoorn.service';
import { TransferService } from './_services/transfer/transfer.service';
import { LegolandDeutschlandService } from './legoland/legoland-deutschland/legoland-deutschland.service';
import { WalibiService } from './walibi/walibi.service';
import { SixflagsService } from './sixflags/sixflags.service';
import { CompanyService } from './_services/company/company.service';
import { SfOverTexasService } from './sixflags/parks/sf-over-texas/sf-over-texas.service';
import { SixFlagsGeneralParkService } from './sixflags/parks/six-flags-general-park/six-flags-general-park.service';
import { CacheService } from './_services/cache/cache.service';
import { SixflagsTransferService } from './sixflags/sixflags-transfer/sixflags-transfer.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    CacheModule.register({
      ttl: 60 * 5,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, EftelingService, ThemeParkService, ThroughPoisThemeParkService, ParksService, ToverlandService, WalibiHollandService, EftelingTransferService, PhantasialandService, ErrorService, PhantasialandTransferService, WalibiBelgiumService, WalibiTransferService, DisneylandParisService, DisneylandParisTransferService, DisneylandParisStudiosService, ParcAsterixService, ParcAsterixTransferService, PortaventuraService, PortaVenturaTransferService, FerrariLandService, BellewaerdeService, DippieDoeService, HolidayParkService, HolidayParkTransferService, AttractionsIoThemeParkService, HellendoornService, TransferService, LegolandDeutschlandService, WalibiService, SixflagsService, CompanyService, SfOverTexasService, SixFlagsGeneralParkService, CacheService, SixflagsTransferService],
})
export class AppModule {
}
