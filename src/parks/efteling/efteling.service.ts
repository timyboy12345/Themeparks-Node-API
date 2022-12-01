import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { Poi, PoiStatus } from '../../_interfaces/poi.interface';
import { EftelingPoisResponse } from './interfaces/efteling-pois-response.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/node';
import { EftelingTransferService } from './efteling-transfer/efteling-transfer.service';
import { ThroughPoisThemeParkService } from '../../_services/themepark/through-pois-theme-park.service';
import { EftelingOpeningTimesResponse } from './interfaces/efteling-openingstimes-response.interface';
import * as moment from 'moment';
import { ThemeParkOpeningTimes } from '../../_interfaces/park-openingtimes.interface';
import { LocaleService } from '../../_services/locale/locale.service';

@Injectable()
export class EftelingService extends ThroughPoisThemeParkService {
  private _eftelingApiURl: string;

  public constructor(private httpService: HttpService,
                     private readonly configService: ConfigService,
                     private readonly eftelingTransferService: EftelingTransferService,
                     private readonly localeService: LocaleService) {
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
      parkType: ParkType.THEMEPARK,
      timezone: 'Europe/Amsterdam',
      location: {
        lat: 51.64990915659694,
        lng: 5.043561458587647
      }
    };
  }

  public getSupports(): ThemeParkSupports {
    return {
      supportsPois: true,
      supportsRestaurantOpeningTimes: true,
      supportsRestaurants: true,
      supportsRideWaitTimes: true,
      supportsRides: true,
      supportsShowTimes: true,
      supportsShows: true,
      supportsPoiLocations: true,
      supportsShops: true,
      supportsShopOpeningTimes: true,
      supportsOpeningTimes: false,
      supportsAnimals: false,
      supportsOpeningTimesHistory: false,
      supportsRideWaitTimesHistory: true,
      supportsTranslations: false,
    };
  }

  public getPois(): Promise<Poi[]> {
    return this.request().then(poisResponse => {
      const pois = poisResponse.data.hits.hit.map(pois => this.eftelingTransferService.transferPoiToPoi(pois));

      return this.getWaitTimes().then(waitTimes => {
        console.log(waitTimes);

        return pois.map((poi) => {
          const attractionInfo = waitTimes.AttractionInfo.find((p) => p.Id === poi.id);

          if (attractionInfo) {
            if (attractionInfo.State) {
              switch (attractionInfo.State) {
                case 'Geopend':
                case 'open':
                  poi.state = PoiStatus.OPEN;
                  break;
                case '':
                  poi.state = PoiStatus.CLOSED_TODAY;
                  break;
                case 'Gesloten':
                case 'nognietopen':
                  poi.state = PoiStatus.CLOSED;
                  break;
                case 'inonderhoud':
                  poi.state = PoiStatus.MAINTENANCE;
                  break;
              }
            }

            if (attractionInfo.WaitingTime) {
              poi.currentWaitTime = parseInt(attractionInfo.WaitingTime);
            }

            if (attractionInfo.OpeningTimes && attractionInfo.OpeningTimes.length > 0) {
              poi.openingTimes = attractionInfo.OpeningTimes.map(ot => {
                return {
                  comments: ot.Description,
                  date: moment().format('YYYY-MM-DD'),
                  open: moment.parseZone(ot.HourFrom).format(),
                  close: moment.parseZone(ot.HourTo).format(),
                  openTime: moment.parseZone(ot.HourFrom).format('HH:mm:ss'),
                  closeTime: moment.parseZone(ot.HourTo).format('HH:mm:ss'),
                  isPassed: moment.parseZone(ot.HourFrom).isAfter(),
                };
              });
            }

            if (attractionInfo.ShowTimes && attractionInfo.ShowTimes.length > 0) {
              poi.showTimes = this.eftelingTransferService.transferShowTimesToShowTimes(attractionInfo);
            }
          }

          return poi;
        })
      });
    });
  }

  private request() {
    let url = this._eftelingApiURl;

    switch (this.localeService.getLocale()) {
      case 'nl':
        break;
      case 'de':
        url = url.replace("language 'nl'", "language 'de'");
        break;
      case 'fr':
        url = url.replace("language 'nl'", "language 'fr'");
        break;
      default:
        url = url.replace("language 'nl'", "language 'en'");
        break;
    }

    return this.httpService
      .get<EftelingPoisResponse>(url)
      .toPromise()
      .then(value => {
        return value;
      })
      .catch(e => {
        Sentry.captureException(e);
        console.log(e);
        throw new InternalServerErrorException(e);
      });
  }

  private getWaitTimes() {
    return this.httpService
      .get<EftelingOpeningTimesResponse>('https://api.efteling.com/app/wis/')
      .toPromise()
      .then(value => {
        return value.data;
      })
      .catch(e => {
        Sentry.captureException(e);
        console.log(e);
        throw new InternalServerErrorException(e);
      });
  }

  async getOpeningTimes(): Promise<ThemeParkOpeningTimes[]> {
    const year = '2021';
    const month = '06';

    return this.httpService
      .get<EftelingOpeningTimesResponse>(`https://api.efteling.com/service/cached/getpoiinfo/nl/${year}/${month}`)
      .toPromise()
      .then(value => {
        return this.eftelingTransferService.transferOpeningTimesToOpeningTimes(value.data);
      })
      .catch(e => {
        Sentry.captureException(e);
        console.log(e);
        throw new InternalServerErrorException(e);
      });
  }
}
