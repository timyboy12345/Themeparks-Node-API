import { PhantasialandTranslatable } from './phantasialand-translatable.interface';

export interface PhantasialandWaitTimeItem {
  'open': boolean,
  'poiId': string,
  'closing': string, // "2022-07-31T12:30:40.000Z"
  'opening': string, // "2022-07-31T12:30:40.000Z"
  'showTimes': string[], // "2022-07-31 10:00:00"
  'waitTime': number,
  'updatedAt': string,
  'messages': {
    'de': string[],
    'en': string[],
    'fr': string[],
    'nl': string[]
  },
  '_primaryText': PhantasialandTranslatable,
  '_secondaryText': PhantasialandTranslatable,
  'createdAt': string, // "2022-07-31T12:30:40.000Z"
  'updatedRow': string // "2022-07-31T12:30:40.000Z"
}
