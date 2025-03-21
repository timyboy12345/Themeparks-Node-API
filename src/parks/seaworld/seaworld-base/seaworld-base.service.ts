import { Injectable, InternalServerErrorException, NotImplementedException } from '@nestjs/common';
import { ThroughPoisThemeParkService } from '../../../_services/themepark/through-pois-theme-park.service';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { ConfigService } from '@nestjs/config';
import { Poi } from '../../../_interfaces/poi.interface';
import { HttpService } from '@nestjs/axios';
import { SeaworldTransferService } from '../seaworld-transfer/seaworld-transfer.service';
import * as moment from 'moment';
import { SeaworldWaitTimesInterface } from '../interfaces/seaworld-wait-times.interface';
import * as Sentry from '@sentry/node';

@Injectable()
export class SeaworldBaseService extends ThroughPoisThemeParkService {
  private _apiUrl: string;

  constructor(config: ConfigService, private readonly http: HttpService, private readonly transfer: SeaworldTransferService) {
    super();

    this._apiUrl = config.get('SEAWORLD_API_URL');
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: true,
      supportsEvents: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: true,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsRides: true,
      supportsShopOpeningTimes: false,
      supportsShops: true,
      supportsShowTimes: false,
      supportsShows: true,
      supportsTranslations: false,
      textType: "UNDEFINED",
    };
  }

  getParkId(): string {
    throw new NotImplementedException('Seaworld Park ID not set');
  }

  async getPois(): Promise<Poi[]> {
    const rides = await this.http.get(`${this._apiUrl}/park/${this.getParkId()}/poi`, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'SeaWorld/330 CFNetwork/1496.0.7 Darwin/23.5.0',
        'app_version': 'ios-7.1.222.330',
        'Accept': 'application/json',
        'Host': 'public.api.seaworld.com',
        'Authorization': 'Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..eFtqROn6cku64r7wfLzAOQ.NRsZK3WaMjVPBGH2ndJvMjRa-uM3lRHV5BUSuJPxmFgrEtNRr4kqq0vw5oS3-JuXf3Yq4z-NDcylpt9ykcBeXrittDox0edVGZhWeXD5fN56RD9XGj9yePZq37cQy2iINh-nftpoB2O9u1QdenLwxaC_nXCPad9b5CBIUyljauuAJSuYr8-ctv6-EpebUhnSqrMvgnYdKGqK10efI08hz2ZQVOKVvZ86XBhdAoyknBh2QafI5rMMF69w5GNMup8SB0mjs4FhMv7DoI4lsNXjxSmGFjceUUva_qJ6Ke1BEgo.h7eyGsE0GPuNVdc1QzWGPg'
      }
    })
      .toPromise()
      .then((res) => this.transfer.transferPoisToPois(res.data))
      .catch((reason) => {
        Sentry.captureException(reason);
        // console.error(reason);
        throw new InternalServerErrorException("Error fetching SeaWorld Inc data");
      });

    const waitTimes = await this.getWaitTimes();
    return rides.map((r) => {
      const wait = waitTimes.WaitTimes.find((w) => w.Id == r.original.Id);

      if (wait) {
        r.currentWaitTime = wait.Minutes;
      }

      return r;
    })
  }

  async getWaitTimes(): Promise<SeaworldWaitTimesInterface> {
    const date = moment().format('YYYY-MM-DD');

    return this.http.get<SeaworldWaitTimesInterface>(`${this._apiUrl}/park/${this.getParkId()}/availability?searchDate=${date}`)
      .toPromise()
      .then((res) => res.data);
  }
}
