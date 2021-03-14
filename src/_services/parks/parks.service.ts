import { HttpException, Injectable } from '@nestjs/common';
import { ThemeParkService } from '../themepark/theme-park.service';
import { EftelingService } from '../../efteling/efteling.service';
import { ToverlandService } from '../../toverland/toverland.service';
import { WalibiHollandService } from '../../walibi/holland/walibi-holland.service';
import { PhantasialandService } from '../../phantasialand/phantasialand.service';
import { WalibiBelgiumService } from '../../walibi/belgium/walibi-belgium.service';
import { DisneylandParisService } from '../../disney/disneyland-paris/disneyland-paris.service';
import { DisneylandParisStudiosService } from '../../disney/disneyland-paris/disneyland-paris-studios.service';
import { ParcAsterixService } from '../../parc-asterix/parc-asterix.service';
import { PortaventuraService } from '../../portaventura/portaventura.service';
import { FerrariLandService } from '../../portaventura/ferrariland.service';
import { BellewaerdeService } from '../../bellewaerde/bellewaerde.service';

@Injectable()
export class ParksService {
  private readonly _parks: ThemeParkService[];

  constructor(private readonly _eftelingService: EftelingService,
              private readonly _toverlandService: ToverlandService,
              private readonly _walibiHollandService: WalibiHollandService,
              private readonly _walibiBelgiumService: WalibiBelgiumService,
              private readonly _phantasialandService: PhantasialandService,
              private readonly _disneylandParisService: DisneylandParisService,
              private readonly _disneylandParisStudiosService: DisneylandParisStudiosService,
              private readonly _parcAsterixService: ParcAsterixService,
              private readonly _portaVenturaService: PortaventuraService,
              private readonly _ferrariLandService: FerrariLandService,
              private readonly _bellewaerdeService: BellewaerdeService) {
    this._parks = [];
    this._parks.push(_eftelingService);
    this._parks.push(_toverlandService);
    this._parks.push(_walibiHollandService);
    this._parks.push(_walibiBelgiumService);
    this._parks.push(_phantasialandService);
    this._parks.push(_disneylandParisService);
    this._parks.push(_disneylandParisStudiosService);
    this._parks.push(_parcAsterixService);
    this._parks.push(_portaVenturaService);
    this._parks.push(_ferrariLandService);
    this._parks.push(_bellewaerdeService);
  }

  public getParks() {
    return this._parks;
  }

  public findPark(id: string, throwError = false) {
    const park = this.getParks().find(park => park.getInfo().id == id);

    if (park == null && throwError) {
      throw new HttpException('Park not found', 404);
    }

    return park;
  }
}
