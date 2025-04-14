export interface PlopsaDetailsInterface {
  nl: PlopsaDetailsResponseLanguageInterface,
  fr: PlopsaDetailsResponseLanguageInterface,
  en: PlopsaDetailsResponseLanguageInterface,
  de: PlopsaDetailsResponseLanguageInterface,
}

export interface PlopsaDetailsResponseLanguageInterface {
  attraction: {
    [key: string]: PlopsaDetailsResponseItemInterface
  },
  food: {
    [key: string]: PlopsaDetailsResponseItemInterface
  },
  meet_greet: {
    [key: string]: PlopsaDetailsResponseItemInterface
  },
  shop: {
    [key: string]: PlopsaDetailsResponseItemInterface
  },
  show: {
    [key: string]: PlopsaDetailsResponseItemInterface
  },
  event: {
    [key: string]: PlopsaDetailsResponseItemInterface
  },
  atm: {
    [key: string]: PlopsaDetailsResponseItemInterface
  },
  proximus: {
    [key: string]: PlopsaDetailsResponseItemInterface
  }
}


export interface PlopsaDetailsResponseItemInterface {
  'nid': string,
  'id': string,
  'name': string,
  'type': 'attraction' | 'food' | 'meet_greet' | 'shop' | 'event' | 'atm' | 'proximus' | 'show',
  'currentWaitingTime': number,
  'showWaitingTime': boolean,
  'minHeight'?: string,
  'maxHeight'?: string,
  'minHeightSupervised'?: string,
  'description': string,
  'cat'?: null,
  'images': string[],
  'icons': {
    'mobile_api_small': string[]
  },
  'temporarily_closed': boolean,
  'open_every_day': boolean,
  'default_timeblocks': [],
  'timeblocks': {
    // Key: year-month-date
    [key: string]: {
      'id': string,
      'start': string,
      'end'?: string
    }[]
  },
  'openOn': {
    // Key: year-month-date
    [key: string]: Boolean
  },
  'attractionType': {
    [key: string]: string
  },
  'uniqueID': string
}
