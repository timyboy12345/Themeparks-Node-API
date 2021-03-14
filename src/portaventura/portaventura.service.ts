import { HttpService, Injectable } from '@nestjs/common';
import { ThemeParkService } from '../_services/themepark/theme-park.service';
import { ThemePark } from '../_interfaces/park.interface';
import { ThemeParkSupports } from '../_interfaces/park-supports.interface';
import { ConfigService } from '@nestjs/config';
import { Poi } from '../_interfaces/poi.interface';
import { PortaVenturaTransferService } from './portaventura-transfer/porta-ventura-transfer.service';
import { PortaVenturaPoi } from './interfaces/porta-ventura-poi.interface';

@Injectable()
export class PortaventuraService extends ThemeParkService {
  private readonly _portaVenturaApiUrl: any;

  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService,
              private readonly portaVenturaTransferService: PortaVenturaTransferService) {
    super();

    this._portaVenturaApiUrl = this.configService.get('PORTAVENTURA_API_URL');
  }

  getInfo(): ThemePark {
    return {
      id: 'portaventura',
      name: 'Portaventura',
      description: 'PortAventura World is een Spaans resort met een oppervlakte van 119 hectare gelegen in Salou en Vila-seca bestaand uit onder andere diverse hotels, twee attractieparken, een waterpark, een congrescentrum en een RV park.',
      countryCode: 'es',
      image: 'https://nl.letsgodigital.org/uploads/2017/11/pretpark-portaventura-salou.jpg',
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsPois: true,
      supportsRestaurantWaitTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: false,
      supportsRides: true,
      supportsShowTimes: false,
      supportsShows: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    const promises = [
      this.getRides(),
      this.getRestaurants()
    ];
    return []
      .concat
      .apply([], await Promise.all(promises));
  }

  async getRides(): Promise<Poi[]> {
    return this
      .request<PortaVenturaPoi[]>('atraccion')
      .then((portaVenturaRidesResponse =>
        this.portaVenturaTransferService.PortaVenturaPoisToPois(portaVenturaRidesResponse.data)));
  }

  async getRestaurants(): Promise<Poi[]> {
    return this
      .request<PortaVenturaPoi[]>('restaurante')
      .then((portaVenturaRestaurantsResponse =>
        this.portaVenturaTransferService.PortaVenturaPoisToPois(portaVenturaRestaurantsResponse.data.filter(p => p.parque_id))));
  }

  private request<T>(url: string) {
    const fullUrl = this._portaVenturaApiUrl + '/' + url + '/en';
    return this.httpService.get<T>(fullUrl).toPromise();
  }
}
