import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { Poi } from '../../../_interfaces/poi.interface';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/node';
import { BeekseBergenTransferService } from '../beekse-bergen-transfer/beekse-bergen-transfer.service';
import { HttpService } from '@nestjs/axios';
import { ThroughPoisThemeParkService } from '../../../_services/themepark/through-pois-theme-park.service';
import { BeekseBergenLocationsResponseInterface } from '../interfaces/beekse-bergen-locations-response.interface';
import { LocaleService } from '../../../_services/locale/locale.service';

@Injectable()
export class SafariparkService extends ThroughPoisThemeParkService {
  private readonly _apiUrl: string;
  private readonly _apiToken: string;

  constructor(private readonly httpService: HttpService,
              private readonly transferService: BeekseBergenTransferService,
              private readonly configService: ConfigService,
              private readonly localeService: LocaleService) {
    super();

    this._apiUrl = this.configService.get('BEEKSE_BERGEN_API_URL');
    this._apiToken = this.configService.get('BEEKSE_BERGEN_API_TOKEN');
  }

  getInfo(): ThemePark {
    return {
      id: 'safaripark-beekse-bergen',
      name: 'Safaripark Beekse Bergen',
      description: 'Safaripark Beekse Bergen is een dierenpark dat ligt tussen Tilburg en Hilvarenbeek in de gemeente Hilvarenbeek in de Nederlandse provincie Noord-Brabant. Het is qua oppervlakte het grootste dierenpark van de Benelux. Er worden ca. 100 diersoorten gehouden, variërend van kleine zoogdieren tot grote vogels.',
      image: 'https://d33b12c77av9bg.cloudfront.net/originals/safaripark-giraffen-gamedrive-savanne-beekse-bergen.jpg',
      location: {
        lat: 51.513191,
        lng: 5.112000,
      },
      timezone: 'Europe/Amsterdam',
      parkType: ParkType.ZOO,
      countryCode: 'nl',
      company: Company.LIBEMA,
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: true,
      supportsEvents: false,
      supportsOpeningTimes: true,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: false,
      supportsPois: true,
      supportsRestaurantOpeningTimes: true,
      supportsRestaurants: true,
      supportsRideWaitTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsRides: true,
      supportsShopOpeningTimes: true,
      supportsShops: true,
      supportsShowTimes: false,
      supportsShows: false,
      supportsTranslations: false,
      textType: 'MARKDOWN',
    };
  }

  async getPois(): Promise<Poi[]> {
    const promises = [
      this.getAnimals(),
      this.getRides(),
      this.getRestaurants(),
      this.getShops(),
    ];

    return []
      .concat
      .apply([], await Promise.all(promises));
  }

  async getAnimals(): Promise<Poi[]> {
    return await this.fetchPage('animals')
      .then((d) => this.transferService.transferAnimalsToPois(d.data, this.localeService.getLocale()));
  }

  async getRides(): Promise<Poi[]> {
    return await this.fetchPage('activities', 1, 300, 5)
      .then((d) => this.transferService.transferRidesToPois(d.data, this.localeService.getLocale()));
  }

  async getRestaurants(): Promise<Poi[]> {
    return await this.fetchPage('facilities', 1, 50, 5, 18)
      .then((d) => this.transferService.transferRestaurantsToPois(d.data, this.localeService.getLocale()));
  }

  async getShops(): Promise<Poi[]> {
    return await this.fetchPage('facilities', 1, 50, 5, 19)
      .then((d) => this.transferService.transferShopsToPois(d.data, this.localeService.getLocale()));
  }

  async getLocations() {
    return this.fetchPage('locations', 1, 300, 5)
      .then((res) => res.data.map((i) => {
        return {
          id: i.id,
          name: i.attributes.name,
          // @ts-ignore
          coordinates: i.attributes.coordinates,
        };
      }));
  }

  async fetchPage(endPoint: string, page: number = 1, pageSize: number = 200, resort: number = null, category: number = null): Promise<BeekseBergenLocationsResponseInterface> {
    // Beekse Bergen Resort ID: 5, Speelland: 6
    let url = `https://xmp.xo10.io/api/${endPoint}?populate=*`;

    if (resort) {
      url += `&filters%5Bresort%5D%5Bid%5D%5B$in%5D=${resort}`;
    }
    if (page) {
      url += `&pagination%5Bpage%5D=${page}`;
    }
    if (pageSize) {
      url += `&pagination%5BpageSize%5D=${pageSize}`;
    }
    if (category) {
      url += `&filters%5Bcategories%5D%5Bid%5D%5B$in%5D%5B0%5D=${category}`;
    }

    return this.httpService.get<BeekseBergenLocationsResponseInterface>(url, {
      headers: {
        'Authorization': 'Bearer ' + this._apiToken,
      },
    })
      .toPromise()
      .then(value => {
        return value.data;
      })
      .catch((exception) => {
        Sentry.captureException(exception);
        console.error(exception);
        throw new InternalServerErrorException(exception);
      });
  }
}
