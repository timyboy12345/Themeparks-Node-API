export interface UniversalBaseResponse {
  Atms: UniversalBaseItem[],
  ChargingStations: [],
  DiningLocations: UniversalBaseItem[],
  Events: UniversalBaseItem[],
  FamilyServices: [],
  FirstAidStations: UniversalBaseItem[],
  GeneralLocations: [],
  GuestServices: UniversalBaseItem[],
  Hotels: UniversalBaseItem[],
  Lands: [],
  Lockers: UniversalBaseItem[],
  LostAndFoundStations: UniversalBaseItem[],
  NightlifeLocations: UniversalBaseItem[],
  Parades: [],
  PhoneCardDispensers: [],
  Rentals: UniversalBaseItem[],
  Restrooms: UniversalBaseItem[],
  Rides: UniversalBaseItem[],
  ServiceAnimalRestAreas: UniversalBaseItem[],
  Shops: UniversalBaseItem[],
  Shows: UniversalBaseItem[],
  SmokingAreas: UniversalBaseItem[],
  Games: UniversalBaseItem[]
}

export interface UniversalBaseItem {
  'MinHeightInInches': number | null,
  'MaxHeightInInches': number | null,
  'ExpressPassAccepted': boolean,
  'WaitTime': number,
  'Recurring': boolean,
  'HasChildSwap': boolean,
  'PeakHeightInFeet': boolean | null,
  'TopSpeedInMph': boolean | null,
  'AccessibilityOptions': [
    'ClosedCaption',
    'StandardWheelchair',
    'StationarySeating',
    'ExtraInfo'
  ],
  'HasSingleRiderLine': boolean,
  'RideTypes': [
    'KidFriendly'
  ],
  'FunFact': string | null,
  'SiteUrl': string | null,
  'SocialSharingText': string | null,
  'HasNominalFee': boolean,
  'Category': UniversalCategory,
  'MblDisplayName': string,
  'LandId': number,
  'VenueId': number,
  'MblShortDescription': string,
  'MblLongDescription': string,
  'Longitude': number,
  'Latitude': number,
  'DetailImages': string[],
  'ListImage': string,
  'ThumbnailImage': string,
  'Images': [],
  'IsRoutable': boolean,
  'EventSeriesOnly': boolean,
  'Tags': string[],
  'OfferIds': [],
  'Prices': [],
  'VirtualLine': boolean,
  'ExternalIds': {
    'Tridion13': '100-58009',
    'SharePoint': '38',
    'ContentId': 'com.uo.usf.rides.despicable_me_minion_mayhem'
  },
  'Id': number

  // DiningLocations
  DiningMenusLinks?: { MenuText: string, MenuLink: string }[]

  // Shows
  'StartTimes': [
    '10:30:00',
    '11:30:00',
    '12:30:00',
    '14:00:00',
    '15:00:00',
    '16:00:00'
  ],
  'StartDateTimes': [
    '2023-11-08 10:30:00',
    '2023-11-08 11:30:00',
    '2023-11-08 12:30:00',
    '2023-11-08 14:00:00',
    '2023-11-08 15:00:00',
    '2023-11-08 16:00:00'
  ],
  'EndTimes': [],
  'EndDateTimes': [],
  'ShowTypes': UniversalShowType[],
  'ContinuousUntilParkClose': boolean,
  'Tier': 'Tier1' | 'Tier2' | 'Tier3',
}

export enum UniversalCategory {
  Atms = 'Atms',
  ChargingStations = 'ChargingStations',
  DiningLocations = 'DiningLocations',
  Events = 'Events',
  FamilyServices = 'FamilyServices',
  FirstAidStations = 'FirstAidStations',
  GeneralLocations = 'GeneralLocations',
  GuestServices = 'GuestServices',
  Hotels = 'Hotels',
  Lands = 'Lands',
  Lockers = 'Lockers',
  LostAndFoundStations = 'LostAndFoundStations',
  NightlifeLocations = 'NightlifeLocations',
  Parades = 'Parades',
  PhoneCardDispensers = 'PhoneCardDispensers',
  Rentals = 'Rentals',
  Restrooms = 'Restrooms',
  Rides = 'Rides',
  ServiceAnimalRestAreas = 'ServiceAnimalRestAreas',
  Shops = 'Shops',
  SmokingAreas = 'SmokingAreas',
  Shows = 'Shows',
  GameHub = 'GameHub',
}

export enum UniversalShowType {
  Music = 'Music',
  Action = 'Action',
  Comedy = 'Comedy',
  Character = 'Character',
}
