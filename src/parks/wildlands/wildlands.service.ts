import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ThemeParkService } from '../../_services/themepark/theme-park.service';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { ConfigService } from '@nestjs/config';
import { WildlandsTransferService } from './wildlands-transfer/wildlands-transfer.service';
import { Poi } from '../../_interfaces/poi.interface';
import * as Sentry from '@sentry/node';
import {
  WildlandsAnimalsResponseInterface,
  WildlandsAnimalsResponseItemInterface,
} from './interfaces/wildlands-animals-response.interface';

@Injectable()
export class WildlandsService extends ThemeParkService {
  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService,
              private readonly transferService: WildlandsTransferService) {
    super();
  }

  getInfo(): ThemePark {
    return {
      id: 'wildlands',
      name: 'Wildlands',
      image: 'https://media.nu.nl/m/ikrx3sva9qsa_wd1280.jpg/gemeente-emmen-neemt-schulden-van-dierenpark-wildlands-over.jpg',
      description: 'Wildlands, voluit Wildlands Adventure Zoo Emmen, is een dierenpark in Emmen. Het park heeft een oppervlakte van 24 hectare en is opgedeeld in drie themagebieden. In \'Jungola\' staat de jungle centraal, in \'Serenga\' de savanne en de woestijn en in \'Nortica\' het poolgebied. Wikipedia',
      countryCode: 'nl',
      parkType: ParkType.ZOO,
      timezone: 'Europe/Amsterdam',
      location: {
        lat: 52.78139929877351,
        lng: 6.888716508212956,
      },
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: true,
      supportsShowTimes: false,
      supportsRestaurantOpeningTimes: false,
      supportsPois: true,
      supportsPoiLocations: false,
      supportsShopOpeningTimes: false,
      supportsShops: false,
      supportsRides: false,
      supportsShows: false,
      supportsRestaurants: false,
      supportsRideWaitTimes: false,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: false,
      supportsRideWaitTimesHistory: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    return this.getAnimals();
  }

  async getAnimals(): Promise<Poi[]> {
    return this.getData().then(data => {
      return this.transferService.transferPoisToPois(data.data.items);
    });
  }

  async getNumberOfPages(): Promise<number> {
    const data = await this.getPage();
    return data.pagination.pagination.pages;
  }

  async getData(): Promise<WildlandsAnimalsResponseInterface> {
    const numberOfPages = await this.getNumberOfPages();
    const pages = [];

    for (let i = 1; i <= numberOfPages; i++) {
      pages.push(i);
    }

    return Promise.all(pages.map(p => this.getPage(p)))
      .then((combined) => {
        let animals: WildlandsAnimalsResponseItemInterface[] = [];

        combined.forEach(value => {
          animals = animals.concat(value.data.items);
        });

        const p: WildlandsAnimalsResponseInterface = {
          data: {
            items: animals,
          },
          pagination: combined[0].pagination,
        };

        return p;
      }).catch((error) => {
        console.error(error);
        throw new InternalServerErrorException(error);
      });
  }

  async getPage(page: number = 1): Promise<WildlandsAnimalsResponseInterface> {
    const baseUrl = this.configService.get('WILDLANDS_API_URL');
    const language = 'nl';
    const url = `${baseUrl}/ajax/Animals/Filter?language=${language}&site=1&page=${page}`;

    const headers = {
      'X-Requested-With': 'XMLHttpRequest',
    };

    return this.httpService.get<WildlandsAnimalsResponseInterface>(url, {
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
