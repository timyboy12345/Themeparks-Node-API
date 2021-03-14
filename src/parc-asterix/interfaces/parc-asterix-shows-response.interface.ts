import { ParcAsterixShow } from './parc-asterix-show.interface';

export interface ParcAsterixShowsResponseInterface {
  code: number,
  result: {
    shows: ParcAsterixShow[];
  }
}
