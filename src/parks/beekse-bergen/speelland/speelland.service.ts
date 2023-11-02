import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ThemeParkService } from '../../../_services/themepark/theme-park.service';
import { BeekseBergenTransferService } from '../beekse-bergen-transfer/beekse-bergen-transfer.service';
import { ConfigService } from '@nestjs/config';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { Poi } from '../../../_interfaces/poi.interface';
import * as Sentry from '@sentry/node';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SpeellandService extends ThemeParkService {
  private readonly apiUrl;

  constructor(private readonly httpService: HttpService,
              private readonly transferService: BeekseBergenTransferService,
              private readonly configService: ConfigService) {
    super();

    this.apiUrl = this.configService.get('BEEKSE_BERGEN_API_URL');
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
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: false,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: false,
      supportsRideWaitTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsRides: true,
      supportsShopOpeningTimes: false,
      supportsShops: false,
      supportsShowTimes: false,
      supportsShows: false,
      supportsTranslations: false,
      supportsHalloween: false,
    }
  }

  async getPois(): Promise<Poi[]> {
    return this.getRides();
  }

  async getRides(): Promise<Poi[]> {
    const url = this.apiUrl + '/contents?order_by=createdAt&direction=ASC&page=1&limit=999999&expr=[{%22id%22:1519725856634,%22key%22:%22contenttype_id%22,%22selector%22:%22contentType.id%22,%22constraint%22:%22Webmozart\\\\Expression\\\\Constraint\\\\Equals%22,%22type%22:%22select%22,%22value%22:%225%22,%22children%22:[]}]';

    return this.httpService.get<BeekseBergenApiResponse>(url)
      .toPromise()
      .then(value => {
        return this.transferService.transferRidesToPois(value.data.results);
      })
      .catch((exception) => {
        Sentry.captureException(exception);
        console.error(exception);
        throw new InternalServerErrorException(exception);
      });
  }
}
