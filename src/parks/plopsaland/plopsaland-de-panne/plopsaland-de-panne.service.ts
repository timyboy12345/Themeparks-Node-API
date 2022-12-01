import { HttpService, Injectable } from '@nestjs/common';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { PlopsalandDePanneTokenInterface } from './interfaces/plopsaland-de-panne-token.interface';
import { Poi } from '../../../_interfaces/poi.interface';
import {
  PlopsalandDePanneDetailsResponseInterface,
} from './interfaces/plopsaland-de-panne-details-response.interface';
import { PlopsalandDePanneTransferService } from './plopsaland-de-panne-transfer/plopsaland-de-panne-transfer.service';
import { ThemeParkService } from '../../../_services/themepark/theme-park.service';

@Injectable()
export class PlopsalandDePanneService extends ThemeParkService {
  constructor(private readonly httpService: HttpService,
              private readonly transferService: PlopsalandDePanneTransferService) {
    super();
  }

  getInfo(): ThemePark {
    return {
      id: 'plopsaland-de-panne',
      name: 'Plopsalande de Panne',
      image: 'https://www.plopsalanddepanne.be/sites/default/files/public/brand/logos/Plopsaland%20De%20Panne.jpg',
      description: 'Plopsaland De Panne is een themapark van Studio 100 in de Belgische plaats De Panne, aan de Noordzeekust en de Franse grens. De kusttram heeft een halte voor de ingang. Het themapark is genoemd naar de kinderprogramma\'s Kabouter Plop en Samson en Gert van Studio 100.',
      countryCode: 'be',
      parkType: ParkType.THEMEPARK,
      timezone: 'Europe/Brussels',
      location: {
        lat: 51.080857219669724,
        lng: 2.5987519692562495,
      },
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
      supportsShowTimes: false,
      supportsRestaurantOpeningTimes: false,
      supportsPois: true,
      supportsPoiLocations: false,
      supportsShopOpeningTimes: false,
      supportsShops: true,
      supportsRides: true,
      supportsShows: true,
      supportsRestaurants: true,
      supportsRideWaitTimes: true,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: false,
      supportsRideWaitTimesHistory: true,
      supportsTranslations: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    const promises = [
      this.getRides(),
      this.getShops(),
      this.getRestaurants(),
    ];

    return []
      .concat
      .apply([], await Promise.all(promises));
  }

  public async getRides(): Promise<Poi[]> {
    const response = await this.getAttractionDetails();

    const plopsaPois = Object.keys(response.nl.attraction).map((key) => response.nl.attraction[key]);
    return this.transferService.transferPoisToPois(plopsaPois);
  }

  async getShops(): Promise<Poi[]> {
    const response = await this.getFoodAndShop();

    const plopsaPois = Object.keys(response.nl.shop).map((key) => response.nl.shop[key]);
    return this.transferService.transferPoisToPois(plopsaPois);
  }

  async getRestaurants(): Promise<Poi[]> {
    const response = await this.getFoodAndShop();

    const plopsaPois = Object.keys(response.nl.food).map((key) => response.nl.food[key]);
    return this.transferService.transferPoisToPois(plopsaPois);
  }

  async getShows(): Promise<Poi[]> {
    const response = await this.getEvent();

    const plopsaPois = Object.keys(response.nl.event).map((key) => response.nl.event[key]);
    return this.transferService.transferPoisToPois(plopsaPois);
  }

  private async getFoodAndShop() {
    const token = await this.getToken();

    if (!token) {
      return;
    }

    const url = `https://www.plopsalanddepanne.be/nl/api/v1.0/details/all/plopsaland-de-panne/page?access_token=${token.accessToken}`;

    return this
      .httpService
      .get<PlopsalandDePanneDetailsResponseInterface>(url)
      .toPromise()
      .then(response => {
        return response.data;
      });
  }

  private async getAttractionDetails(): Promise<PlopsalandDePanneDetailsResponseInterface> {
    const token = await this.getToken();

    if (!token) {
      return;
    }

    const url = `https://www.plopsalanddepanne.be/nl/api/v1.0/details/all/plopsaland-de-panne/attraction?access_token=${token.accessToken}`;

    return this
      .httpService
      .get<PlopsalandDePanneDetailsResponseInterface>(url)
      .toPromise()
      .then(response => {
        return response.data;
      });
  }

  private async getEvent(): Promise<PlopsalandDePanneDetailsResponseInterface> {
    const token = await this.getToken();

    if (!token) {
      return;
    }

    const url = `https://www.plopsalanddepanne.be/nl/api/v1.0/details/all/plopsaland-de-panne/event?access_token=${token.accessToken}`;

    return this
      .httpService
      .get<PlopsalandDePanneDetailsResponseInterface>(url)
      .toPromise()
      .then(response => {
        return response.data;
      });
  }

  private async getToken() {
    const body = {
      'clientSecret': '6YqyzzOsaNkxDkHmwhgK%%2Fw%%3D%%3D',
      'clientId': '7xfwRB8iK1tbf3cYiABI%%2Fw%%3D%%3D',
    };

    return this
      .httpService
      .post<PlopsalandDePanneTokenInterface>('https://www.plopsalanddepanne.be/nl/api/v1.0/token/0001', body)
      .toPromise()
      .then(value => {
        return value.data;
      })
      .catch(reason => {
        console.error(reason);
        return null;
      });
  }
}
