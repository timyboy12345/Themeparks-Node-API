import { Injectable, InternalServerErrorException, NotImplementedException } from '@nestjs/common';
import { Poi } from '../../../_interfaces/poi.interface';
import { encode } from 'js-base64';
import { ConfigService } from '@nestjs/config';
import { CedarfairBaseResponseInterface } from '../interfaces/cedarfair-base-response.interface';
import { CedarfairTransferService } from '../cedarfair-transfer/cedarfair-transfer.service';
import { ThroughPoisThemeParkService } from '../../../_services/themepark/through-pois-theme-park.service';
import * as Sentry from '@sentry/node';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { HttpService } from '@nestjs/axios';

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
    return this.getData()
      .then(data => this.transferService.transferPoisToPois(data));
  }

  private async getData(): Promise<CedarfairBaseResponseInterface[]> {
    const id = this.getParkId();
    const baseUrl = this.configService.get('CEDAR_FAIR_API_URL');
    const url = `${baseUrl}/venue/${id}/poi/all`;

    const secretToken = this.configService.get('CEDAR_FAIR_API_TOKEN');
    const token = encode(secretToken);

    const headers = {
      'Authorization': `Basic ${token}`,
    };

    return this.httpService.get<CedarfairBaseResponseInterface[]>(url, { headers: headers })
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
      supportsShowTimes: false,
      supportsRestaurantOpeningTimes: false,
      supportsPois: true,
      supportsPoiLocations: true,
      supportsShopOpeningTimes: false,
      supportsShops: true,
      supportsRides: true,
      supportsShows: true,
      supportsRestaurants: true,
      supportsRideWaitTimes: false,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsTranslations: false,
supportsHalloween: false,
    };
  }

  public setCompany(company: string): void {
    this.company = company;
  }
}
