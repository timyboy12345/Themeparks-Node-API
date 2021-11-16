export interface SixflagsMapItemInterface extends SixflagsRideMapItemInterface, SixflagsEventMapItemInterface, SixflagsEventMapItemInterface, SixflagsFacilityMapItemInterface, SixflagsRestaurantMapItemInterface, SixflagsShopMapItemInterface {
  'tagLine': string,
  'videoUri': string,
  'adaGuidelinesUri': string,
  'rideInfoUri': string,
  'parkSection': string,
  'rideAttributes': {},
  'images': [
    {
      [imageId: string]: string
    }
  ],
  'accessoRideId': string,
  'parkId': number,
  'name': string,
  'description': string,
  'isFlashPassEligible': boolean,
  'thumbnailUri': string,
  'thrillLevel': string,
  'minimumHeight': number,
  'minimumHeightDisplay': string,
  'status': string,
  'waitTime': null,
  'entranceLocation': {
    'latitude': number,
    'longitude': number
  },
  'renderLocation': {
    'heading': number,
    'radius': number,
    'latitude': number,
    'longitude': number
  },
  'isFeatured': boolean,
  'isRegularSeason': boolean,
  'isNew': boolean,
  'isFeeRequired': boolean,
  'seasonal': [
    {
      'isff': boolean,
      'iship': boolean,
      'name': string,
      'description': string,
      'thumbnailUri': string,
      'images': [
        {
          '1440': string,
          '1080': string,
          '750': string
        }
      ],
      'isNew': boolean
    }
  ],
  'upsellKeywords': [],
  'checkInLocation': {
    'latitude': number,
    'longitude': number,
    'radius': number
  },
  'toastMessages': string
}

export interface SixflagsRideMapItemInterface {
  rideId: number;
  rideType: SixflagsRideRideTypeMapEnum[];
}

export enum SixflagsRideRideTypeMapEnum {
  RideTypeThrill = 'RideTypeThrill',
  RideTypeFamily = 'RideTypeFamily',
  RideTypeKids = 'RideTypeKids',
  RideTypeFFRide = 'RideTypeFFRide',
  RideTypeHIPRide = 'RideTypeHIPRide'
}

export interface SixflagsRestaurantMapItemInterface {
  restaurantId: number;
  menuItems: SixflagsRestaurantMenuItemMapInterface[];
  restaurantOptions: string[];
  cuisines: string[];
}

export interface SixflagsRestaurantMenuItemMapInterface {
  name: string;
  menuItemType: number;
  toastMessages: any;
}

export interface SixflagsEventMapItemInterface {
  body: string;
  eventId: number;
  eventDetailsUri: string;
  isTentPole: boolean;
  ffImages: {
    [imageId: string]: string
  };
  hipImages: {
    [imageId: string]: string
  };
  eventDates: SixflagsEventEventDateMapItemInterface[];
}

export interface SixflagsEventEventDateMapItemInterface {
  'eventDateId': number,
  'eventId': number,
  'eventStart': string,
  'eventEnd': string,
}

export interface SixflagsShopMapItemInterface {
  shopId: number;
  merchandiseTypes: string[];
}

export interface SixflagsFacilityMapItemInterface {
  facilityId: number;
  facilityType: string;
}