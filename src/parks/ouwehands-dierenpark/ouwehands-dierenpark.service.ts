import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ThemeParkService } from '../../_services/themepark/theme-park.service';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { Poi } from '../../_interfaces/poi.interface';
import {
  OuwehandsDierenparkResponseInterface,
  OuwehandsDierenparkResponseItemInterface,
} from './interfaces/ouwehands-dierenpark-response.interface';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/node';
import { OuwehandsDierenparkTransferService } from './ouwehands-dierenpark-transfer/ouwehands-dierenpark-transfer.service';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';

@Injectable()
export class OuwehandsDierenparkService extends ThemeParkService {
  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService,
              private readonly transferService: OuwehandsDierenparkTransferService) {
    super();
  }

  getInfo(): ThemePark {
    return {
      description: 'Ouwehands Dierenpark is een dierentuin in Rhenen in de Nederlandse provincie Utrecht. Het is gebouwd op de Laarschenberg aan de oostzijde van de stad.',
      name: 'Ouwehands Dierenpark',
      id: 'ouwehands-dierenpark',
      timezone: 'Europe/Amsterdam',
      parkType: ParkType.ZOO,
      countryCode: 'nl',
      image: 'https://www.looopings.nl/img/foto/21/0601bonobo2.jpg',
      location: {
        lat: 51.95743584938769,
        lng: 5.590213525112751,
      },
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsRideWaitTimesHistory: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsRideWaitTimes: false,
      supportsRestaurants: false,
      supportsShows: false,
      supportsRides: false,
      supportsShops: false,
      supportsShopOpeningTimes: false,
      supportsPoiLocations: false,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsShowTimes: false,
      supportsAnimals: true,
      supportsTranslations: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    return this.getAnimals();
  }

  async getAnimals(): Promise<Poi[]> {
    return this.getData().then(data => {
      return this.transferService.transferPoisToPois(data.data);
    });
  }

  async getNumberOfPages(): Promise<number> {
    const data = await this.getPage();
    return data.pagination.pages;
  }

  async getData(): Promise<OuwehandsDierenparkResponseInterface> {
    const numberOfPages = await this.getNumberOfPages();
    const pages = [];

    for (let i = 1; i <= numberOfPages; i++) {
      pages.push(i);
    }

    return Promise.all<OuwehandsDierenparkResponseInterface>(pages.map(p => this.getPage(p)))
      .then((combined) => {
        let animals: OuwehandsDierenparkResponseItemInterface[] = [];

        combined.forEach(value => {
          animals = animals.concat(value.data);
        });

        return {
          data: animals,
          pagination: {
            'pages': combined[0].pagination.pages,
            'itemsperpage': combined[0].pagination.itemsperpage,
          },
        };
      }).catch((error) => {
        throw new InternalServerErrorException(error);
      });
  }

  async getPage(page: number = 1): Promise<OuwehandsDierenparkResponseInterface> {
    const baseUrl = this.configService.get('OUWEHANDS_DIERENPARK_API_URL');
    const url = `${baseUrl}/nl/ontdekken/dieren/json1?language=nl&page=${page}&onlypage=true`;

    const headers = {
      'X-Requested-With': 'XMLHttpRequest',
    };

    return this.httpService.get<OuwehandsDierenparkResponseInterface>(url, {
      headers: headers,
    })
      .toPromise()
      .then(value => {
        return value.data;
      })
      .catch(reason => {
        Sentry.captureException(reason);
        console.log(reason);
        throw new InternalServerErrorException(reason);
      });
  }
}
