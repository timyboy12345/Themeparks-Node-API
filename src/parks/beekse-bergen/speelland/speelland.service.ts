import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ThemeParkService } from '../../../_services/themepark/theme-park.service';
import { BeekseBergenTransferService } from '../beekse-bergen-transfer/beekse-bergen-transfer.service';
import { ConfigService } from '@nestjs/config';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { Poi } from '../../../_interfaces/poi.interface';
import * as Sentry from '@sentry/node';
import { HttpService } from '@nestjs/axios';
import { BeekseBergenLocationsResponseInterface } from '../interfaces/beekse-bergen-locations-response.interface';
import { LocaleService } from '../../../_services/locale/locale.service';

@Injectable()
export class SpeellandService extends ThemeParkService {
  protected readonly _apiUrl: string;
  protected readonly _apiToken: string;

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
      id: 'speelland-beekse-bergen',
      name: 'Speelland Beekse Bergen',
      description: 'Speelland Beekse Bergen is een attractiepark en speeltuin bij Hilvarenbeek en maakt deel uit van de groep van Beekse Bergen, waar ook Safaripark Beekse Bergen deel van uitmaakt. Het park is sinds 1987 onderdeel van Libéma Exploitatie BV. Speelland heeft vooral speeltuinen en waterattracties.',
      image: 'https://d33b12c77av9bg.cloudfront.net/originals/speelland-beachparty-strand-braai-barbecue.jpg',
      location: {
        lat: 51.524330,
        lng: 5.120210,
      },
      timezone: 'Europe/Amsterdam',
      parkType: ParkType.THEMEPARK,
      countryCode: 'nl',
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
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
      textType: "MARKDOWN",
      supportsEvents: false,
    }
  }

  async getPois(): Promise<Poi[]> {
    const promises = [
      this.getRides(),
      this.getRestaurants(),
      this.getShops(),
    ];

    return []
      .concat
      .apply([], await Promise.all(promises));
  }

  // TODO: Fix this call, play facilities do not seem to be included
  async getRides(): Promise<Poi[]> {
    return await this.fetchPage('activities', 1, 300, 6)
      .then((d) => this.transferService.transferRidesToPois(d.data, this.localeService.getLocale()));
  }

  async getRestaurants(): Promise<Poi[]> {
    return await this.fetchPage('facilities', 1, 50, 6, 18)
      .then((d) => this.transferService.transferRestaurantsToPois(d.data, this.localeService.getLocale()));
  }

  async getShops(): Promise<Poi[]> {
    return await this.fetchPage('facilities', 1, 50, 6, 19)
      .then((d) => this.transferService.transferShopsToPois(d.data, this.localeService.getLocale()));
  }

  async getLocations() {
    return this.fetchPage('locations', 1, 300, 6)
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
