import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ParkType, ThemePark } from '../_interfaces/park.interface';
import { Poi } from '../_interfaces/poi.interface';
import { EftelingPoisResponse } from './interfaces/efteling-pois-response.interface';
import { ThemeParkSupports } from '../_interfaces/park-supports.interface';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/node';
import { EftelingTransferService } from './efteling-transfer/efteling-transfer.service';
import { ThroughPoisThemeParkService } from '../_services/themepark/through-pois-theme-park.service';
import { EftelingOpeningTimesResponse } from './interfaces/efteling-openingstimes-response.interface';
import * as moment from 'moment';

@Injectable()
export class EftelingService extends ThroughPoisThemeParkService {
  private _eftelingApiURl: string;

  public constructor(private httpService: HttpService,
                     private readonly configService: ConfigService,
                     private readonly eftelingTransferService: EftelingTransferService) {
    super();

    this._eftelingApiURl = this.configService.get<string>('EFTELING_API_URL');
  }

  public getInfo(): ThemePark {
    return {
      id: 'efteling',
      name: 'Efteling',
      description: 'De Efteling is een attractiepark en recreatiecomplex in Kaatsheuvel, een dorp in de Nederlandse provincie Noord-Brabant. Naast het attractiepark omvat de hele Wereld van de Efteling een theater, twee hotels, twee vakantieparken en een golfpark.',
      image: 'https://traveltrade.visitbrabant.com/uploads/cache/medium/uploads/media/5cac5f21d23d9/kopfoto-pardoes-en-pardijn-hartenhof-npf2017-5760x3840px-z-nr-16193.jpg',
      countryCode: 'nl',
      parkType: ParkType.THEMEPARK,
    };
  }

  public getSupports(): ThemeParkSupports {
    return {
      supportsPois: true,
      supportsRestaurantOpeningTimes: true,
      supportsRestaurants: true,
      supportsRideWaitTimes: true,
      supportsRides: true,
      supportsShowTimes: false,
      supportsShows: true,
      supportsPoiLocations: true,
      supportsShops: true,
      supportsShopOpeningTimes: true,
    };
  }

  public getPois(): Promise<Poi[]> {
    return this.request().then(poisResponse => {
      const pois = poisResponse.data.hits.hit.map(pois => this.eftelingTransferService.transferPoiToPoi(pois));

      return this.getWaitTimes().then(waitTimes => {
        waitTimes.data.AttractionInfo.forEach(attractionInfo => {
          const poi = pois.find(p => p.id.replace('-nl', '') === attractionInfo.Id);

          if (poi) {
            if (attractionInfo.WaitingTime) {
              poi.currentWaitTime = parseInt(attractionInfo.WaitingTime);
            }

            if (attractionInfo.OpeningTimes && attractionInfo.OpeningTimes.length > 0) {
              poi.openingTimes = attractionInfo.OpeningTimes.map(ot => {
                return {
                  comments: ot.Description,
                  date: moment().format('YYYY-MM-DD'),
                  open: moment(ot.HourFrom).format(),
                  close: moment(ot.HourTo).format(),
                  openTime: moment(ot.HourFrom).format('HH:mm:ss'),
                  closeTime: moment(ot.HourTo).format('HH:mm:ss'),
                  isPassed: moment(ot.HourFrom).isAfter(),
                };
              });
            }

            if (attractionInfo.ShowTimes && attractionInfo.ShowTimes.length > 0) {
              poi.showTimes = this.eftelingTransferService.transferShowTimesToShowTimes(attractionInfo);
            }
          }
        });

        return pois;
      });
    });
  }

  private request() {
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

  private getWaitTimes() {
    return this.httpService
      .get<EftelingOpeningTimesResponse>('https://api.efteling.com/app/wis/')
      .toPromise()
      .then(value => {
        return value;
      });
  }
}
