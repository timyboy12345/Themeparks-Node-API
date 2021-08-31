import { HttpException, Injectable } from '@nestjs/common';
import { ThemeParkService } from '../themepark/theme-park.service';
import { EftelingService } from '../../parks/efteling/efteling.service';
import { ToverlandService } from '../../parks/toverland/toverland.service';
import { WalibiHollandService } from '../../parks/walibi/holland/walibi-holland.service';
import { PhantasialandService } from '../../parks/phantasialand/phantasialand.service';
import { WalibiBelgiumService } from '../../parks/walibi/belgium/walibi-belgium.service';
import { DisneylandParisService } from '../../parks/disney/disneyland-paris/disneyland-paris.service';
import { DisneylandParisStudiosService } from '../../parks/disney/disneyland-paris/disneyland-paris-studios.service';
import { ParcAsterixService } from '../../parks/parc-asterix/parc-asterix.service';
import { PortaventuraService } from '../../parks/portaventura/portaventura/portaventura.service';
import { FerrariLandService } from '../../parks/portaventura/ferrariland/ferrariland.service';
import { BellewaerdeService } from '../../parks/bellewaerde/bellewaerde/bellewaerde.service';
import { DippieDoeService } from '../../parks/dippiedoe/dippie-doe.service';
import { HolidayParkService } from '../../parks/holiday-park/holiday-park.service';
import { HellendoornService } from '../../parks/hellendoorn/hellendoorn.service';
import { LegolandDeutschlandService } from '../../parks/legoland/legoland-deutschland/legoland-deutschland.service';
import { CompanyService } from '../company/company.service';
import { SixflagsService } from '../../parks/sixflags/sixflags.service';

import * as Sentry from '@sentry/node';
import { BobbejaanlandService } from '../../parks/bobbejaanland/bobbejaanland.service';
import { PlopsalandDePanneService } from '../../parks/plopsaland/plopsaland-de-panne/plopsaland-de-panne.service';
import { HansaParkService } from '../../parks/hansa-park/hansa-park.service';
import { OuwehandsDierenparkService } from '../../parks/ouwehands-dierenpark/ouwehands-dierenpark.service';
import { WildlandsService } from '../../parks/wildlands/wildlands.service';
import { BellewaerdeAquaparkService } from '../../parks/bellewaerde/bellewaerde-aquapark/bellewaerde-aquapark.service';

@Injectable()
export class ParksService {
  private readonly _parks: ThemeParkService[];
  private readonly _companies: CompanyService[];

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
              private readonly _bellewaerdeService: BellewaerdeService,
              private readonly _bellewaerdeAquaparkService: BellewaerdeAquaparkService,
              private readonly _dippieDoeService: DippieDoeService,
              private readonly _holidayParkService: HolidayParkService,
              private readonly _hellendoornService: HellendoornService,
              private readonly _legolandDeutschlandService: LegolandDeutschlandService,
              private readonly _sixflagsService: SixflagsService,
              private readonly _bobbejaanlandService: BobbejaanlandService,
              private readonly _plopsalandDePanneService: PlopsalandDePanneService,
              private readonly _hansaParkService: HansaParkService,
              private readonly _ouwehandsDierenparkService: OuwehandsDierenparkService,
              private readonly _wildlandsService: WildlandsService) {
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
    this._parks.push(_bellewaerdeAquaparkService);
    this._parks.push(_dippieDoeService);
    this._parks.push(_holidayParkService);
    this._parks.push(_hellendoornService);
    this._parks.push(_legolandDeutschlandService);
    this._parks.push(_bobbejaanlandService);
    this._parks.push(_plopsalandDePanneService);
    this._parks.push(_hansaParkService);
    this._parks.push(_ouwehandsDierenparkService);
    this._parks.push(_wildlandsService);

    this._companies = [];
    this._companies.push(_sixflagsService);
  }

  public async getParks(): Promise<ThemeParkService[]> {
    let parks = this._parks;

    for (let i = 0; i < this._companies.length; i++) {
      const p = await this._companies[i].getParkServices()
        .catch(reason => {
          Sentry.captureException(reason);
          return [];
        });

      parks = parks.concat(p);
    }

    return parks;
  }

  public async findPark(id: string, throwError = false): Promise<ThemeParkService> {
    const parks = await this.getParks();
    const park = parks.find(park => park.getFullInfo().id == id);

    if (park == null && throwError) {
      throw new HttpException('Park not found', 404);
    }

    return park;
  }
}
