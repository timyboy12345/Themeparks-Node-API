import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ThemeParkService } from '../../_services/themepark/theme-park.service';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { ParqueWarnerResponseInterface } from './interfaces/parque-warner-response.interface';
import * as Sentry from '@sentry/node';
import { Poi } from '../../_interfaces/poi.interface';
import { ParqueWarnerTransferService } from './parque-warner-transfer/parque-warner-transfer.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ParqueWarnerService extends ThemeParkService {
  private apiUrl;

  constructor(private readonly httpService: HttpService,
              private readonly transferService: ParqueWarnerTransferService,
              private readonly configService: ConfigService) {
    super();
    this.apiUrl = this.configService.get('PARQUE_WARNER_API_URL');
  }

  getInfo(): ThemePark {
    return {
      name: 'Parque Warner',
      image: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/6c/79/19.jpg',
      description: 'Parque Warner Madrid is een themapark gelegen op 25 km ten zuidoosten van Madrid, Spanje, in de gemeente San Martín de la Vega.Het plan begon in 1997 en de bouw startte in de eerste helft van 1999.',
      id: 'parque-warner',
      timezone: '',
      countryCode: 'es',
      parkType: ParkType.THEMEPARK,
      location: {
        lat: 40.230382352296,
        lng: -3.593395704152226,
      },
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsRideWaitTimesHistory: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsRideWaitTimes: false,
      supportsRestaurants: true,
      supportsShows: true,
      supportsRides: true,
      supportsShops: true,
      supportsShopOpeningTimes: false,
      supportsPoiLocations: true,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsShowTimes: false,
      supportsAnimals: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    const promises = [
      this.getRides(),
      this.getRestaurants(),
      this.getShops(),
      this.getShows(),
    ];

    return []
      .concat
      .apply([], await Promise.all(promises));
  }

  async getRides(): Promise<Poi[]> {
    return this.getAttractionData()
      .then(value => this.transferService.transferPoisToPois(value.docs));
  }

  async getShows(): Promise<Poi[]> {
    return this.getEventData()
      .then(value => this.transferService.transferPoisToPois(value.docs));
  }

  async getShops(): Promise<Poi[]> {
    return this.getShopData()
      .then(value => this.transferService.transferPoisToPois(value.docs));
  }

  async getRestaurants(): Promise<Poi[]> {
    return this.getRestaurantData()
      .then(value => this.transferService.transferPoisToPois(value.docs));
  }

  private getAttractionData(): Promise<ParqueWarnerResponseInterface> {
    const url = `${this.apiUrl}/experiencias/atracciones.searchservlet.json?type_primary=parques-reunidos%3Aattractions&type_secondary=&facets%5B%5D=intensity&facets%5B%5D=fast-pass&lang=en`;
    return this.request(url);
  }

  private getEventData(): Promise<ParqueWarnerResponseInterface> {
    const url = `${this.apiUrl}/experiencias/espectaculos.searchservlet.json?type_primary=parques-reunidos%3Aevents&type_secondary=&fqs%5B%5D=monday_b%3Atrue&type=calendarevents&lang=en`;
    return this.request(url);
  }

  private getShopData(): Promise<ParqueWarnerResponseInterface> {
    const url = `${this.apiUrl}/compras/tiendas.searchservlet.json?type_primary=parques-reunidos%3Astores&type_secondary=&facets%5B%5D=theme-areas&type=filters&lang=en`;
    return this.request(url);
  }

  private getRestaurantData(): Promise<ParqueWarnerResponseInterface> {
    const url = `${this.apiUrl}/donde-comer/restaurantes.searchservlet.json?type_primary=parques-reunidos%3Arestaurants&type_secondary=&facets%5B%5D=type-of-restaurant&facets%5B%5D=type-of-food&facets%5B%5D=price&facets%5B%5D=meal-plan&type=filters&lang=en`;
    return this.request(url);
  }

  private request<T>(url: string): Promise<T> {
    return this.httpService.get<T>(url)
      .toPromise()
      .then(value => {
        return value.data;
      })
      .catch((e) => {
        Sentry.captureException(e);
        console.log(e);
        throw new InternalServerErrorException(e);
      });
  }
}
