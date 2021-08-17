import { HttpService, Injectable } from '@nestjs/common';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { PlopsalandDePanneTokenInterface } from './interfaces/plopsaland-de-panne-token.interface';
import { Poi } from '../../../_interfaces/poi.interface';
// import { PlopsalandDePanneWaitTimesResponseInterface } from './interfaces/plopsaland-de-panne-wait-times-response.interface';
// import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import {
  PlopsalandDePanneAttractionDetailsResponseInterface
} from './interfaces/plopsaland-de-panne-attraction-details-response.interface';
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
      image: '',
      description: '',
      countryCode: 'be',
      parkType: ParkType.THEMEPARK,
      timezone: 'Europe/Brussels',
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
      supportsShops: false,
      supportsRides: true,
      supportsShows: false,
      supportsRestaurants: false,
      supportsRideWaitTimes: false,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: false,
      supportsRideWaitTimesHistory: false,
    };
  }

  // private async getRideLocations() {
  //   const token = await this.getToken();
  //
  //   if (!token) {
  //     return;
  //   }
  //
  //   const url = `https://www.plopsalanddepanne.be/nl/api/v1.0/locations/plopsaland-de-panne?access_token=${token.accessToken}`;
  // }

  async getPois(): Promise<Poi[]> {
    const promises = [
      this.getRides(),
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

  // private async getRideWaitTimes(): Promise<Poi[]> {
  //   const token = await this.getToken();
  //
  //   if (!token) {
  //     return;
  //   }
  //
  //   const url = `https://www.plopsalanddepanne.be/nl/api/v1.0/waitingTime/plopsaland-de-panne/attraction?access_token=${token.accessToken}`;
  //
  //   return this
  //     .httpService
  //     .get<PlopsalandDePanneWaitTimesResponseInterface>(url)
  //     .toPromise()
  //     .then(response => {
  //       return response.data.nl.map(ride => {
  //         const poi: Poi = {
  //           id: ride.id,
  //           title: ride.name,
  //           category: PoiCategory.ATTRACTION,
  //           original: ride,
  //           currentWaitTime: parseInt(ride.currentWaitingTime),
  //           minSize: ride.minheight,
  //         };
  //
  //         return poi;
  //       });
  //     });
  // }

  private async getAttractionDetails(): Promise<PlopsalandDePanneAttractionDetailsResponseInterface> {
    const token = await this.getToken();

    if (!token) {
      return;
    }

    const url = `https://www.plopsalanddepanne.be/nl/api/v1.0/details/all/plopsaland-de-panne/attraction?access_token=${token.accessToken}`;

    return this
      .httpService
      .get<PlopsalandDePanneAttractionDetailsResponseInterface>(url)
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
