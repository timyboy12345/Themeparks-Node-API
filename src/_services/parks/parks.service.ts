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
import { DippieDoeService } from '../../dippiedoe/dippie-doe.service';
import { HolidayParkService } from '../../holiday-park/holiday-park.service';
import { HellendoornService } from '../../hellendoorn/hellendoorn.service';
import { LegolandDeutschlandService } from '../../legoland/legoland-deutschland/legoland-deutschland.service';
import { CompanyService } from '../company/company.service';
import { SixflagsService } from '../../sixflags/sixflags.service';

import * as Sentry from '@sentry/node';

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
              private readonly _dippieDoeService: DippieDoeService,
              private readonly _holidayParkService: HolidayParkService,
              private readonly _hellendoornService: HellendoornService,
              private readonly _legolandDeutschlandService: LegolandDeutschlandService,
              private readonly _sixflagsService: SixflagsService) {
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
    this._parks.push(_dippieDoeService);
    this._parks.push(_holidayParkService);
    this._parks.push(_hellendoornService);
    this._parks.push(_legolandDeutschlandService);

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
