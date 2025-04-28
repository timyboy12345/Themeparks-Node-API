import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { AlternativeQueue, Poi, PoiStatus } from '../../_interfaces/poi.interface';
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
import { HttpService } from '@nestjs/axios';

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
      image: 'https://www.efteling.com/nl/-/media/images/social-open-graph/1200x628-roodkapje-bij-de-entree.jpg',
      countryCode: 'nl',
      parkType: ParkType.THEMEPARK,
      timezone: 'Europe/Amsterdam',
      location: {
        lat: 51.64990915659694,
        lng: 5.043561458587647,
      },
    };
  }

  // TODO: Fix locales
  public getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
      supportsEvents: false,
      supportsOpeningTimes: true,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: true,
      supportsPois: true,
      supportsRestaurantOpeningTimes: true,
      supportsRestaurants: true,
      supportsRideWaitTimes: true,
      supportsRideWaitTimesHistory: true,
      supportsRides: true,
      supportsShopOpeningTimes: true,
      supportsShops: true,
      supportsShowTimes: true,
      supportsShows: true,
      supportsTranslations: false,
      textType: 'UNDEFINED',
    };
  }

  // TODO: Fix time zone, as no time zone is currently used
  public getPois(): Promise<Poi[]> {
    return this.request().then(poisResponse => {
      const pois = poisResponse.data.hits.hit.map(pois => this.eftelingTransferService.transferPoiToPoi(pois));

      return this.getWaitTimes().then(waitTimes => {
        // console.log(waitTimes);

        return pois.map((poi) => {
          const attractionInfo = waitTimes.AttractionInfo.find((p) => p.Id === poi.id);

          if (attractionInfo) {
            if (attractionInfo.State !== undefined) {
              switch (attractionInfo.State) {
                case 'Geopend':
                case 'open':
                  poi.state = PoiStatus.OPEN;
                  break;
                case '':
                  poi.state = PoiStatus.CLOSED;
                  break;
                case 'Gesloten':
                case 'gesloten':
                case 'nognietopen':
                  poi.state = PoiStatus.CLOSED;
                  break;
                case 'storing':
                  poi.state = PoiStatus.DOWN;
                  break;
                case 'inonderhoud':
                  poi.state = PoiStatus.MAINTENANCE;
                  break;
              }
            }

            if (attractionInfo.WaitingTime) {
              poi.currentWaitTime = parseInt(attractionInfo.WaitingTime);
            }

            if (attractionInfo.VirtualQueue) {
              const data: any[] = JSON.parse(attractionInfo.VirtualQueue.Geofences);

              const q: AlternativeQueue = {
                id: 'virtual_queue',
                type: 'VIRTUAL_QUEUE',
                original_state: attractionInfo.VirtualQueue.State,
                geofences: data ? data.map((d) => {
                  return {
                    name: d.desc,
                    lat: d.latitude,
                    lng: d.longitude,
                    radius: d.radius,
                  };
                }) : [],
              };

              if (attractionInfo.VirtualQueue.State === 'full') {
                q.state = 'FULL';
              } else if (attractionInfo.VirtualQueue.State === 'enabled') {
                const start = moment().add(attractionInfo.VirtualQueue.WaitingTime, 'minutes');
                q.state = 'OPEN';
                q.window_start = start.format();
                q.window_end = start.add(15, 'minutes').format();
              } else if (attractionInfo.VirtualQueue.State === 'walkin') {
                q.state = 'NOT_IN_USE';
              }

              poi.alternativeQueues.push(q);
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
        });
      });
    });
  }

  private request() {
    let url = this._eftelingApiURl + '/app/poi/';

    // switch (this.localeService.getLocale()) {
    //   case 'nl':
    //     break;
    //   case 'de':
    //     url = url.replace('language \'nl\'', 'language \'de\'');
    //     break;
    //   case 'fr':
    //     url = url.replace('language \'nl\'', 'language \'fr\'');
    //     break;
    //   default:
    //     url = url.replace('language \'nl\'', 'language \'en\'');
    //     break;
    // }

    return this.httpService
      .get<EftelingPoisResponse>(url)
      .toPromise()
      .then(value => {
        return value;
      })
      .catch((exception) => {
        Sentry.captureException(exception);
        console.error(exception);
        throw new InternalServerErrorException(exception);
      });
  }

  private getWaitTimes() {
    return this.httpService
      .get<EftelingOpeningTimesResponse>(this._eftelingApiURl + '/app/wis/')
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

  async getOpeningTimes(): Promise<ThemeParkOpeningTimes[]> {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;

    return this.httpService
      .get<EftelingOpeningTimesResponse>(`https://www.efteling.com/service/cached/getpoiinfo/nl/${year}/${month}`)
      .toPromise()
      .then(value => {
        return this.eftelingTransferService.transferOpeningTimesToOpeningTimes(value.data);
      })
      .catch((exception) => {
        Sentry.captureException(exception);
        console.error(exception);
        throw new InternalServerErrorException(exception);
      });
  }
}
