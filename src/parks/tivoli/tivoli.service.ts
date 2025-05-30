import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/node';
import { Poi } from '../../_interfaces/poi.interface';
import { ThroughPoisThemeParkService } from '../../_services/themepark/through-pois-theme-park.service';
import { TivoliTransferService } from './tivoli-transfer/tivoli-transfer.service';
import { TivoliDataResponseInterface } from './interfaces/tivoli-data-response.interface';
import { HttpService } from '@nestjs/axios';
import { ThemeParkOpeningTimes } from '../../_interfaces/park-openingtimes.interface';
import { LocaleService } from '../../_services/locale/locale.service';

@Injectable()
export class TivoliService extends ThroughPoisThemeParkService {
  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService,
              private readonly transferService: TivoliTransferService,
              private readonly localeService: LocaleService) {
    super();
  }

  getInfo(): ThemePark {
    return {
      id: 'tivoli',
      parkType: ParkType.THEMEPARK,
      name: 'Tivoli',
      description: 'Tivoli is een attractiepark in het centrum van Kopenhagen en is gelegen naast het Københavns Hovedbanegård en vlak bij Rådhuspladsen. Het park geniet grote bekendheid binnen en buiten Denemarken.',
      countryCode: 'dk',
      image: 'https://www.visitdenmark.nl/sites/visitdenmark.com/files/2019-03/Tivoli_Photo_Martin%20Heiberg_Copenhagen%20Media%20Center.jpg',
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
      supportsEvents: false,
      supportsOpeningTimes: true,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: true,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsRides: true,
      supportsShopOpeningTimes: false,
      supportsShops: false,
      supportsShowTimes: false,
      supportsShows: true,
      supportsTranslations: false,
      textType: "UNDEFINED",
    };
  }

  async getPois(): Promise<Poi[]> {
    const data = await this.getData();

    return this.transferService.transferDataObjectToPois(data);
  }

  async getOpeningTimes(): Promise<ThemeParkOpeningTimes[]> {
    return this.getData().then((data) => this.transferService.transferOpeningTimesToOpeningTimes(data.openingHours.Data));
  }

  // TODO: Implement wait times once park is open
  private getData(): Promise<TivoliDataResponseInterface> {
    const baseUrl = this.configService.get('TIVOLI_API_URL');
    const language = this.localeService.getLocale() === 'da' ? 'da' : 'en';

    const url = `${baseUrl}/AppShop/AppData/GetData?devicetype=ios&appversion=5.5.5(706)&deviceid=3B79ADF2-4EEC-4614-B86C-EE7F52C93193&language=${language}`;

    return this.httpService.get<TivoliDataResponseInterface>(url)
      .toPromise()
      .then((value) => {
        if (value.data.error) {
          Sentry.captureException(value);
          console.error('Tivoli server is down');
          throw new InternalServerErrorException(value.data);
        }

        return value.data;
      })
      .catch((exception) => {
        Sentry.captureException(exception);
        console.error(exception);
        throw new InternalServerErrorException(exception);
      });
  }
}
