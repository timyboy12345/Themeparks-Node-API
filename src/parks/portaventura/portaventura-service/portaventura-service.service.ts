import { Injectable, InternalServerErrorException, NotImplementedException } from '@nestjs/common';
import { ThemeParkService } from '../../../_services/themepark/theme-park.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/node';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { PortaVenturaTransferService } from '../portaventura-transfer/porta-ventura-transfer.service';
import { PortaVenturaResponse } from '../interfaces/porta-ventura-poi.interface';
import { LocaleService } from '../../../_services/locale/locale.service';
import { ParamsSerializerOptions } from 'axios';

@Injectable()
export class PortaventuraServiceService extends ThemeParkService {
  private readonly _apiUrl = null;

  constructor(private readonly http: HttpService,
              private readonly config: ConfigService,
              private readonly transfer: PortaVenturaTransferService,
              private readonly locale: LocaleService) {
    super();

    this._apiUrl = config.get('PORTAVENTURA_API_URL');
  }

  getParkName(): string {
    throw new NotImplementedException('Park name not set');
  }

  filter(data: PortaVenturaResponse): PortaVenturaResponse {
    return {
      data: data.data.filter((p) => p.attributes.park && p.attributes.park.data && p.attributes.park.data.attributes.name === this.getParkName())
    }
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
      supportsShops: true,
      supportsShopOpeningTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: false,
      supportsAnimals: false,
      supportsTranslations: false,
      supportsHalloween: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    const promises = [
      this.getRides(),
      this.getShops(),
      this.getRestaurants(),
      this.getShows(),
    ];

    return []
      .concat
      .apply([], await Promise.all(promises));
  }

  async getRides(): Promise<Poi[]> {
    return this.http.get<PortaVenturaResponse>(this._apiUrl + '/api/attractions', {
      params: this.getParams(),
      paramsSerializer: this.getParamSerializer(),
    })
      .toPromise()
      .then((res) => this.transfer.transferRidesToPois(this.filter(res.data).data))
      .catch((reason) => {
        Sentry.captureException(reason);
        console.error(reason);
        throw new InternalServerErrorException(reason);
      });
  }

  async getShows(): Promise<Poi[]> {
    return this.http.get<PortaVenturaResponse>(this._apiUrl + '/api/shows', {
      params: this.getParams(),
      paramsSerializer: this.getParamSerializer(),
    })
      .toPromise()
      .then((res) => this.transfer.transferShowsToPois(this.filter(res.data).data))
      .catch((reason) => {
        Sentry.captureException(reason);
        console.error(reason);
        throw new InternalServerErrorException(reason);
      });
  }

  async getShops(): Promise<Poi[]> {
    return this.http.get<PortaVenturaResponse>(this._apiUrl + '/api/shops', {
      params: this.getParams(),
      paramsSerializer: this.getParamSerializer(),
    })
      .toPromise()
      .then((res) => this.transfer.transferShopsToPois(this.filter(res.data).data))
      .catch((reason) => {
        Sentry.captureException(reason);
        console.error(reason);
        throw new InternalServerErrorException(reason);
      });
  }

  async getRestaurants(): Promise<Poi[]> {
    return this.http.get<PortaVenturaResponse>(this._apiUrl + '/api/restaurants', {
      params: this.getParams(),
      paramsSerializer: this.getParamSerializer(),
    })
      .toPromise()
      .then((res) => this.transfer.transferRestaurantsToPois(this.filter(res.data).data))
      .catch((reason) => {
        Sentry.captureException(reason);
        console.error(reason);
        throw new InternalServerErrorException(reason);
      });
  }

  private getLocale() {
    switch (this.locale.getLocale()) {
      case 'es':
        return 'es-ES';
      case 'fr':
        return 'fr-FR';
      case 'en':
      default:
        return 'en';
    }
  }

  private getParams(): any {
    return {
      'populate%5Bfields%5D%5B0%5D': '%2A',
      'populate%5Bsort%5D%5B0%5D': 'name%3Aasc',
      'populate%5Bpark%5D%5Bfields%5D%5B0%5D': 'name',
      'populate%5Barea%5D%5Bfields%5D%5B0%5D': 'name',
      'populate%5Bimages%5D%5Bfields%5D%5B0%5D': 'formats',
      'populate%5Blogo%5D%5Bfields%5D%5B0%5D': 'formats',
      'populate%5Blogo%5D%5Bfields%5D%5B1%5D': 'url',
      'populate%5Bsimilar%5D%5Bfields%5D%5B0%5D': 'id',
      'populate%5Burls%5D%5Bfields%5D%5B0%5D': '%2A',
      'populate%5Btags%5D%5Bfields%5D%5B0%5D': 'name',
      'populate%5Btags%5D%5Bfields%5D%5B1%5D': 'customSlug',
      'locale': this.getLocale(),
    };
  }

  private getParamSerializer(): ParamsSerializerOptions {
    return {
      encode: (params) => {
        return params;
      },
    };
  }
}
