import { ToverlandTranslatable } from './toverland-translatable.interface';

export interface ToverlandRide {
  'id': number,
  'name': string,
  'area_id': string,
  'latitude': string,
  'longitude': string,
  'short_description': ToverlandTranslatable,
  'description': ToverlandTranslatable;
  'thumbnail': string,
  'minLength'?: string,
  'supervision'?: string,
  'header_description': ToverlandTranslatable;
  'last_status': {
    'ride_id': number,
    'status_id': number,
    'status': {
      'id': number,
      'name': ToverlandTranslatable
    }
  },
  'last_waiting_time': {
    'ride_id': number,
    'waiting_time': number
  },
  'opening_times': ToverlandRideOpeningTime[]
}

export interface ToverlandRideOpeningTime {
  ride_id: string,
  'start': string,
  'end': string
}
