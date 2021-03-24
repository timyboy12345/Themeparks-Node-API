import { Injectable } from '@nestjs/common';
import { AttractionsIoThemeParkService } from '../_services/attractions-io-theme-park/attractions-io-theme-park.service';
import { ThemePark } from '../_interfaces/park.interface';
import { ThemeParkSupports } from '../_interfaces/park-supports.interface';
import { Poi } from '../_interfaces/poi.interface';
import * as data from './data/records.json';
import { PoiCategory } from '../_interfaces/poi-categories.enum';

@Injectable()
export class HellendoornService extends AttractionsIoThemeParkService {
  getInfo(): ThemePark {
    return {
      id: 'hellendoorn',
      name: 'Hellendoorn',
      countryCode: 'nl',
      description: 'Avonturenpark Hellendoorn is een attractiepark in de Nederlandse plaats Hellendoorn. Het park is in 1936 begonnen als theehuis met speeltuin en is uitgegroeid tot een volwaardig attractiepark. Het attractiepark ligt in een bosrijke omgeving aan de Luttenbergerweg ten westen van de plaats Hellendoorn.',
      image: 'https://nl.letsgodigital.org/uploads/2018/04/hellendoorn-2018.jpg',
    };
  }

  getSupports(): ThemeParkSupports {
    return{
      supportsPoiLocations: true,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: false,
      supportsRides: true,
      supportsShopOpeningTimes: false,
      supportsShops: true,
      supportsShowTimes: false,
      supportsShows: true
    }
  }

  async getPois(): Promise<Poi[]> {
    return this.getFileItems(data, 'nl-NL')
  }

  async getRides(): Promise<Poi[]> {
    return this.getFileItems(data, 'nl-NL').filter(poi => poi.category === PoiCategory.ATTRACTION);
  }

  async getRestaurants(): Promise<Poi[]> {
    return this.getFileItems(data, 'nl-NL').filter(poi => [PoiCategory.RESTAURANT, PoiCategory.SNACKBAR].includes(poi.category));
  }

  async getShows(): Promise<Poi[]> {
    return this.getFileItems(data, 'nl-NL').filter(poi => poi.category === PoiCategory.SHOW);
  }

  async getShops(): Promise<Poi[]> {
    return this.getFileItems(data, 'nl-NL').filter(poi => poi.category === PoiCategory.SHOP);
  }

  getCategory(category: number): PoiCategory {
    switch (category) {
      case 1112:
      case 1113:
      case 1120:
      case 1121:
        return PoiCategory.ATTRACTION;
      case 1114:
        return PoiCategory.RESTAURANT;
      case 1117:
        return PoiCategory.SNACKBAR;
      case 1122:
        return PoiCategory.SHOW;
      case 1123:
        return PoiCategory.SERVICE;
      case 1124:
        return PoiCategory.SHOP;
      case 1147:
        return PoiCategory.SMOKING_AREA;
      case 1148:
        return PoiCategory.TOILETS;
      default:
        return PoiCategory.UNDEFINED;
    }
  }
}
