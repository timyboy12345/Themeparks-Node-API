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

@Injectable()
export class HansaParkService extends ThroughPoisThemeParkService {
  constructor(private readonly hansaParkTransferService: HansaParkTransferService,
              private readonly httpService: HttpService,
              private readonly configService: ConfigService) {
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
        lng: 10.78
      }
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
      supportsShowTimes: false,
      supportsRestaurantOpeningTimes: false,
      supportsPois: true,
      supportsPoiLocations: true,
      supportsShopOpeningTimes: true,
      supportsShops: true,
      supportsRides: true,
      supportsShows: true,
      supportsRestaurants: true,
      supportsRideWaitTimes: true,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsTranslations: false,
supportsHalloween: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    return this.getData()
      .then(value => {
        return this.hansaParkTransferService.transferPoisToPois(value.data);
      });
  }

  async getData(): Promise<HansaParkDataResponseInterface> {
    const locale = 'en';
    const order = 'name';
    const key = this.configService.get('HANSA_PARK_API_KEY');
    const baseUrl = this.configService.get('HANSA_PARK_API_URL');

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
