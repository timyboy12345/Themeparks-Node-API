import { Injectable, NotImplementedException } from '@nestjs/common';
import { ThemePark } from '../../_interfaces/park.interface';
import { Poi } from '../../_interfaces/poi.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { ThemeParkOpeningTimes } from '../../_interfaces/park-openingtimes.interface';
import { ThemeParkEvent } from '../../_interfaces/park-event.interface';

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
    throw new NotImplementedException("Could not get shows");
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

  async getAnimals(): Promise<Poi[]> {
    throw new NotImplementedException("Could not get animals");
  }

  async getAnimal(id: string): Promise<Poi> {
    return await this.getAnimals()
      .then((animals) => {
        return animals.find(animal => animal.id === id);
      })
  }

  async getHalloweenEvents(): Promise<Poi[]> {
    throw new NotImplementedException("Could not get halloween events");
  }

  async getHalloweenEvent(id: string): Promise<Poi> {
    return await this.getHalloweenEvents()
      .then((event) => {
        return event.find(event => event.id === id);
      })
  }

  async getOpeningTimes(): Promise<ThemeParkOpeningTimes[]> {
    throw new NotImplementedException("Could not get opening times");
  }

  async getEvents(): Promise<ThemeParkEvent[]> {
    throw new NotImplementedException("Could not get events");
  }
}
