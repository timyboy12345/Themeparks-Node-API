import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { Poi } from '../../../_interfaces/poi.interface';
import { ThemeParkService } from '../../../_services/themepark/theme-park.service';
import { ConfigService } from '@nestjs/config';
import { BlijdorpTransferService } from '../blijdorp-transfer/blijdorp-transfer.service';
import * as moment from 'moment';
import * as Sentry from '@sentry/node';
import { BlijdorpShow } from '../interfaces/blijdorp-show.interface';
import { HttpService } from '@nestjs/axios';
import {
  BlijdorpAnimalInterface,
  BlijdorpAnimalsResponseInterface,
} from '../interfaces/blijdorp-animals-response.interface';
import { LocaleService } from '../../../_services/locale/locale.service';

@Injectable()
export class BlijdorpService extends ThemeParkService {
  private readonly organiqBaseUrl: string;
  private readonly organiqToken: string;

  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService,
              private readonly transferService: BlijdorpTransferService,
              private readonly localeService: LocaleService) {
    super();

    this.organiqBaseUrl = this.configService.get('BLIJDORP_ORGANIQ_URL');
    this.organiqToken = this.configService.get('BLIJDORP_ORGANIQ_TOKEN');
  }

  getInfo(): ThemePark {
    return {
      id: 'blijdorp',
      countryCode: 'nl',
      name: 'Blijdorp',
      description: 'In de woonwijk Blijdorp is de dierentuin van Rotterdam gevestigd, met ijsberen, rode panda\'s en een onderwatertunnel van waaruit je haaien kunt observeren. In het naastgelegen Vroesenpark lopen paden langs rustige meren, en het nabijgelegen Telecommuseum beschikt over een curieuze collectie klassieke radio\'s, telefoons en faxmachines. In de omliggende straten vind je bakkerijen, pizzeria\'s en informele buurtcafés.',
      image: 'https://bollenstreek.nl/wp-content/uploads/2018/10/savanne-totaal-1-620x350.jpg',
      location: {
        lat: 51.9269605,
        lng: 4.4481325,
      },
      parkType: ParkType.ZOO,
      timezone: 'Europe/Amsterdam',
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: true,
      supportsHalloween: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: false,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: false,
      supportsRideWaitTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsRides: false,
      supportsShopOpeningTimes: false,
      supportsShops: false,
      supportsShowTimes: true,
      supportsShows: true,
      supportsTranslations: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    const promises = [
      this.getAnimals(),
      this.getShows(),
    ];

    return []
      .concat
      .apply([], await Promise.all(promises));
  }

  async getAnimals(): Promise<Poi[]> {
    const url = 'https://diergaardeblijdorp.nl/api/animals-plants-overview';

    let lang: string;
    if (this.localeService.getLocale() == 'nl') {
      lang = 'nl-NL';
    } else {
      lang = 'en-GB';
    }

    let page = 1;
    let tries = 0;
    let animals: BlijdorpAnimalInterface[] = [];

    while (page > 0 && tries < 100) {
      tries++;

      await this.httpService
        .post<BlijdorpAnimalsResponseInterface>(url, {
          'lang': lang,
          'type': 'animal',
          'page': page,
        }).toPromise()
        .then((response) => {
          animals = animals.concat(response.data.items);

          if (response.data.nextPage) {
            page++;
          } else {
            page = -1;
          }
        })
        .catch((exception) => {
          Sentry.captureException(exception);
          console.error(exception);
          throw new InternalServerErrorException(exception);
        });
    }

    return this.transferService.transferAnimalsToPois(animals);
  }

  async getShows(): Promise<Poi[]> {
    const date = moment().format('YYYY-MM-DD');
    const url = `${this.organiqBaseUrl}/api/events/${date}`;

    const headers = {
      Authorization: `Bearer ${this.organiqToken}`,
    };

    return this.httpService
      .get<BlijdorpShow[]>(url, {
        headers: headers,
      }).toPromise()
      .then((response) => {
        return this.transferService.transferShowsToPois(response.data);
      })
      .catch((exception) => {
        Sentry.captureException(exception);
        console.error(exception);
        throw new InternalServerErrorException(exception);
      });
  }
}
