import { ParcAsterixAttraction } from './parc-asterix-attraction.interface';

export interface ParcAsterixAttractionsResponseInterface {
  code: number,
  result: {
    attractions: ParcAsterixAttraction[];
  }
}
