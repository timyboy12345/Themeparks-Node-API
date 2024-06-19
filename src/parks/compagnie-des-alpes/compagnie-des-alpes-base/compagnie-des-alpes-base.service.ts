import { Injectable, InternalServerErrorException, NotImplementedException } from '@nestjs/common';
import { ThemeParkService } from '../../../_services/themepark/theme-park.service';
import { HttpService } from '@nestjs/axios';
import { LocaleService } from '../../../_services/locale/locale.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import {
  CdaOpeningHoursResponseInterface,
} from '../interfaces/cda-opening-hours-response.interface';
import {
  CDAAttractionResponseInterface,
} from '../interfaces/cda-attractions-response.interface';
import * as Sentry from '@sentry/node';
import { BellewaerdeWaitTimeInterface } from '../interfaces/cda-wait-time-response.interface';
import { CompagnieDesAlpesTransferService } from '../compagnie-des-alpes-transfer/compagnie-des-alpes-transfer.service';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';

@Injectable()
export class CompagnieDesAlpesBaseService extends ThemeParkService {
  constructor(private http: HttpService,
              private transfer: CompagnieDesAlpesTransferService,
              private locale: LocaleService) {
    super();
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: this.supportsAnimals(),
      supportsHalloween: false,
      supportsOpeningTimes: this.supportsOpeningTimes(),
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
      supportsShows: this.supportsShows(),
      supportsTranslations: false,
    };
  }

  public supportsShows() {
    return true;
  }

  public supportsOpeningTimes() {
    return true;
  }

  public supportsAnimals() {
    return false;
  }

  public getParkCode(): string {
    throw new NotImplementedException('Park code not set');
  }

  public getBaseUrl(): string {
    throw new NotImplementedException('Park base URL not set');
  }

  public getRealTimeURL(): string {
    throw new NotImplementedException('Park wait time base URL not set');
  }

  public getLocaleCode(l): string {
    throw new NotImplementedException('Locales for this park have not been set yet');
  }

  public getApiKey(): string {
    return 'r6uko7sdv4dq-btw'
  }

  public getUserAgent(): string {
    return 'Bellewaerde/2015 CFNetwork/1496.0.7 Darwin/23.5.0';
  }

  async getPois(): Promise<Poi[]> {
    const promises = [
      this.getRides(),
      this.getRestaurants(),
      this.getShops(),
      this.getAnimals(),
      this.getToilets(),
      this.getShows(),
      // TODO: Implement services (and games?)
      // this.getServices(),
      // this.getGames(),
    ];

    return []
      .concat
      .apply([], await Promise.all(promises));
  }

  async getRides(): Promise<Poi[]> {
    const raw = await (this.request('attractions'));
    const rides = this.transfer.transferRidesToPois(raw);

    if (this.getRealTimeURL()) {
      const waitTimes = await this.getWaitTimes()
        .catch((exception) => {
          Sentry.captureException(exception);
          console.error(exception);

          return [];
        });


      waitTimes.forEach((w) => {
        rides.map((r) => {
          if (r.id === w.id) {
            r.currentWaitTime = parseInt(w.wait);
          }

          return r;
        });
      });
    }

    return rides;
  }

  async getShops(): Promise<Poi[]> {
    const shops = await (this.request('shops'));
    return this.transfer.transferShopsToPois(shops);
  }

  async getRestaurants(): Promise<Poi[]> {
    const shops = await (this.request('restaurants'));
    return this.transfer.transferRestaurantsToPois(shops);
  }

  async getToilets(): Promise<Poi[]> {
    const shops = await (this.request('toilets'));
    return this.transfer.transferPoisToPois(shops).map((s) => {
      return {
        ...s,
        category: PoiCategory.TOILETS,
      };
    });
  }

  async getAnimals(): Promise<Poi[]> {
    const shops = await (this.request('animals'));
    return this.transfer.transferAnimalsToPois(shops);
  }

  // TODO: Add Show Times when examples are available during summer
  async getShows(): Promise<Poi[]> {
    const shows = await (this.request('shows'));
    return this.transfer.transferShowsToPois(shows);
  }

  async getOpeningTimes(): Promise<any[]> {
    const hours: CdaOpeningHoursResponseInterface = await this.request('openinghours');
    return this.transfer.transferOpeningTimesToOpeningTimes(hours);
  }

  async request(type: string): Promise<any> {
    let locale = this.getLocaleCode(this.locale.getLocale());

    const url: string = `${this.getBaseUrl()}/api/${this.getParkCode()}/${locale}/${type}.v1.json`;

    return this.http.get<CDAAttractionResponseInterface[]>(url, {
      headers: {
        'x-api-key': this.getApiKey(),
        'user-agent': this.getUserAgent(),
      },
    })
      .toPromise()
      .then((r) => r.data)
      .catch((exception) => {
        Sentry.captureException(exception);
        console.error(exception);
        throw new InternalServerErrorException(exception);
      });
  }

  async getWaitTimes(): Promise<BellewaerdeWaitTimeInterface[]> {
    const url = this.getRealTimeURL();

    return this.http.get<BellewaerdeWaitTimeInterface[]>(url)
      .toPromise()
      .then((r) => r.data)
      .catch((exception) => {
        Sentry.captureException(exception);
        console.error(exception);
        throw new InternalServerErrorException(exception);
      });
  }
}
