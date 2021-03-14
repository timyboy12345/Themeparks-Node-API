import { Injectable } from '@nestjs/common';
import { ThemeParkService } from '../_services/themepark/theme-park.service';
import { ThemePark } from '../_interfaces/park.interface';
import { ThemeParkSupports } from '../_interfaces/park-supports.interface';

import * as BellewaerdePoiData from './data/bellewaerde-pois.json';
import { Poi } from '../_interfaces/poi.interface';
import { PoiCategory } from '../_interfaces/poiCategories.enum';

@Injectable()
export class BellewaerdeService extends ThemeParkService{
  getInfo(): ThemePark {
    return {
      id: 'bellewaerde',
      name: 'Bellewaerde',
      description: 'Bellewaerde is een pret- en dierenpark bij Ieper, gelegen in de Belgische provincie West-Vlaanderen. Het park is in handen van het Franse Compagnie des Alpes, waar de Walibiparken ook deel van uitmaken. Bellewaerde telt 54 hectare grond en is vooral beroemd om zijn vele dieren en de aandacht voor thematisering.',
      image: 'https://www.toerismewesthoek.be/sites/westtoer_2015/files/styles/route_main_image_lightbox/public/win_synced_photos/bellewaerde_-33500-0.jpg?itok=jjWx2sC_',
      countryCode: 'be',
    }
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsPois: true,
      supportsRestaurantWaitTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: false,
      supportsRides: true,
      supportsShowTimes: false,
      supportsShows: true
    }
  }

  async getPois(): Promise<Poi[]> {
    return BellewaerdePoiData.map(poi => {
      let category: PoiCategory;

      switch (poi.type) {
        case "Attractions":
          category = PoiCategory.ATTRACTION;
          break;
        case "Resto":
          category = PoiCategory.RESTAURANT;
          break;
        case "Shops":
          category = PoiCategory.SHOP;
          break;
        case "POI":
          category = PoiCategory.SERVICE;
          break;
        case "SHOW":
          category = PoiCategory.SHOW;
          break;
        case "Dieren":
          category = PoiCategory.ANIMAL;
          break;
        default:
          category = PoiCategory.UNDEFINED;
          break;
      }

      return {
        id: poi.code + '',
        title: poi.name,
        category: category,
        original: poi,
      }
    })
  }

  async getRides(): Promise<Poi[]> {
    return this.getPois().then(pois => pois.filter(poi => poi.category === PoiCategory.ATTRACTION));
  }

  async getRestaurants(): Promise<Poi[]> {
    return this.getPois().then(pois => pois.filter(poi => poi.category === PoiCategory.RESTAURANT));
  }

  async getShows(): Promise<Poi[]> {
    return this.getPois().then(pois => pois.filter(poi => poi.category === PoiCategory.SHOW));
  }
}
