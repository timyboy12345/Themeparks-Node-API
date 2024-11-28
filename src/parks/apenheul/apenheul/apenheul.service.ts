import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ThemeParkService } from '../../../_services/themepark/theme-park.service';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { Poi } from '../../../_interfaces/poi.interface';
import * as Sentry from '@sentry/node';
import { ApenheulTransferService } from '../apenheul-transfer/apenheul-transfer.service';
import { ApenheulAapABCResponseInterface } from '../interfaces/apenheul-aapabc-response.interface';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ApenheulService extends ThemeParkService {
  private baseUrl: string;

  constructor(private httpService: HttpService,
              private transferService: ApenheulTransferService,
              private configService: ConfigService) {
    super();

    this.baseUrl = this.configService.get('APENHEUL_API_URL');
  }

  getInfo(): ThemePark {
    return {
      id: 'apenheul',
      countryCode: 'nl',
      name: 'Apenheul',
      description: 'Apenheul is een dierentuin met apen aan de rand van de Nederlandse stad Apeldoorn. In het park verblijven ruim 300 apen van zo\'n 35 verschillende soorten die thuishoren in Afrika, Zuid-Amerika en Azië. Veel van de dieren zijn niet in hokken opgesloten: gaas of tralies ziet men er bijna niet.',
      image: 'https://cdn-cms.bookingexperts.nl/media/893/52/preprocessed.jpeg',
      location: {
        lat: 52.21367,
        lng: 5.92459,
      },
      timezone: 'Europe/Amsterdam',
      parkType: ParkType.ZOO,
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: true,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: false,
      supportsPois: false,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: false,
      supportsRideWaitTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsRides: false,
      supportsShopOpeningTimes: false,
      supportsShops: false,
      supportsShowTimes: false,
      supportsShows: false,
      supportsTranslations: false,
      textType: "UNDEFINED",
      supportsEvents: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    return this.getAnimals();
  }

  public async getAnimals(): Promise<Poi[]> {
    const baseUrl = this.baseUrl;
    const url = `${baseUrl}/umbraco/api/overview/get?alias=aapABC&nodeId=2471&page=0&pageSize=200&searchString=`;

    return this.httpService
      .get<ApenheulAapABCResponseInterface>(url)
      .toPromise()
      .then((response) => {
        return this.transferService.transferPoisToPois(response.data.Items);
      })
      .catch((reason) => {
        Sentry.captureException(reason);
        console.error(reason);
        throw new InternalServerErrorException(reason);
      });
  }
}
