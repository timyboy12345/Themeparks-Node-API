import { HolidayParkAttraction } from './holiday-park-attraction.interface';

export interface HolidayParkLocationsResponseInterface {
  [languageCode: string]: {
    event: {
      [poiId: string]: HolidayParkAttraction
    },
    food: {
      [poiId: string]: HolidayParkAttraction
    },
    attraction: {
      [poiId: string]: HolidayParkAttraction
    },
    meet_greet: {
      [poiId: string]: HolidayParkAttraction
    },
    shop: {
      [poiId: string]: HolidayParkAttraction
    }
  }
}

export interface HolidayParkLocationResponseItemInterface {
  "name": string,
  "latitude": string,
  "longitude": string
}
