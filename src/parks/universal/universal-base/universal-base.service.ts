import { Injectable, InternalServerErrorException, NotImplementedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
// import * as moment from 'moment';
// import * as crypto from 'node:crypto';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { Poi } from '../../../_interfaces/poi.interface';
import { UniversalTransferService } from '../universal-transfer/universal-transfer.service';
import { ConfigService } from '@nestjs/config';
import { ThroughPoisThemeParkService } from '../../../_services/themepark/through-pois-theme-park.service';
import * as Sentry from '@sentry/node';

@Injectable()
export class UniversalBaseService extends ThroughPoisThemeParkService {
  private readonly _apiUrl: string;
  private readonly _apiKey : string;
  private readonly _apiSecret : string;

  constructor(private readonly http: HttpService, private readonly transfer: UniversalTransferService, private readonly config: ConfigService) {
    super();

    this._apiUrl = this.config.get('UNIVERSAL_API_URL');
    this._apiKey = this.config.get('UNIVERSAL_API_KEY');
    this._apiSecret = this.config.get('UNIVERSAL_API_SECRET');
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
      supportsHalloween: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: false,
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
      supportsTranslations: false
    }
  }

  getCity(): string {
    throw new NotImplementedException("GetCity is not implemented")
  }

  getVenueId(): string {
    throw new NotImplementedException("GetVenueId is not implemented")
  }

  async getPois(): Promise<Poi[]> {
    return this.http.get(`${this._apiUrl}/pointsofinterest`, {
      params: {
        city: this.getCity()
      }
    })
      .toPromise()
      .then((res) => this.transfer.transferDataObjectToPois(res.data, this.getVenueId()))
      .catch((err) => {
        Sentry.captureException(err);
        console.log(err);
        throw new InternalServerErrorException();
      })
  }

  // private getToken() {
  //   // Get access token
  //   // generate access token signature
  //   //  calculate current date to generate access token signature
  //   const today = `${moment.utc().format('ddd, DD MMM YYYY HH:mm:ss')} GMT`;
  //
  //   // create signature to get access token
  //   const signatureBuilder = crypto.createHmac('sha256', this._apiSecret);
  //   signatureBuilder.update(`${this._apiKey}\n${today}\n`);
  //   // generate hash from signature builder
  //   //  also convert trailing equal signs to unicode. because. I don't know
  //   const signature = signatureBuilder.digest('base64').replace(/=$/, '\u003d');
  //
  //   // request new access token
  //   return this.http.post(this._apiUrl, {
  //     headers: {
  //       Date: today,
  //     },
  //     body: {
  //       apiKey: this._apiKey,
  //       signature,
  //     },
  //   })
  //     .toPromise()
  //     .then((res) => {
  //       console.log(res);
  //       // check we actually got the token back
  //       // if (!body.Token) {
  //       //   this.Log(body.toString('ascii'));
  //       //   return Promise.reject(new Error('Missing access token from Universal API'));
  //       // }
  //     });
  // }
}
