import { Injectable, NotImplementedException } from '@nestjs/common';
import { ThemeParkService } from '../../../_services/themepark/theme-park.service';
import { HttpService } from '@nestjs/axios';
import { Poi } from '../../../_interfaces/poi.interface';
import { BellewaerdeTransferService } from '../bellewaerde-transfer/bellewaerde-transfer.service';
import { BellewaerdeAttractionResponseInterface } from '../interfaces/bellewaerde-attractions-response.interface';

@Injectable()
export class BellewaerdeBaseService extends ThemeParkService {
  constructor(private http: HttpService,
              private transfer: BellewaerdeTransferService) {
    super();
  }

  public getParkCode(): string {
    throw new NotImplementedException('Park code not set');
  }

  async getPois(): Promise<Poi[]> {
    const promises = [
      this.getRides(),
      this.getRestaurants(),
      this.getShops(),
      // this.getServices(),
      // this.getGames(),
    ];

    return []
      .concat
      .apply([], await Promise.all(promises));
  }

  async getRides(): Promise<Poi[]> {
    const rides = await (this.request('attractions'));
    return this.transfer.transferRidesToPois(rides);
  }

  async getShops(): Promise<Poi[]> {
    const shops = await (this.request('shops'));
    return this.transfer.transferShopsToPois(shops);
  }

  async getRestaurants(): Promise<Poi[]> {
    const shops = await (this.request('restaurants'));
    return this.transfer.transferRestaurantsToPois(shops);
  }

  async getAnimals(): Promise<Poi[]> {
    const shops = await (this.request('animals'));
    return this.transfer.transferAnimalsToPois(shops);
  }

  // TODO: Implement localizations (Bellewaerde supports FR)
  async request(type: string): Promise<any[]> {
    const url: string = `https://www.bellewaerde.be/api/${this.getParkCode()}/nl/${type}.v1.json`;

    return this.http.get<BellewaerdeAttractionResponseInterface[]>(url, {
      headers: {
        'x-api-key': 'r6uko7sdv4dq-btw',
        'user-agent': 'Bellewaerde/2015 CFNetwork/1496.0.7 Darwin/23.5.0',
      },
    })
      .toPromise()
      .then((r) => r.data);
  }
}
