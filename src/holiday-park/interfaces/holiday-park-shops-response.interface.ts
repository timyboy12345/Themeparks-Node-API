import { HolidayParkAttraction } from './holiday-park-attraction.interface';

export interface HolidayParkShopsResponseInterface {
  [languageCode: string]: {
    attraction: {
      [poiId: string]: HolidayParkAttraction
    }
  }
}
