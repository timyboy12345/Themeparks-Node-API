import { Injectable, InternalServerErrorException, NotImplementedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { Poi } from '../../../_interfaces/poi.interface';
import { UniversalTransferService } from '../universal-transfer/universal-transfer.service';
import { ConfigService } from '@nestjs/config';
import { ThroughPoisThemeParkService } from '../../../_services/themepark/through-pois-theme-park.service';
import * as Sentry from '@sentry/node';
import { AxiosError } from 'axios';

@Injectable()
export class UniversalBaseService extends ThroughPoisThemeParkService {
  private readonly _apiUrl: string;
  private readonly _apiKey: string;
  private readonly _apiSecret: string;

  constructor(private readonly http: HttpService, private readonly transfer: UniversalTransferService, private readonly config: ConfigService) {
    super();

    this._apiUrl = this.config.get('UNIVERSAL_API_URL');
    this._apiKey = this.config.get('UNIVERSAL_API_KEY');
    this._apiSecret = this.config.get('UNIVERSAL_API_SECRET');
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
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
      supportsShowTimes: true,
      supportsShows: true,
      supportsTranslations: false,
      textType: 'UNDEFINED',
    };
  }

  getCity(): string {
    throw new NotImplementedException('GetCity is not implemented');
  }

  getVenueId(): string {
    throw new NotImplementedException('GetVenueId is not implemented');
  }

  // TODO: Universal supports Wait Times, but only testable while not on blocklist
  async getPois(): Promise<Poi[]> {
    return this.http.get(`${this._apiUrl}/eventseries`, {
      params: {
        city: this.getCity(),
        pageSize: 'All',
      },
    })
      .toPromise()
      .then((res) => this.transfer.transferDataObjectToPois(res.data, this.getVenueId()))
      .catch((err: AxiosError) => {
        // Sentry.captureException(err.response);
        // throw new InternalServerErrorException(err.response);
        Sentry.captureException("Could not fetch Universal wait times")
        throw new InternalServerErrorException("Something went wrong while fetching Universal POIs");
      });
  }
}
