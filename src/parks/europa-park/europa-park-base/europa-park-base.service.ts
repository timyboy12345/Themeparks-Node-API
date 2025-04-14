import { Inject, Injectable, InternalServerErrorException, NotImplementedException } from '@nestjs/common';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { ThroughPoisThemeParkService } from '../../../_services/themepark/through-pois-theme-park.service';
import { Poi, PoiStatus } from '../../../_interfaces/poi.interface';
import { HttpService } from '@nestjs/axios';
import { EuropaParkTransferService } from '../europa-park-transfer/europa-park-transfer.service';
import * as Sentry from '@sentry/node';
import * as moment from 'moment';
import { ThemeParkOpeningTimes } from '../../../_interfaces/park-openingtimes.interface';
import { LocaleService } from '../../../_services/locale/locale.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EuropaParkBaseService extends ThroughPoisThemeParkService {
  private readonly _clientId: string;
  private readonly _clientSecret: string;

  constructor(private readonly http: HttpService,
              private readonly transfer: EuropaParkTransferService,
              private readonly localeService: LocaleService,
              private readonly config: ConfigService,
              @Inject(CACHE_MANAGER) private readonly cache: Cache) {
    super();

    this._clientId = config.get('EUROPA_PARK_CLIENT_ID');
    this._clientSecret = config.get('EUROPA_PARK_CLIENT_SECRET');
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
      supportsRideWaitTimesHistory: true,
      supportsRides: true,
      supportsShopOpeningTimes: false,
      supportsShops: true,
      supportsShowTimes: false,
      supportsShows: true,
      supportsTranslations: false,
      textType: 'HTML',
    };
  }

  public getParkName(): string {
    throw new NotImplementedException('getParkName is not defined');
  }

  private async getToken(): Promise<string> {
    const body = `client_id=${this._clientId}&client_secret=${this._clientSecret}&grant_type=client_credentials`;

    return await this.http.post('https://account.mackone.de/token-srv/token', body)
      .toPromise()
      .then((res) => {
        return res.data.access_token;
      })
      .catch((e) => {
        Sentry.captureException(e);
        console.error(e);
      });
  }

  private async request<T>(url: string, locale: string): Promise<any> {
    const token = await this.getToken();

    return await this.http.get<T>(url, {
      params: {
        'status[]': 'live',
      },
      headers: {
        'JWTAuthorization': 'Bearer ' + token,
        'Accept-Language': locale,
      },
    })
      .toPromise()
      .then((r) => r.data)
      .catch((e) => {
        console.error(e);
        Sentry.captureException(e);
        throw new InternalServerErrorException('Could not fetch EuropaPark data');
      });
  }

  async getPois(): Promise<Poi[]> {
    let locale = 'en';
    switch (this.localeService.getLocale()) {
      case 'nl':
        locale = 'nl';
        break;
      case 'de':
        locale = 'de';
        break;
      case 'fr':
        locale = 'fr';
        break;
      default:
        break;
    }

    const k = `europapark_pois_${locale}`;

    let pois: any[] = await this.cache.get(k);

    if (pois === undefined) {
      const data = await this.request('https://tickets.mackinternational.de/api/v2/poi-group', locale);
      pois = this.transfer.transferDataObjectToPois(data, this.getParkName());

      // Save POI data for 24 hours, as this requests takes incredibly long
      await this.cache.set(k, pois, 1000 * 60 * 60 * 24);
    }

    // TODO: Are show times also included in this request?
    const waitTimesResponse = await this.request('https://tickets.mackinternational.de/api/v1/waitingtimes', locale);
    const waitTimes = waitTimesResponse.waitingtimes;

    pois.map((poi) => {
      const code = poi.original.code;

      if (code === undefined) return poi;

      const wt = waitTimes.find((wt) => wt.code == code);

      // console.log(code);
      // console.log(wt);

      if (wt) {
        let time = undefined;
        let status: PoiStatus;

        switch (wt.time) {
          case 999:
            status = PoiStatus.DOWN;
            break;
          case 777:
            status = PoiStatus.UNDEFINED;
            break;
          case 333:
          case 222:
            status = PoiStatus.CLOSED;
            break;
          case 1:
            status = PoiStatus.OPEN;
            time = 0;
            break;
          default:
            time = wt.time;
            status = PoiStatus.OPEN;
            break;
        }

        // console.log(` - Time: ${time} / ${status}`);
        poi.currentWaitTime = time;
        poi.state = status;
      }

      return poi;
    });

    return pois;
  }

  async getOpeningTimes(): Promise<ThemeParkOpeningTimes[]> {
    const data = await this.request<any>(`https://tickets.mackinternational.de/api/v1/opentime/${this.getParkName()}/de`, 'de');
    const times = data.opentime;

    const dates = [];

    if (times.today && times.today.start) {
      dates.push({
        date: moment().format(),
        openingTimes: [{
          open: times.today.start,
          close: times.today.end,
          openTime: moment(times.today.start).format('HH:mm:ss'),
          closeTime: moment(times.today.end).format('HH:mm:ss'),
        }],
      });
    }

    if (times.tomorrow && times.tomorrow.start) {
      dates.push({
        date: moment().add(1, 'day').format(),
        openingTimes: [{
          open: times.tomorrow.start,
          close: times.tomorrow.end,
          openTime: moment(times.tomorrow.start).format('HH:mm:ss'),
          closeTime: moment(times.tomorrow.end).format('HH:mm:ss'),
        }],
      });
    }

    if (times.next && times.next.start) {
      dates.push({
        date: moment(times.next.date).format(),
        openingTimes: [{
          open: times.next.start,
          close: times.next.end,
          openTime: moment(times.next.start).format('HH:mm:ss'),
          closeTime: moment(times.next.end).format('HH:mm:ss'),
        }],
      });
    }

    return dates;
  }
}
