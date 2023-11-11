import { Injectable, NotImplementedException } from '@nestjs/common';
import { ThemeParkService } from '../../_services/themepark/theme-park.service';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { Poi } from '../../_interfaces/poi.interface';
import { AtraccionesResponseInterface } from './interfaces/atracciones-response.interface';
import { ParqueAtraccionesShowsResponseInterface } from './interfaces/parque-atracciones-shows-response.interface';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { ParquesReunidosTransfer } from './parques-reunidos-transfer/parques-reunidos.transfer';

@Injectable()
export class ParquesReunidosParkService extends ThemeParkService {
  private readonly apiUrl: string;
  private readonly apiToken: string;

  // TODO: Parque Reunidos supports multiple locales
  constructor(
    private readonly configService: ConfigService,
    private readonly http: HttpService,
    private readonly transfer: ParquesReunidosTransfer,
  ) {
    super();

    this.apiUrl = configService.get('PARQUE_DE_ATRACCIONES_API_URL');
    this.apiToken = configService.get('PARQUE_DE_ATRACCIONES_API_TOKEN');
  }

  public getStayEstablishment(): string {
    throw new NotImplementedException('Establishment ID not set');
  }

  public getShowType(): 'new' | 'old' | 'unsupported' {
    return 'old';
  }

  public supportsRestaurants(): boolean {
    return false;
  }

  public halloweenCategories(): (string | number)[] {
    return [];
  }

  public getShowCategoryID(): string {
    throw new NotImplementedException('Show Category ID not set');
  }

  getSupports(): ThemeParkSupports {
    const supportsShows = this.getShowType() !== 'unsupported';
    const supportsRestaurants = this.supportsRestaurants();
    const supportsHalloween = this.halloweenCategories().length > 0;

    return {
      supportsAnimals: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: true,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: supportsRestaurants,
      supportsRideWaitTimes: this.trackWaitTimes(),
      supportsRideWaitTimesHistory: this.trackWaitTimes(),
      supportsRides: true,
      supportsShopOpeningTimes: false,
      supportsShops: true,
      supportsShowTimes: supportsShows,
      supportsShows: supportsShows,
      supportsTranslations: true,
      supportsHalloween: supportsHalloween,
    };
  }

  public trackWaitTimes(): boolean { 
    return false
  }

  async getPois(): Promise<Poi[]> {
    const promises = [];

    if (this.getSupports().supportsRides) {
      promises.push(this.getRides());
    }

    if (this.getSupports().supportsShows) {
      promises.push(this.getShows());
    }

    if (this.getSupports().supportsRestaurants) {
      promises.push(this.getRestaurants());
    }

    if (this.getSupports().supportsHalloween) {
      promises.push(this.getHalloweenEvents());
    }

    return []
      .concat
      .apply([], await Promise.all(promises));
  }

  async getRides(): Promise<Poi[]> {
    return this.http.get<AtraccionesResponseInterface>(this.apiUrl + '/api/v1/service/attraction', {
      headers: {
        Authorization: 'Bearer ' + this.apiToken,
        'Stay-Establishment': this.getStayEstablishment(),
      },
    })
      .toPromise()
      .then((response) => {
        if (this.halloweenCategories().length > 0) {
          return this.transfer.transferRidesToPois(response.data.data.filter((e) => !this.halloweenCategories().includes(e.category)))
        }

        return this.transfer.transferRidesToPois(response.data.data)
      });
  }

  async getRestaurants(): Promise<Poi[]> {
    return this.http.get<AtraccionesResponseInterface>(this.apiUrl + '/api/v1/service/restaurant', {
      headers: {
        Authorization: 'Bearer ' + this.apiToken,
        'Stay-Establishment': this.getStayEstablishment(),
      },
    })
      .toPromise()
      .then((response) => this.transfer.transferRestaurantsToPois(response.data.data));
  }

  async getShows(): Promise<Poi[]> {
    return this.http.get<ParqueAtraccionesShowsResponseInterface>(this.apiUrl + '/api/v1/service/' + this.getShowCategoryID(), {
      headers: {
        Authorization: 'Bearer ' + this.apiToken,
        'Stay-Establishment': this.getStayEstablishment(),
      },
    })
      .toPromise()
      .then((response) => this.transfer.transferShowsResponseToPois(response.data));
  }

  async getShops(): Promise<Poi[]> {
    return this.http.get<AtraccionesResponseInterface>(this.apiUrl + '/api/v1/service/shop', {
      headers: {
        Authorization: 'Bearer ' + this.apiToken,
        'Stay-Establishment': this.getStayEstablishment(),
      },
    })
      .toPromise()
      .then((response) => this.transfer.transferShopsToPois(response.data.data));
  }

  async getNewShows(): Promise<Poi[]> {
    return this.http.get<ParqueAtraccionesShowsResponseInterface>(this.apiUrl + '/api/v1/service/eventcalendar/category/' + this.getShowCategoryID() + '/calendar', {
      headers: {
        Authorization: 'Bearer ' + this.apiToken,
        'Stay-Establishment': this.getStayEstablishment(),
      },
    })
      .toPromise()
      .then((response) => this.transfer.transferShowsToPois(response.data.data));
  }

  async getHalloweenEvents(): Promise<Poi[]> {
    return this.http.get<AtraccionesResponseInterface>(this.apiUrl + '/api/v1/service/attraction', {
      headers: {
        Authorization: 'Bearer ' + this.apiToken,
        'Stay-Establishment': this.getStayEstablishment(),
      },
    })
      .toPromise()
      .then((response) => this.transfer.transferRidesToPois(response.data.data.filter((e) => this.halloweenCategories().includes(e.category))));
  }
}
