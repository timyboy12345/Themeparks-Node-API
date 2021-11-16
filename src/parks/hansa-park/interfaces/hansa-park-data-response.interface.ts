export interface HansaParkDataResponseInterface {
  status: string,
  tstamp: number,
  data: HansaParkDataResponseItemInterface[]
}

export interface HansaParkDataResponseItemInterface {
  'id': number,
  'online': boolean,
  'outOfOrder': boolean,
  'isOutOfOrder': boolean,
  'name': string,
  'images': HansaParkDataResponseImageInterface[],
  'longDescription': string,
  'shortDescription': string,
  'metaDescription': string,
  'rideDescription': string,
  'tstamp': number,
  'storyText': string,
  'geo': {
    'lat': number,
    'lon': number
  },
  'keywords': string[],
  'videos': HansaParkDataResponseVideoInterface[],
  'specifications': [] | HansaParkDataResponseSpecificationInterface,
  'guidelines': HansaParkDataResponseGuidelinesInterface,
  'restrictions': HansaParkDataResponseRestrictionsInterface,
  'openingHoursFrom': string,
  'openingHoursTo': string,
  'waitingTime': {
    'minutes': number,
    'prefix': 'n.A' | string
  },
  'isOpen': boolean,
  'themeworlds': HansaParkDataResponseThemeWorldInterface[],
  'categories': HansaParkDataResponseCategoryInterface[],
  'properties': HansaParkDataResponsePropertyInterface[],
  'showTimes': {
    'id': number,
    'name': string,
    'duration': number,
    'hasShowtimes': boolean,
    'today': [],
    'todayPlus1': [],
    'todayPlus2': []
  }
}

export interface HansaParkDataResponseImageInterface {
  'id': number,
  'pid': number,
  'uuid': string,
  'tstamp': number,
  'type': string,
  'path': string,
  'fullPath': string,
  'extension': string,
  'hash': string,
  'name': string,
  'resized': {
    'thumbnail': string,
    'small': string,
    'medium': string,
    'large': string
  }
}

export interface HansaParkDataResponseThemeWorldInterface {
  'id': number,
  'tstamp': number,
  'name': string,
  'pid': number,
  'shortDescription': string,
  'longDescription': string,
  'detailPage': string,
  'images': HansaParkDataResponseImageInterface[],
  'metaDescription': string,
  'keywords': string
}

export interface HansaParkDataResponseCategoryInterface {
  'id': HansaParkDataResponseCategoryIdEnum,
  'tstamp': number,
  'name': string,
  'pid': number,
  'images': HansaParkDataResponseImageInterface[]
}

export enum HansaParkDataResponseCategoryIdEnum {
  'Attractions' = 1,
  'Ride Attractions' = 2,
  'Coaster' = 3,
  'Water Rides' = 4,
  'More ride attractions' = 5,
  'Join-in Attractions' = 6,
  'Shows' = 7,
  'Indoor' = 9,
  'New' = 10,
  'Family' = 12,
  'Kids only' = 13,
  'Thrillseekers' = 14,
  '60+' = 15,
  'Gastronomy' = 16,
  'Restaurants' = 17,
  'Service Points' = 22,
  'baby Food' = 28,
  'Wartezeitenmonitor' = 23,
  '“Water refuelling stations” for dogs' = 36,
  'Smoking Areas' = 38,
  'Service-Station App' = 44
}

export interface HansaParkDataResponsePropertyInterface {
  'id': number,
  'tstamp': number,
  'name': string,
  'icon': string,
  'images': HansaParkDataResponseImageInterface[]
}

export interface HansaParkDataResponseVideoInterface {
  'url': string,
  'provider': string,
  'embedId': string
}

export interface HansaParkDataResponseSpecificationInterface {
  'height': string,
  'inversions'?: string,
  'length': string,
  'manufacturer': string,
  'model': string,
  'seats': string,
  'seatsPerUnit': string,
  'speed'?: string,
  'yearOfConstruction': string
}

export interface HansaParkDataResponseGuidelinesInterface {
  handicap: HansaParkDataResponseGuidelinesItemInterface[],
  safety: HansaParkDataResponseGuidelinesItemInterface[],
  forbidden: HansaParkDataResponseGuidelinesItemInterface[]
}

export interface HansaParkDataResponseGuidelinesItemInterface {
  'id': string,
  'tstamp': number,
  'name': string,
  'description': string,
  'images': HansaParkDataResponseImageInterface[]
}

export interface HansaParkDataResponseRestrictionsInterface {
  'withAdult': [] | HansaParkDataResponseRestrictionsItemInterface,
  'childAlone': [] | HansaParkDataResponseRestrictionsItemInterface,
  'childSeat': [] | HansaParkDataResponseRestrictionsItemInterface
}

export interface HansaParkDataResponseRestrictionsItemInterface {
  'ageMin'?: number,
  'ageMax'?: number,
  'heightMin'?: number,
  'heightMax'?: number,
  'weightMin'?: number,
  'weightMax'?: number,
  'guidelines': HansaParkDataResponseGuidelinesItemInterface[]
}
