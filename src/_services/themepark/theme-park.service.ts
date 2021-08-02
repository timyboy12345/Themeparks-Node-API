import { Injectable, NotImplementedException } from '@nestjs/common';
import { ThemePark } from '../../_interfaces/park.interface';
import { Poi } from '../../_interfaces/poi.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { ThemeParkOpeningTimes } from '../../_interfaces/park-openingtimes.interface';

@Injectable()
export class ThemeParkService {
  getInfo(): ThemePark {
    throw new NotImplementedException("Could not get theme park info");
  }

  getSupports(): ThemeParkSupports {
    throw new NotImplementedException("Could not get theme park supports");
  }

  getFullInfo() {
    const i = this.getInfo();
    i.supports = this.getSupports();
    return i;
  }

  async getPois(): Promise<Poi[]> {
    throw new NotImplementedException("Could not get POIs");
  }

  async getRestaurants(): Promise<Poi[]> {
    throw new NotImplementedException("Could not get restaurants");
  }

  async getRestaurant(id: string): Promise<Poi> {
    return await this.getRestaurants()
      .then((restaurants) => {
        return restaurants.find(poi => poi.id === id);
      });
  }

  async getRides(): Promise<Poi[]> {
    throw new NotImplementedException("Could not get rides");
  }

  async getRide(id: string): Promise<Poi> {
    return await this.getPois()
      .then((rides) => {
        return rides.find(poi => poi.id === id);
      });
  }

  async getShows(): Promise<Poi[]> {
    throw new NotImplementedException("Could not get rides");
  }

  async getShow(id: string): Promise<Poi> {
    return await this.getShows()
      .then((shows) => {
        return shows.find(show => show.id === id);
      })
  }

  async getShops(): Promise<Poi[]> {
    throw new NotImplementedException("Could not get shops");
  }

  async getShop(id: string): Promise<Poi> {
    return await this.getShops()
      .then((shops) => {
        return shops.find(shop => shop.id === id);
      })
  }

  async getOpeningTimes(): Promise<ThemeParkOpeningTimes[]> {
    throw new NotImplementedException("Could not get opening times");
  }
}
