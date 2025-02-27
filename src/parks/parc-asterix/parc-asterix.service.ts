import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ThemeParkService } from '../../_services/themepark/theme-park.service';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { ConfigService } from '@nestjs/config';
import { Poi } from '../../_interfaces/poi.interface';
import { ParcAsterixTransferService } from './parc-asterix-transfer/parc-asterix-transfer.service';
import { ParcAsterixResponseInterface } from './interfaces/parc-asterix-response.interface';
import { HttpService } from '@nestjs/axios';
import { LocaleService } from '../../_services/locale/locale.service';
import * as Sentry from '@sentry/node';

@Injectable()
export class ParcAsterixService extends ThemeParkService {
  private readonly _parcAsterixApiUrl: string;

  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService,
              private readonly parcAsterixTransferService: ParcAsterixTransferService,
              private readonly localeService: LocaleService) {
    super();

    this._parcAsterixApiUrl = this.configService.get('PARC_ASTERIX_API_URL');
  }

  getInfo(): ThemePark {
    return {
      id: 'parc_asterix',
      name: 'Parc Asterix',
      description: 'Parc Astérix is een Frans attractiepark in Plailly, ongeveer 35 km ten noorden van Parijs. Het is gebaseerd op de stripverhalen van Asterix en Obelix van Albert Uderzo en René Goscinny. Het park werd in 1989 geopend en is erg populair. Het complex omvat het pretpark en een themahotel: het "Hotel des Trois Hiboux".',
      image: 'https://www.parcasterix.fr/sites/default/files/styles/attraction_detail/public/images/attractions/haut/attraction-toutatis.jpg.webp?itok=i3Y2COMX',
      countryCode: 'fr',
      parkType: ParkType.THEMEPARK,
      location: {
        lat: 49.136041,
        lng: 2.572768,
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
      supportsShows: true,
      supportsPoiLocations: true,
      supportsShops: false,
      supportsShopOpeningTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: false,
      supportsAnimals: false,
      supportsTranslations: false,
      textType: 'UNDEFINED',
      supportsEvents: false,
    };
  }

  async getRides(): Promise<Poi[]> {
    return this
      .request<ParcAsterixResponseInterface>(`?operationName=getAttractions&variables=%7B%22language%22%3A%22${this.getLocale()}%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%225609363783d826ec6c460caa620e3ca28e651897febf6753159836ab72d8139b%22%7D%7D`)
      .then(attractionsResponse =>
        this.parcAsterixTransferService.transferRidesToPois(attractionsResponse.data.data.openAttractions)).catch((reason) => {
        Sentry.captureException(reason);
        console.error(reason);
        throw new InternalServerErrorException(reason);
      });
  }

  async getRestaurants(): Promise<Poi[]> {
    return this
      .request<ParcAsterixResponseInterface>(`?operationName=restaurants&variables=%7B%22language%22%3A%22${this.getLocale()}%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22857561404b9f5c69e651d74e0f5c0403f5bd3bd02491a0958d11d60bd8526cc9%22%7D%7D`)
      .then(restaurantsResponse =>
        this.parcAsterixTransferService.transferRestaurantsToPois(restaurantsResponse.data.data.restaurants)).catch((reason) => {
        Sentry.captureException(reason);
        console.error(reason);
        throw new InternalServerErrorException(reason);
      });
  }

  async getShows(): Promise<Poi[]> {
    return this
      .request<ParcAsterixResponseInterface>(`?operationName=spectacles&variables=%7B%22language%22%3A%22${this.getLocale()}%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22a3a067a0edbfb3666228d5d966d5933b1572e271b4c7f2858ce1758a2490227e%22%7D%7D`)
      .then(showsResponse =>
        this.parcAsterixTransferService.transferShowsToPois(showsResponse.data.data.openShows))
      .catch((reason) => {
        Sentry.captureException(reason);
        console.error(reason);
        throw new InternalServerErrorException(reason);
      });
  }

  async getHotels(): Promise<Poi[]> {
    return this
      .request<ParcAsterixResponseInterface>('?operationName=hotels&variables=%7B%22language%22%3A%22fr%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%2243b7bf45e8b05c64c76ba5285ec32d998d00c2d434cac37eb8f5f562b92156a4%22%7D%7D')
      .then(hotelsResponse =>
        this.parcAsterixTransferService.transferShowsToPois(hotelsResponse.data.data.openShows)).catch((reason) => {
        Sentry.captureException(reason);
        console.error(reason);
        throw new InternalServerErrorException(reason);
      });
  }

  async getPois(): Promise<Poi[]> {
    const promises = [
      this.getRides(),
      this.getRestaurants(),
      this.getShows(),
    ];

    return []
      .concat
      .apply([], await Promise.all(promises));
  }

  private request<T>(url: string, count = 0) {
    const fullUrl = this._parcAsterixApiUrl + url;
    return this.httpService.get<T>(fullUrl).toPromise().then((r) => {
      // @ts-ignore
      if (!r.data.data && count < 5) {
        return this.request(url, count + 1);
      }

      return r;
    });
  }

  private getLocale(): string {
    switch (this.localeService.getLocale()) {
      case 'fr':
        return 'fr';
      default:
        return 'en';
    }
  }
}
