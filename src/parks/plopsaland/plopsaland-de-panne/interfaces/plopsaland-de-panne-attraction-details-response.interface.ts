export interface PlopsalandDePanneAttractionDetailsResponseInterface {
  nl: PlopsalandDePanneAttractionDetailsResponseLanguageInterface,
  fr: PlopsalandDePanneAttractionDetailsResponseLanguageInterface,
  en: PlopsalandDePanneAttractionDetailsResponseLanguageInterface,
  de: PlopsalandDePanneAttractionDetailsResponseLanguageInterface,
}

export interface PlopsalandDePanneAttractionDetailsResponseLanguageInterface {
  attraction: {
    [key: string]: PlopsalandDePanneAttractionDetailsResponseItemInterface
  },
  // food: {
  //   [key: string]: PlopsalandDePanneAttractionDetailsResponseItemInterface[]
  // },
  // meet_greet: {
  //   [key: string]: PlopsalandDePanneAttractionDetailsResponseItemInterface[]
  // },
  // shop: {
  //   [key: string]: PlopsalandDePanneAttractionDetailsResponseItemInterface[]
  // },
  // event: {
  //   [key: string]: PlopsalandDePanneAttractionDetailsResponseItemInterface[]
  // },
  // atm: {
  //   [key: string]: PlopsalandDePanneAttractionDetailsResponseItemInterface[]
  // },
  // proximus: {
  //   [key: string]: PlopsalandDePanneAttractionDetailsResponseItemInterface[]
  // }
}


export interface PlopsalandDePanneAttractionDetailsResponseItemInterface {
  'nid': string,
  'id': string,
  'name': string,
  'type': 'attraction',
  'currentWaitingTime': number,
  'showWaitingTime': boolean,
  'minHeight': string,
  'maxHeight': string,
  'minHeightSupervised': string,
  'description': string,
  'cat': null,
  'images': string[],
  'icons': {
    'mobile_api_small': string[]
  },
  'temporarily_closed': boolean,
  'open_every_day': boolean,
  'default_timeblocks': [],
  'timeblocks': [],
  'openOn': {
    [key: string]: Boolean
  },
  'attractionType': {
    [key: string]: string
  },
  'uniqueID': string
}
