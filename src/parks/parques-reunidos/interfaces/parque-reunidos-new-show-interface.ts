export interface ParqueReunidosNewShowInterface {
  data: ParqueReunidosNewShowItemInterface[];
}

export interface ParqueReunidosNewShowItemInterface {
  'endHour': string,
  'eventDay': string,
  'eventType': number,
  'hour': string,
  'id': number,
  'place'?: {
    'point': {
      'latitude': number,
      'longitude': number,
      'hotelId': number,
      'hotelLevel': number
    },
    'service': number,
    'item': {
      'itemType': number,
      'itemId': number
    },
    'selected': 'point'
  },
  'repetition': number,
  'service': number,
  'translatableName': {
    'fr': string,
    'en': string,
    'es': string
  },
  'ts': string,
  'participants': []
}
