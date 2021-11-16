export interface PlopsalandDePanneDetailsResponseInterface {
  nl: PlopsalandDePanneDetailsResponseLanguageInterface,
  fr: PlopsalandDePanneDetailsResponseLanguageInterface,
  en: PlopsalandDePanneDetailsResponseLanguageInterface,
  de: PlopsalandDePanneDetailsResponseLanguageInterface,
}

export interface PlopsalandDePanneDetailsResponseLanguageInterface {
  attraction: {
    [key: string]: PlopsalandDePanneDetailsResponseItemInterface
  },
  food: {
    [key: string]: PlopsalandDePanneDetailsResponseItemInterface[]
  },
  meet_greet: {
    [key: string]: PlopsalandDePanneDetailsResponseItemInterface[]
  },
  shop: {
    [key: string]: PlopsalandDePanneDetailsResponseItemInterface[]
  },
  event: {
    [key: string]: PlopsalandDePanneDetailsResponseItemInterface[]
  },
  atm: {
    [key: string]: PlopsalandDePanneDetailsResponseItemInterface[]
  },
  proximus: {
    [key: string]: PlopsalandDePanneDetailsResponseItemInterface[]
  }
}


export interface PlopsalandDePanneDetailsResponseItemInterface {
  'nid': string,
  'id': string,
  'name': string,
  'type': 'attraction' | 'food' | 'meet_greet' | 'shop' | 'event' | 'atm' | 'proximus',
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
