import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import * as Sentry from '@sentry/node';
import { Poi, PoiStatus } from '../../_interfaces/poi.interface';
import { FuturoscopeTransferService } from './futuroscope-transfer/futuroscope-transfer.service';
import { FuturoscopePoisResponseInterface } from './interfaces/futuroscope-pois-response.interface';
import { ThroughPoisThemeParkService } from '../../_services/themepark/through-pois-theme-park.service';

@Injectable()
export class FuturoscopeService extends ThroughPoisThemeParkService {
  private readonly apiUrl: string = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly http: HttpService,
    private readonly transferService: FuturoscopeTransferService,
  ) {
    super();

    this.apiUrl = this.configService.get('FUTUROSCOPE_API_URL');
  }

  getInfo(): ThemePark {
    return {
      countryCode: 'fr',
      description: 'Futuroscope is een Frans attractiepark dat is opgebouwd rond de thema\'s multimedia, cinematografie en futuristische audio-visuele technieken. Het ligt tien kilometer ten noorden van de stad Poitiers, op het gebied van de gemeenten Chasseneuil-du-Poitou en Jaunay-Marigny, en is gesticht door René Monory.',
      id: 'futuroscope',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Le_parc_du_futuroscope.JPG/1280px-Le_parc_du_futuroscope.JPG',
      location: { lat: 46.669627, lng: 0.368478 },
      name: 'Futuroscope',
      parkType: ParkType.THEMEPARK,
      timezone: 'Europe/Paris',
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: true,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: true,
      supportsRideWaitTimesHistory: false,
      supportsRides: true,
      supportsShopOpeningTimes: false,
      supportsShops: true,
      supportsShowTimes: false,
      supportsShows: true,
      supportsTranslations: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    const token = await this.getToken();
    const data = await this.getData(token);

    try {
      const waitTimes: any[] = await this.getWaitTimes(token);

      data.forEach((poi) => {
        const p = waitTimes.find((r) => r.id === poi.id);
        if (p) {
          if (p.infos.style === 4) {
            poi.state = PoiStatus.DOWN;
          }
          if (p.infos.style === 3) {
            poi.state = PoiStatus.OPENS_LATER_TODAY;
          } else {
            poi.currentWaitTime = p.minutes_left;
          }
        }
      });
    } catch (exception) {
      console.error('Fetching Futuroscope wait times failed, continuing anyway')
      console.error(exception);
    }

    return data;
  }

  private async getToken(): Promise<string> {
    let r = (Math.random() + 1).toString(36).substring(7);
    const url = `${this.apiUrl}/api/sessions/create/${r}`;

    return await this.http.post(url, {
      'session': {
        'language': 'nl-NL',
        'os_name': 'iOS',
        'uid': 'BFA9F90A-103E-4FA3-BDA7-9E4ED59DEEC7',
        'device_name': 'iPhone',
        'app_version': '3.7.13',
        'push_token': 'token-pour-les-push-notifications',
        'device_version': '16.3.1',
      },
    })
      .toPromise()
      .then((result) => result.data.token)
      .catch((exception) => {
        Sentry.captureException(exception);
        console.error(exception);
        throw new InternalServerErrorException(exception);
      });
  }

  private async getData(usedToken?: string): Promise<Poi[]> {
    const token = usedToken ?? await this.getToken();
    const url = `${this.apiUrl}/api/poi`;

    return this.http.get<FuturoscopePoisResponseInterface | string>(url, {
      headers: {
        token: token,
        Host: 'www.futuroscope.com',
        'Accept-Language': 'nl-NL;q=1.0, en-NL;q=0.9',
        Accept: 'application/json',
        Connection: 'keep-alive',
        'User-Agent': 'Futuroscope/3.7.13 (com.futuroscope.com.Futuroscope; build:26; iOS 16.3.1) Alamofire/4.4.0',
      },

    })
      .toPromise()
      .then((data) => {
        if (typeof data.data === 'string' && data.data.includes('HTTP/1.0 403 Forbidden')) {
          Sentry.captureException(data.data);
          console.error(data.data);
          throw new InternalServerErrorException(data.data);
        }

        // @ts-ignore
        return this.transferService.transferPoisToPois(data.data.poi);
      })
      .catch((exception) => {
        Sentry.captureException(exception);
        console.error(exception);
        throw new InternalServerErrorException(exception);
      });
  }

  private async getWaitTimes(usedToken): Promise<any[]> {
    const token = usedToken ?? await this.getToken();
    const url = `${this.apiUrl}/api/poi/get-realtime-datas`;

    // @ts-ignore
    return this.http.get<any[] | string>(url, {
      headers: {
        token: token,
        Host: 'www.futuroscope.com',
        'Accept-Language': 'nl-NL;q=1.0, en-NL;q=0.9',
        Accept: 'application/json',
        Connection: 'keep-alive',
        'User-Agent': 'Futuroscope/3.7.13 (com.futuroscope.com.Futuroscope; build:26; iOS 16.3.1) Alamofire/4.4.0',
      },

    })
      .toPromise()
      .then((data) => {
        if (typeof data.data === 'string' && data.data.includes('HTTP/1.0 403 Forbidden')) {
          Sentry.captureException(data.data);
          console.error(data.data);
          throw new InternalServerErrorException(data.data);
        }

        return data.data;
      })
      .catch((exception) => {
        Sentry.captureException(exception);
        console.error(exception);
        throw new InternalServerErrorException(exception);
      });
  }
}
