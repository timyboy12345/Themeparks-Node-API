import { HolidayParkAttraction } from './holiday-park-attraction.interface';

export interface HolidayParkAttractionsResponseInterface {
  [languageCode: string]: {
    attraction: {
      [poiId: string]: HolidayParkAttraction
    }
  }
}
