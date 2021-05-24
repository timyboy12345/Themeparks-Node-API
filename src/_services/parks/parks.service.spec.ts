import { Test, TestingModule } from '@nestjs/testing';
import { ParksService } from './parks.service';
import { EftelingService } from '../../efteling/efteling.service';
import { ToverlandService } from '../../toverland/toverland.service';
import { WalibiHollandService } from '../../walibi/holland/walibi-holland.service';
import { WalibiBelgiumService } from '../../walibi/belgium/walibi-belgium.service';
import { PhantasialandService } from '../../phantasialand/phantasialand.service';
import { DisneylandParisService } from '../../disney/disneyland-paris/disneyland-paris.service';
import { DisneylandParisStudiosService } from '../../disney/disneyland-paris/disneyland-paris-studios.service';
import { ParcAsterixService } from '../../parc-asterix/parc-asterix.service';
import { PortaventuraService } from '../../portaventura/portaventura.service';
import { FerrariLandService } from '../../portaventura/ferrariland.service';
import { BellewaerdeService } from '../../bellewaerde/bellewaerde.service';
import { DippieDoeService } from '../../dippiedoe/dippie-doe.service';
import { HolidayParkService } from '../../holiday-park/holiday-park.service';
import { HellendoornService } from '../../hellendoorn/hellendoorn.service';
import { ConfigModule} from '@nestjs/config';
import { HttpModule } from '@nestjs/common';
import { EftelingTransferService } from '../../efteling/efteling-transfer/efteling-transfer.service';
import { WalibiTransferService } from '../../walibi/walibi-transfer/walibi-transfer.service';
import { PhantasialandTransferService } from '../../phantasialand/phantasialand-transfer/phantasialand-transfer.service';
import { DisneylandParisTransferService } from '../../disney/disneyland-paris/disneyland-paris-transfer/disneyland-paris-transfer.service';
import { ParcAsterixTransferService } from '../../parc-asterix/parc-asterix-transfer/parc-asterix-transfer.service';
import { PortaVenturaTransferService } from '../../portaventura/portaventura-transfer/porta-ventura-transfer.service';
import { HolidayParkTransferService } from '../../holiday-park/holiday-park-transfer/holiday-park-transfer.service';

describe('ParksService', () => {
  let service: ParksService;

  const parkServices: any[] = [EftelingService, ToverlandService, WalibiHollandService, WalibiBelgiumService, PhantasialandService, DisneylandParisService, DisneylandParisStudiosService, ParcAsterixService, PortaventuraService, FerrariLandService, BellewaerdeService, DippieDoeService, HolidayParkService, HellendoornService];
  const transferServices: any[] = [EftelingTransferService, WalibiTransferService, PhantasialandTransferService, DisneylandParisTransferService, ParcAsterixTransferService, PortaVenturaTransferService, HolidayParkTransferService];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule],
      providers: [ParksService, ...parkServices, ...transferServices],
    }).compile();

    service = module.get<ParksService>(ParksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
