export interface CedarfairBaseResponseInterface {
  'id': '0021a808-ba30-43de-ae66-5dfc15f5f69a',
  'type': CedarfairBaseResponseType,
  'description': string,
  'label': string,
  'images': CedarfairBaseResponseImageInterface[],
  'details': CedarfairBaseResponseDetailInterface[],
  'tags': CedarfairBaseResponseTagInterface[],
  'location': {
    'lat': number,
    'lon': number
  }
}

export interface CedarfairBaseResponseImageInterface {
  'resolution': CedarfairBaseResponseResolution,
  'src': string
}

export interface CedarfairBaseResponseDetailInterface {
  'id': string,
  'value': {
    'terms': string[]
  }
}

export interface CedarfairBaseResponseTagInterface {
  'name': 'thrillFactor',
  'value': 'Mild',
  'label': 'Thrill level',
  'valueLabel': 'Mild',
  'uiVisible': true,
  'displayOrder': '1',
  'icons': CedarfairBaseResponseImageInterface[]
}

export enum CedarfairBaseResponseResolution {
  XXXHDPI,
  MDPI,
  XHDPI
}

export enum CedarfairBaseResponseType {
  '',
  wpDining = 'wpDining',
  Snacks = 'Snacks',
  Meals = 'Meals',
  gpEvents = 'gpEvents',
  FunPix = 'FunPix',
  ATM = 'ATM',
  Lockers = 'Lockers',
  wpAmenities = 'wpAmenities',
  gsAmenities = 'gsAmenities',
  SmokingArea = 'SmokingArea',
  Restrooms = 'Restrooms',
  Family = 'Family',
  Coasters = 'Coasters',
  Kids = 'Kids',
  Attractions = 'Attractions',
  Shopping = 'Shopping',
  ThrillRides = 'ThrillRides',
  Venue = 'Venue',
  Waterpark = 'Waterpark',
  xBeacon = 'xBeacon',
  ScareZones = 'ScareZones',
  DaytimeExperiences = 'DaytimeExperiences',
  GreatPumpkin = 'GreatPumpkin',
  DaytimeMazes = 'DaytimeMazes',
  HauntExperiences = 'HauntExperiences',
  HauntShows = 'HauntShows',
  Mazes = 'Mazes'
}
