import { Injectable } from '@nestjs/common';
import { ThemeParkService } from '../../_services/themepark/theme-park.service';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { HttpService } from '@nestjs/axios';
import { Poi } from '../../_interfaces/poi.interface';
import { PairiDaizaResponse } from './interfaces/PairiDaizaResponse';
import { PairiDaizaTransferService } from './pairi-daiza-transfer/pairi-daiza-transfer.service';
import { LocaleService } from '../../_services/locale/locale.service';

@Injectable()
export class PairiDaizaService extends ThemeParkService {
  getInfo(): ThemePark {
    return {
      id: 'pairi-daiza',
      name: 'Pairi Daiza',
      description: 'Pairi Daiza is een dierenpark in Cambron-Casteau, dat op 11 mei 1994 zijn deuren opende. Pairi Daiza neemt deel aan 89 EEP\'s voor het behoud en de bescherming van bedreigde diersoorten. Het dierenpark stond tot en met 23 mei 2016 genoteerd op de Brusselse beurs',
      image: 'https://cms.pairidaiza.eu/thumbor/9BIAHN5BDznc6Gg8zThJKjvSdj8=/fit-in/1024x/filters:quality(92)/--/uploads/2024/04/Paysage-izba-ganesha-octobre-copie-1.jpg',
      timezone: 'Europe/Berlin',
      location: {
        lat: 50.585003,
        lng: 3.8873162,
      },
      parkType: ParkType.ZOO,
      countryCode: 'BE',
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: true,
      supportsEvents: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: true,
      supportsPois: false,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: false,
      supportsRideWaitTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsRides: false,
      supportsShopOpeningTimes: false,
      supportsShops: true,
      supportsShowTimes: false,
      supportsShows: true,
      // Supports FR, EN, NL
      supportsTranslations: true,
    };
  }

  constructor(private readonly http: HttpService,
              private readonly transfer: PairiDaizaTransferService,
              private readonly locale: LocaleService) {
    super();
  }

  async getPois(): Promise<Poi[]> {

    const promises = [
      this.getRestaurants(),
      this.getShops(),
      this.getAnimals(),
      this.getShows(),
    ];

    return []
      .concat
      .apply([], await Promise.all(promises));
  }

  async getAnimals(): Promise<Poi[]> {
    return await this.request('animals').then((res) => this.transfer.transferAnimalsToPois(res, this.locale.getLocale()))
  }

  async getShops(): Promise<Poi[]> {
    return await this.request('shops').then((res) => this.transfer.transferShopsToPois(res, this.locale.getLocale()))
  }

  async getShows(): Promise<Poi[]> {
    return await this.request('animations').then((res) => this.transfer.transferShowsToPois(res, this.locale.getLocale()))
  }

  async getRestaurants(): Promise<Poi[]> {
    return await this.request('restaurants').then((res) => this.transfer.transferRestaurantsToPois(res, this.locale.getLocale()))
  }

  private async request(endpoint: string) {
    const url = 'https://pairidaizabackend-v2.azurewebsites.net/api';

    return await this.http.get<PairiDaizaResponse>(url + '/' + endpoint)
      .toPromise()
      .then((res) => res.data.ServiceResultData);
  }
}
