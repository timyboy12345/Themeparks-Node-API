import { ParcAsterixRestaurant } from './parc-asterix-restaurant.interface';

export interface ParcAsterixRestaurantsResponseInterface {
  code: number,
  result: {
    restaurants: ParcAsterixRestaurant[];
  }
}
