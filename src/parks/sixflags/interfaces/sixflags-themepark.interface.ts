export interface SixflagsThemeparkInterface {
  'enableNativeCommerce': boolean,
  'acceptedBillingIds': number[],
  'parkId': number,
  'name': string,
  'address': string,
  'city': string,
  'state': string,
  'postalCode': string,
  'country': string,
  'phone': string,
  'renderLocation': {
    'heading': number,
    'radius': number,
    'latitude': number,
    'longitude': number
  },
  'entranceLocation': {
    'latitude': number,
    'longitude': number
  },
  'image': {
    [imageId: string]: string
  },
  'logo': {
    [imageId: string]: string
  },
  'couponsEnabled': boolean,
  'isWaterPark': boolean,
  'location': {
    'radius': number,
    'latitude': number,
    'longitude': number
  },
  'featuredRide': null,
  'featuredEvent': null,
  'featuredShow': null,
  'featuredSouvenir': null,
  'featuredFoodItem': null,
  'featuredProduct': null,
  'parkMapImageURL': {
    [imageId: string]: string
  },
  'tileServerURL': string,
  'routingURL': string,
  'isRoutingEnabled': boolean,
  'seasonal': [
    {
      'isff': boolean,
      'iship': boolean,
      'parkMapImageURL': {
        [imageId: string]: string
      },
      'icon': {
        [imageId: string]: string
      },
      'publishBegin': string,
      'publishEnd': string,
      'eventBegin': string,
      'eventEnd': string,
      'color': string,
      'featuredAttraction': null
    },
    {
      'isff': boolean,
      'iship': boolean,
      'parkMapImageURL': {
        '750': string,
        '1080': string,
        '1242': string,
        '1440': string
      },
      'icon': {
        '750': string,
        '1080': string,
        '1440': string
      },
      'publishBegin': string,
      'publishEnd': string,
      'eventBegin': string,
      'eventEnd': string,
      'color': string,
      'featuredAttraction': null
    }
  ],
  'photoProvider': string,
  'featuredPhotoItem': string,
  'wifiEnabled': boolean,
  'wifiName': null,
  'flashPassEnabled': boolean,
  'flashPassUrl': string,
  'enableMobileFoodOrdering': boolean,
  'venueNextUuId': string,
  'mapboxStyleUrl': string,
  'reservationUrl': string,
  'toastMessages': null
}
