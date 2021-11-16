import { HttpService, Injectable } from '@nestjs/common';
import { ThemeParkService } from '../../../_services/themepark/theme-park.service';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { ConfigService } from '@nestjs/config';
import { Poi } from '../../../_interfaces/poi.interface';
import { PortaVenturaTransferService } from '../portaventura-transfer/porta-ventura-transfer.service';
import { PortaVenturaPoi } from '../interfaces/porta-ventura-poi.interface';

@Injectable()
export class FerrariLandService extends ThemeParkService {
  private readonly _ferrariLandApiUrl: any;

  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService,
              private readonly portaVenturaTransferService: PortaVenturaTransferService) {
    super();

    this._ferrariLandApiUrl = this.configService.get('FERRARI_LAND_API_URL');
  }

  getInfo(): ThemePark {
    return {
      id: 'ferrariland',
      name: 'Ferrari Land',
      description: 'Ferrari Land is een Spaans themapark gelegen in het resort PortAventura World in Salou. Het is gewijd aan Ferrari en Italië. Met een oppervlakte van 60.000 m² Ferrari Land ligt naast PortAventura Park, een pretpark uit 1995',
      countryCode: 'es',
      image: 'https://nl.letsgodigital.org/uploads/2018/03/pretpark-ferrari-land.jpg',
      parkType: ParkType.THEMEPARK,
      location: {
        lat: 41.084718452772584,
        lng: 1.1520460265615593,
      },
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: false,
      supportsRides: true,
      supportsShowTimes: false,
      supportsShows: false,
      supportsPoiLocations: true,
      supportsShops: false,
      supportsShopOpeningTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: false,
      supportsAnimals: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    const promises = [
      this.getRides(),
      this.getRestaurants(),
    ];
    return []
      .concat
      .apply([], await Promise.all(promises));
  }

  async getRides(): Promise<Poi[]> {
    return this
      .request<PortaVenturaPoi[]>('atraccion')
      .then((ferrariLandRidesResponse =>
        this.portaVenturaTransferService.transferPoisToPois(ferrariLandRidesResponse.data)));
  }

  async getRestaurants(): Promise<Poi[]> {
    return this
      .request<PortaVenturaPoi[]>('restaurante')
      .then((ferrariLandRestaurantsResponse =>
        this.portaVenturaTransferService.transferPoisToPois(ferrariLandRestaurantsResponse.data)));
  }

  private request<T>(url: string) {
    const fullUrl = this._ferrariLandApiUrl + '/' + url + '/en';
    return this.httpService.get<T>(fullUrl).toPromise();
  }
}
