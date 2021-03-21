export interface HolidayParkAttraction {
  'nid': string,
  'id': string,
  'name': string,
  'type': string,
  'currentWaitingTime': number,
  'showWaitingTime': boolean,
  'minHeight': string,
  'maxHeight': string,
  'minHeightSupervised': string,
  'description': string,
  'cat': string,
  'images': string,
  'icons': {
    'mobile_api_small': string[]
  },
  'temporarily_closed': boolean,
  'open_every_day': boolean,
  'default_timeblocks': string[],
  'timeblocks': string[],
  'openOn': string[],
  'attractionType': {
    '1': 'water',
    '10': 'familie',
    '11': 'action',
    '12': 'kids',
    '13': 'indoor',
  },
  'uniqueID': string
}
