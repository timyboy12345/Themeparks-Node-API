import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/node';
import { Poi } from '../../_interfaces/poi.interface';
import { ThroughPoisThemeParkService } from '../../_services/themepark/through-pois-theme-park.service';
import { TivoliTransferService } from './tivoli-transfer/tivoli-transfer.service';
import { TivoliDataResponseInterface } from './interfaces/tivoli-data-response.interface';

@Injectable()
export class TivoliService extends ThroughPoisThemeParkService {
  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService,
              private readonly transferService: TivoliTransferService) {
    super();
  }

  getInfo(): ThemePark {
    return {
      id: 'tivoli',
      parkType: ParkType.THEMEPARK,
      name: 'Tivoli',
      description: 'Tivoli is een attractiepark in het centrum van Kopenhagen en is gelegen naast het Københavns Hovedbanegård en vlak bij Rådhuspladsen. Het park geniet grote bekendheid binnen en buiten Denemarken.',
      countryCode: 'dk',
      image: 'https://img.itinari.com/activity/images/original/827537bb-e1fa-4335-a647-739ff7acebd9-istock-458432813.jpg?ch=DPR&dpr=1&w=1200&h=800&s=53d46ec4ff38ef956795ecc46d5c95c7',
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsRideWaitTimesHistory: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsRideWaitTimes: false,
      supportsRestaurants: true,
      supportsShows: true,
      supportsRides: true,
      supportsShops: false,
      supportsShopOpeningTimes: false,
      supportsPoiLocations: true,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsShowTimes: false,
      supportsAnimals: false,
      supportsTranslations: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    const data = await this.getData();

    return this.transferService.transferDataObjectToPois(data);
  }

  private getData(): Promise<TivoliDataResponseInterface> {
    const baseUrl = this.configService.get('TIVOLI_API_URL');
    const url = `${baseUrl}/AppShop/AppData/GetData?devicetype=ios&appversion=5.5.5(706)&deviceid=3B79ADF2-4EEC-4614-B86C-EE7F52C93193&language=en`;

    return this.httpService.get<TivoliDataResponseInterface>(url)
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
