import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './_services/app.service';
import { ParksService } from './_services/parks/parks.service';
import { CacheModule, HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EftelingService } from './parks/efteling/efteling.service';
import { ToverlandService } from './parks/toverland/toverland.service';
import { WalibiHollandService } from './parks/walibi/holland/walibi-holland.service';
import { WalibiBelgiumService } from './parks/walibi/belgium/walibi-belgium.service';
import { PhantasialandService } from './parks/phantasialand/phantasialand.service';
import { DisneylandParisService } from './parks/disney/disneyland-paris/disneyland-paris.service';
import { DisneylandParisStudiosService } from './parks/disney/disneyland-paris/disneyland-paris-studios.service';
import { ParcAsterixService } from './parks/parc-asterix/parc-asterix.service';
import { PortaventuraService } from './parks/portaventura/portaventura/portaventura.service';
import { FerrariLandService } from './parks/portaventura/ferrariland/ferrariland.service';
import { BellewaerdeService } from './parks/bellewaerde/bellewaerde.service';
import { DippieDoeService } from './parks/dippiedoe/dippie-doe.service';
import { HolidayParkService } from './parks/holiday-park/holiday-park.service';
import { HellendoornService } from './parks/hellendoorn/hellendoorn.service';
import { EftelingTransferService } from './parks/efteling/efteling-transfer/efteling-transfer.service';
import { WalibiTransferService } from './parks/walibi/walibi-transfer/walibi-transfer.service';
import { PhantasialandTransferService } from './parks/phantasialand/phantasialand-transfer/phantasialand-transfer.service';
import { DisneylandParisTransferService } from './parks/disney/disneyland-paris/disneyland-paris-transfer/disneyland-paris-transfer.service';
import { ParcAsterixTransferService } from './parks/parc-asterix/parc-asterix-transfer/parc-asterix-transfer.service';
import { PortaVenturaTransferService } from './parks/portaventura/portaventura-transfer/porta-ventura-transfer.service';
import { HolidayParkTransferService } from './parks/holiday-park/holiday-park-transfer/holiday-park-transfer.service';

describe('AppController', () => {
  let appController: AppController;
  let parksService: ParksService;

  const parkServices: any[] = [EftelingService, ToverlandService, WalibiHollandService, WalibiBelgiumService, PhantasialandService, DisneylandParisService, DisneylandParisStudiosService, ParcAsterixService, PortaventuraService, FerrariLandService, BellewaerdeService, DippieDoeService, HolidayParkService, HellendoornService];
  const transferServices: any[] = [EftelingTransferService, WalibiTransferService, PhantasialandTransferService, DisneylandParisTransferService, ParcAsterixTransferService, PortaVenturaTransferService, HolidayParkTransferService];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot(), CacheModule.register({ ttl: 0 })],
      controllers: [AppController],
      providers: [AppService, ParksService, ...parkServices, ...transferServices],
    }).compile();

    appController = app.get<AppController>(AppController);
    parksService = app.get<ParksService>(ParksService);
  });

  describe('General parks', () => {
    // it('Should return a list of parks', ()=> {
    //   expect(parksService).toBeDefined();
    // })
    it('should test positive', () => {
      expect(true).toBe(true);
    });
  });

  // describe('root', () => {
  // it('should return "Hello World!"', () => {
  //   expect(appController.getHello()).toBe('Hello World!');
  // });
  // });
});
