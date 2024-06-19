import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { ThroughPoisThemeParkService } from '../../_services/themepark/through-pois-theme-park.service';
import { Poi } from '../../_interfaces/poi.interface';
import { HansaParkTransferService } from './hansa-park-transfer/hansa-park-transfer.service';
import { HansaParkDataResponseInterface } from './interfaces/hansa-park-data-response.interface';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/node';
import { HttpService } from '@nestjs/axios';
import { LocaleService } from '../../_services/locale/locale.service';

@Injectable()
export class HansaParkService extends ThroughPoisThemeParkService {
  constructor(private readonly hansaParkTransferService: HansaParkTransferService,
              private readonly httpService: HttpService,
              private readonly configService: ConfigService,
              private readonly locale: LocaleService) {
    super();
  }

  getInfo(): ThemePark {
    return {
      name: 'Hansa Park',
      description: 'Hansa-Park is een attractiepark, gelegen bij Sierksdorf in de Duitse deelstaat Sleeswijk-Holstein. Het park werd geopend op 15 mei 1977 onder de naam "Hansaland". In 1987 werd het park omgedoopt tot Hansa-Park. Van 1973 tot 1976 was op dezelfde locatie het eerste Duitse Legoland.',
      image: 'https://www.looopings.nl/img/foto/21/0425wowhans.jpg',
      countryCode: 'de',
      parkType: ParkType.THEMEPARK,
      timezone: 'Europe/Berlin',
      id: 'hansa-park',
      location: {
        lat: 54.0769,
        lng: 10.78,
      },
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
      supportsHalloween: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: true,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: true,
      supportsRideWaitTimesHistory: false,
      supportsRides: true,
      supportsShopOpeningTimes: true,
      supportsShops: true,
      supportsShowTimes: true,
      supportsShows: true,
      supportsTranslations: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    return this.getData()
      .then(value => {
        return this.hansaParkTransferService.transferPoisToPois(value.data);
      });
  }

  async getData(): Promise<HansaParkDataResponseInterface> {
    let locale: string;
    const order = 'name';
    const key = this.configService.get('HANSA_PARK_API_KEY');
    const baseUrl = this.configService.get('HANSA_PARK_API_URL');

    switch (this.locale.getLocale()) {
      case 'de':
        locale = 'de';
        break;
      case 'da':
        locale = 'dk';
        break;
      default:
        locale = 'en';
        break;
    }

    const url = `${baseUrl}/attractions/?locale=${locale}&orderBy=${order}&orderDir=ASC&key=${key}`;

    return this.httpService.get<HansaParkDataResponseInterface>(url)
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
