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
import { BobbejaanlandService } from '../../parks/bobbejaanland/bobbejaanland.service';
import { PlopsalandDePanneService } from '../../parks/plopsaland/plopsaland-de-panne/plopsaland-de-panne.service';
import { HansaParkService } from '../../parks/hansa-park/hansa-park.service';
import { OuwehandsDierenparkService } from '../../parks/ouwehands-dierenpark/ouwehands-dierenpark.service';
import { WildlandsService } from '../../parks/wildlands/wildlands.service';
import { BellewaerdeAquaparkService } from '../../parks/bellewaerde/bellewaerde-aquapark/bellewaerde-aquapark.service';
import { LisebergService } from '../../parks/liseberg/liseberg.service';
import { SilverDollarCityService } from '../../parks/herschend/silver-dollar-city/silver-dollar-city.service';
import { CarowindsService } from '../../parks/cedarfair/carowinds/carowinds.service';
import { GreatAmericaService } from '../../parks/cedarfair/great-america/great-america.service';
import { CedarpointService } from '../../parks/cedarfair/cedarpoint/cedarpoint.service';
import { ParqueWarnerService } from '../../parks/parque-warner/parque-warner.service';
import { CedarFairService } from '../../parks/cedarfair/cedar-fair.service';
import { GronaLundService } from '../../parks/grona-lund/grona-lund.service';
import { TivoliService } from '../../parks/tivoli/tivoli.service';
import { ThorpeParkService } from '../../parks/thorpe-park/thorpe-park.service';
import { AltonTowersService } from '../../parks/alton-towers/alton-towers.service';
import { PaultonsParkService } from '../../parks/paultons-park/paultons-park.service';
import { SanDiegoZooService } from '../../parks/san-diego-zoo/san-diego-zoo/san-diego-zoo.service';
import { ChessingtonResortService } from '../../parks/chessington-resort/chessington-resort.service';
import { BlijdorpService } from '../../parks/blijdorp/blijdorp/blijdorp.service';
import { ApenheulService } from '../../parks/apenheul/apenheul/apenheul.service';
import { EnergylandiaService } from '../../parks/energylandia/energylandia/energylandia.service';
import * as Sentry from '@sentry/node';
import { SafariparkService } from '../../parks/beekse-bergen/safaripark/safaripark.service';
import { SpeellandService } from '../../parks/beekse-bergen/speelland/speelland.service';
import { DollywoodService } from '../../parks/herschend/dollywood/dollywood.service';
import {
  ParqueDeAtraccionesService,
} from '../../parks/parques-reunidos/parque-de-atracciones/parque-de-atracciones.service';
import { WalibiFranceService } from '../../parks/walibi/france/walibi-france.service';
import { FuturoscopeService } from '../../parks/futuroscope/futuroscope.service';
import { MovieParkService } from '../../parks/parques-reunidos/movie-park/movie-park.service';
import {
  ParqueWarnerMadridBeachService,
} from '../../parks/parques-reunidos/parque-warner-madrid-beach/parque-warner-madrid-beach.service';
import { HersheyparkService } from '../../parks/hersheypark/hersheypark.service';
import { SeaworldService } from '../../parks/seaworld/seaworld.service';
import { UniversalService } from '../../parks/universal/universal.service';

@Injectable()
export class ParksService {
  private readonly _parks: ThemeParkService[];
  private readonly _companies: CompanyService[];

  constructor(
    private readonly _eftelingService: EftelingService,
    private readonly _toverlandService: ToverlandService,
    private readonly _walibiHollandService: WalibiHollandService,
    private readonly _walibiBelgiumService: WalibiBelgiumService,
    private readonly _walibiFranceService: WalibiFranceService,
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
    private readonly _wildlandsService: WildlandsService,
    private readonly _lisebergService: LisebergService,
    private readonly _dollywoodService: DollywoodService,
    private readonly _silverDollarCityService: SilverDollarCityService,
    private readonly _carowindsService: CarowindsService,
    private readonly _greatAdventureService: GreatAmericaService,
    private readonly _cedarPointService: CedarpointService,
    private readonly _parqueWarnerService: ParqueWarnerService,
    private readonly _cedarFairService: CedarFairService,
    private readonly _gronaLundService: GronaLundService,
    private readonly _tivoliService: TivoliService,
    private readonly _thorpeParkService: ThorpeParkService,
    private readonly _altonTowersService: AltonTowersService,
    private readonly _paultonsParkService: PaultonsParkService,
    private readonly _sanDiegoZooService: SanDiegoZooService,
    private readonly _chessingtonResort: ChessingtonResortService,
    private readonly _blijdorpService: BlijdorpService,
    private readonly _apenheulService: ApenheulService,
    private readonly _energylandiaService: EnergylandiaService,
    private readonly _beekseBergenSafariparkService: SafariparkService,
    private readonly _beekseBergenSpeellandService: SpeellandService,
    private readonly _parqueDeAtraccionesService: ParqueDeAtraccionesService,
    private readonly _movieParkService: MovieParkService,
    private readonly _parqueWarnerMadridBeach: ParqueWarnerMadridBeachService,
    private readonly _futuroscope: FuturoscopeService,
    private readonly _hersheypark: HersheyparkService,
    private readonly _seaworldCompanyService: SeaworldService,
    private readonly _universalService: UniversalService,
  ) {
    this._parks = [];
    this._parks.push(_eftelingService);
    this._parks.push(_toverlandService);
    this._parks.push(_walibiHollandService);
    this._parks.push(_walibiBelgiumService);
    this._parks.push(_walibiFranceService);
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
    this._parks.push(_lisebergService);
    this._parks.push(_dollywoodService);
    this._parks.push(_silverDollarCityService);
    this._parks.push(_parqueWarnerService);
    this._parks.push(_gronaLundService);
    this._parks.push(_tivoliService);
    this._parks.push(_thorpeParkService);
    this._parks.push(_altonTowersService);
    this._parks.push(_paultonsParkService);
    this._parks.push(_sanDiegoZooService);
    this._parks.push(_chessingtonResort);
    this._parks.push(_blijdorpService);
    this._parks.push(_apenheulService);
    this._parks.push(_energylandiaService);
    this._parks.push(_beekseBergenSafariparkService);
    this._parks.push(_beekseBergenSpeellandService);
    this._parks.push(_parqueDeAtraccionesService);
    this._parks.push(_movieParkService);
    this._parks.push(_parqueWarnerMadridBeach);
    this._parks.push(_futuroscope);
    this._parks.push(_hersheypark);

    this._companies = [];
    this._companies.push(_sixflagsService);
    this._companies.push(_cedarFairService);
    this._companies.push(_seaworldCompanyService);
    this._companies.push(_universalService);
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
      throw new HttpException('Park not found', 404, {
        cause: new Error('Park not found'),
      });
    }

    return park;
  }
}
