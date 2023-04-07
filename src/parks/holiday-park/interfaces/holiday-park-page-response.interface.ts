import { HolidayParkAttraction } from './holiday-park-attraction.interface';

export interface HolidayParkPageResponseInterface {
  [languageCode: string]: {
    food: {
      [poiId: string]: HolidayParkAttraction
    },
    shop: {
      [poiId: string]: HolidayParkAttraction
    },
    show: {
      [poiId: string]: HolidayParkAttraction
    }
  }
}
