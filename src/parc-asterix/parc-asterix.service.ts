import { HttpService, Injectable } from '@nestjs/common';
import { ThemeParkService } from '../_services/themepark/theme-park.service';
import { ThemePark } from '../_interfaces/park.interface';
import { ThemeParkSupports } from '../_interfaces/park-supports.interface';
import { ConfigService } from '@nestjs/config';
import { Poi } from '../_interfaces/poi.interface';
import { ParcAsterixTransferService } from './parc-asterix-transfer/parc-asterix-transfer.service';
import { ParcAsterixAttractionsResponseInterface } from './interfaces/parc-asterix-attractions-response.interface';
import { ParcAsterixRestaurantsResponseInterface } from './interfaces/parc-asterix-restaurants-response.interface';
import { ParcAsterixShowsResponseInterface } from './interfaces/parc-asterix-shows-response.interface';

@Injectable()
export class ParcAsterixService extends ThemeParkService {
  private readonly _parcAsterixApiUrl: string;

  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService,
              private readonly parcAsterixTransferService: ParcAsterixTransferService) {
    super();

    this._parcAsterixApiUrl = this.configService.get('PARC_ASTERIX_API_URL');
  }

  getInfo(): ThemePark {
    return {
      id: 'parc_asterix',
      name: 'Parc Asterix',
      description: 'Parc Astérix is een Frans attractiepark in Plailly, ongeveer 35 km ten noorden van Parijs. Het is gebaseerd op de stripverhalen van Asterix en Obelix van Albert Uderzo en René Goscinny. Het park werd in 1989 geopend en is erg populair. Het complex omvat het pretpark en een themahotel: het "Hotel des Trois Hiboux".',
      image: 'https://www.parcasterix.fr/sites/default/files/1440_579_3_0.jpg',
      countryCode: 'fr',
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
      supportsShows: true,
      supportsPoiLocations: true,
    };
  }

  async getRides(): Promise<Poi[]> {
    return this
      .request<ParcAsterixAttractionsResponseInterface>('attractions.json')
      .then(attractionsResponse =>
        this.parcAsterixTransferService.ParcAsterixAttractionsToPois(attractionsResponse.data.result.attractions));
  }

  async getRestaurants(): Promise<Poi[]> {
    return this
      .request<ParcAsterixRestaurantsResponseInterface>('restaurants.json')
      .then(restaurantsResponse =>
        this.parcAsterixTransferService.ParcAsterixRestaurantsToPois(restaurantsResponse.data.result.restaurants));
  }

  async getShows(): Promise<Poi[]> {
    return this
      .request<ParcAsterixShowsResponseInterface>('shows.json')
      .then(showsResponse =>
        this.parcAsterixTransferService.ParcAsterixShowsToPois(showsResponse.data.result.shows));
  }

  async getPois(): Promise<Poi[]> {
    const promises = [
      this.getRides(),
      this.getRestaurants(),
      this.getShows()
    ];

    return []
      .concat
      .apply([], await Promise.all(promises));
  }

  private request<T>(url: string) {
    const fullUrl = this._parcAsterixApiUrl + '/' + url + '?lang=en';
    return this.httpService.get<T>(fullUrl).toPromise();
  }
}
