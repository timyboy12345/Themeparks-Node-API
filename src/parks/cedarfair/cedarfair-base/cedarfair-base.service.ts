import { Injectable, InternalServerErrorException, NotImplementedException } from '@nestjs/common';
import { Poi } from '../../../_interfaces/poi.interface';
import { ConfigService } from '@nestjs/config';
import { CedarfairBaseResponseInterface } from '../interfaces/cedarfair-base-response.interface';
import { CedarfairTransferService } from '../cedarfair-transfer/cedarfair-transfer.service';
import { ThroughPoisThemeParkService } from '../../../_services/themepark/through-pois-theme-park.service';
import * as Sentry from '@sentry/node';
import * as moment from 'moment-timezone';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { HttpService } from '@nestjs/axios';
import { ThemeParkOpeningTimes } from '../../../_interfaces/park-openingtimes.interface';

@Injectable()
export class CedarfairBaseService extends ThroughPoisThemeParkService {
  private company: string;

  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService,
              private readonly transferService: CedarfairTransferService) {
    super();
  }

  protected getParkId(): string {
    throw new NotImplementedException();
  }

  async getPois(): Promise<Poi[]> {
    return this.getData<CedarfairBaseResponseInterface[]>('poi')
      .then(data => this.transferService.transferPoisToPois(data));
  }

  private async getData<T>(slug: string): Promise<T> {
    const id = this.getParkId();
    const baseUrl = this.configService.get('CEDAR_FAIR_API_URL');
    const url = `${baseUrl}/${slug}/park/${id}`;

    const headers = {
      'User-Agent': 'Cedar Point/8.3.1 (com.accesso.CedarPoint; build:170; iOS 17.5.1) Alamofire/5.9.0',
      'Accept-Language': 'en-US',
    };

    return this.httpService.get<T>(url, { headers: headers })
      .toPromise()
      .then(value => value.data)
      .catch(reason => {
        console.error(reason);
        Sentry.captureException(reason);
        throw new InternalServerErrorException();
      });
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
      supportsShops: true,
      supportsShowTimes: false,
      supportsShows: true,
      supportsTranslations: false,
      textType: 'UNDEFINED',
    };
  }

  public setCompany(company: string): void {
    this.company = company;
  }

  // TODO: This URL also fetches show times
  public async getOpeningTimes(): Promise<ThemeParkOpeningTimes[]> {
    const data = await this.getData<any>('operating-hours');

    const operatingHours: ThemeParkOpeningTimes[] = [];

    if (data.operatings && data.operatings.length > 0) {
      data.operatings.forEach((o) => {
        const date: ThemeParkOpeningTimes = {
          date: moment().format(),
          openingTimes: [],
        };

        o.items.forEach((frame) => {
          date.openingTimes.push({
            open: moment(frame.timeFrom, 'HH:mm').tz(this.getInfo().timezone, true).format(),
            close: moment(frame.timeTo, 'HH:mm').tz(this.getInfo().timezone, true).format(),
            openTime: frame.timeFrom,
            closeTime: frame.timeTo,
          })
        })

        operatingHours.push(date);
      });
    }

    return operatingHours;
  }
}
