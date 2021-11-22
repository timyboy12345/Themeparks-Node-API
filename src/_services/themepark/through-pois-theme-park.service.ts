import { Injectable, NotImplementedException } from '@nestjs/common';
import { Poi } from '../../_interfaces/poi.interface';
import { ThemeParkService } from './theme-park.service';
import { PoiCategory } from '../../_interfaces/poi-categories.enum';

@Injectable()
export class ThroughPoisThemeParkService extends ThemeParkService {
  async getRides(): Promise<Poi[]> {
    if (this.getSupports().supportsRides) {
      return this.getPois().then(pois => pois.filter(p => p.category === PoiCategory.ATTRACTION));
    }

    throw new NotImplementedException("Could not get all rides");
  }

  async getShows(): Promise<Poi[]> {
    if (this.getSupports().supportsShows) {
      return this.getPois().then(pois => pois.filter(p => p.category === PoiCategory.SHOW));
    }

    throw new NotImplementedException("Could not get all shows");
  }

  async getRestaurants(): Promise<Poi[]> {
    if (this.getSupports().supportsRestaurants) {
      return this.getPois().then(pois => pois.filter(p => [PoiCategory.RESTAURANT, PoiCategory.SNACKBAR].includes(p.category)));
    }

    throw new NotImplementedException("Could not get all restaurants");
  }

  async getShops(): Promise<Poi[]> {
    if (this.getSupports().supportsShops) {
      return this.getPois().then(pois => pois.filter(p => p.category === PoiCategory.SHOP));
    }

    throw new NotImplementedException("Could not get all shops");
  }

  async getAnimals(): Promise<Poi[]> {
    if (this.getSupports().supportsAnimals) {
      return this.getPois().then(pois => pois.filter(p => p.category === PoiCategory.ANIMAL));
    }

    throw new NotImplementedException("Could not get all animals");
  }
}
