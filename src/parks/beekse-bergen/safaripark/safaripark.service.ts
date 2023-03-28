import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ThemeParkService } from '../../../_services/themepark/theme-park.service';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { Poi } from '../../../_interfaces/poi.interface';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/node';
import { BeekseBergenTransferService } from '../beekse-bergen-transfer/beekse-bergen-transfer.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SafariparkService extends ThemeParkService {
  private readonly apiUrl;

  constructor(private readonly httpService: HttpService,
              private readonly transferService: BeekseBergenTransferService,
              private readonly configService: ConfigService) {
    super();

    this.apiUrl = this.configService.get('BEEKSE_BERGEN_API_URL');
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
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: true,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: false,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsRides: false,
      supportsShopOpeningTimes: false,
      supportsShops: false,
      supportsShowTimes: false,
      supportsShows: false,
      supportsTranslations: false,
    }
  }

  async getPois(): Promise<Poi[]> {
    const promises = [
      this.getAnimals(),
      this.getRestaurants()
    ];

    return []
      .concat
      .apply([], await Promise.all(promises));
  }

  async getAnimals(): Promise<Poi[]> {
    const url = this.apiUrl + '/contents?order_by=createdAt&direction=ASC&page=1&limit=999999&expr=[{%22id%22:1495203205804,%22key%22:%22contenttype_id%22,%22selector%22:%22contentType.id%22,%22constraint%22:%22Webmozart\\\\Expression\\\\Constraint\\\\Equals%22,%22type%22:%22select%22,%22value%22:%223%22,%22children%22:[]}]';

    return this.httpService.get<BeekseBergenApiResponse>(url)
      .toPromise()
      .then(value => {
        return this.transferService.transferAnimalsToPois(value.data.results);
      })
      .catch((exception) => {
        Sentry.captureException(exception);
        console.error(exception);
        throw new InternalServerErrorException(exception);
      });
  }

  async getRestaurants(): Promise<Poi[]> {
    const url = this.apiUrl + '/contents?&order_by=createdAt&direction=ASC&limit=12&page=1&expr=[{%22id%22:1591338477520,%22key%22:%22and%22,%22selector%22:%22and%22,%22constraint%22:%22Webmozart\\\\Expression\\\\Logic\\\\AndX%22,%22type%22:%22set%22,%22value%22:%22%22,%22children%22:[{%22id%22:1591338481044,%22key%22:%22contenttype_id%22,%22selector%22:%22contentType.id%22,%22constraint%22:%22Webmozart\\\\Expression\\\\Constraint\\\\Equals%22,%22type%22:%22select%22,%22value%22:%226%22,%22children%22:[]},{%22id%22:1591338488735,%22key%22:%22status%22,%22selector%22:%22active%22,%22constraint%22:%22Webmozart\\\\Expression\\\\Constraint\\\\Equals%22,%22type%22:%22select%22,%22value%22:%221%22,%22children%22:[]}]}]';

    return this.httpService.get<BeekseBergenApiResponse>(url)
      .toPromise()
      .then(value => {
        return this.transferService.transferRestaurantsToPois(value.data.results);
      })
      .catch((exception) => {
        Sentry.captureException(exception);
        console.error(exception);
        throw new InternalServerErrorException(exception);
      });
  }
}
