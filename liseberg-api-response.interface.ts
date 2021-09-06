export interface LisebergApiResponseItemInterface {
  'id': number,
  'title': string,
  'description'?: string,
  'type': LisebergApiResponseCategory,
  'lat'?: number,
  'lng'?: number,
  'coordinates'?: {
    'latitude': number,
    'longitude': number
  },
  'linkUrl'?: string,
  'images'?: {
    'original': string,
    'small': string
  },
  'state'?: {
    'minWaitTime': number,
    'maxWaitTime': number,
    'status': 'Currently closed' | '',
    'isOpen': boolean
  },
  'open'?: string,
  'ticketInformation'?: string,
  'heightLimitation'?: 'At least 90 cm or no height limit if accompanied by adult' | 'At least 9 years old' | 'At least 140 cm' | 'At least 110 cm or no height limit if accompanied by adult' | 'At least 110 cm or 90 cm if accompanied by adult' | 'At least 130 cm or 90 cm if accompanied by adult' | 'At least 110 cm' | 'At least 130 cm or no height limit if accompanied by adult' | 'At least 132 cm and 7 years old' | 'At least 130 cm and 7 years old' | 'Everyone can ride!',
  'seasons'?: string,
  'virtualQueueId'?: string
}

export enum LisebergApiResponseCategory {
  attraction = 'attraction',
  eatery = 'eatery',
  venue = 'venue',
  shop = 'shop',
  pentathlon = 'pentathlon',
  service = 'service',
  'wheel-of-fortune' = 'wheel-of-fortune',
}
