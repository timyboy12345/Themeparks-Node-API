import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ThemeParkService } from '../_services/themepark/theme-park.service';
import { ThemePark } from '../_interfaces/park.interface';
import { Poi } from '../_interfaces/poi.interface';
import { EftelingPoisResponse } from './interfaces/efteling-pois-response.interface';
import { PoiCategory } from '../_interfaces/poi-categories.enum';
import { ThemeParkSupports } from '../_interfaces/park-supports.interface';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/node';
import { EftelingTransferService } from './efteling-transfer/efteling-transfer.service';

@Injectable()
export class EftelingService extends ThemeParkService {
  private _eftelingApiURl: string;

  public constructor(private httpService: HttpService,
                     private readonly configService: ConfigService,
                     private readonly eftelingTransferService: EftelingTransferService) {
    super();

    this._eftelingApiURl = this.configService.get<string>('EFTELING_API_URL');
  }

  getInfo(): ThemePark {
    return {
      id: 'efteling',
      name: 'Efteling',
      description: 'De Efteling is een attractiepark en recreatiecomplex in Kaatsheuvel, een dorp in de Nederlandse provincie Noord-Brabant. Naast het attractiepark omvat de hele Wereld van de Efteling een theater, twee hotels, twee vakantieparken en een golfpark.',
      image: 'https://traveltrade.visitbrabant.com/uploads/cache/medium/uploads/media/5cac5f21d23d9/kopfoto-pardoes-en-pardijn-hartenhof-npf2017-5760x3840px-z-nr-16193.jpg',
      countryCode: 'nl',
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: false,
      supportsRides: true,
      supportsShowTimes: false,
      supportsShows: false,
      supportsPoiLocations: true,
    };
  }

  getPois(): Promise<Poi[]> {
    return this.request().then(value => {
      return value.data.hits.hit.map<Poi>((eftelingPoi) => {
        return this.eftelingTransferService.EftelingPoiToPoi(eftelingPoi);
      });
    })
  }

  async getRides(): Promise<Poi[]> {
    return this.getPois().then((pois) => {
      return pois.filter(poi => poi.category == PoiCategory.ATTRACTION);
    });
  }

  async getRestaurants(): Promise<Poi[]> {
    return this.getPois().then((pois) => {
      return pois.filter(poi => poi.category == PoiCategory.RESTAURANT);
    });
  }

  request() {
    return this.httpService
      .get<EftelingPoisResponse>(this._eftelingApiURl)
      .toPromise()
      .then(value => {
        return value;
      })
      .catch(e => {
        Sentry.captureException(e);
        throw new InternalServerErrorException(e);
      });
  }
}
