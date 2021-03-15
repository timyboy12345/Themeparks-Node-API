import { EftelingPoi } from './efteling-poi.interface';

export interface EftelingPoisResponse {
  'status': {
    'rid': string,
    'time-ms': number
  },
  'hits': {
    'found': number,
    'start': number,
    'hit': EftelingPoi[]
  }
}
