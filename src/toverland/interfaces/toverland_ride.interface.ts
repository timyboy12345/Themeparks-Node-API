import { ToverlandTranslatable } from './toverland_translatable.interface';

export interface ToverlandRide {
  'id': number,
  'name': string,
  'area_id': number,
  'latitude': number,
  'longitude': number,
  'short_description': ToverlandTranslatable,
  'description': ToverlandTranslatable;
  'thumbnail': string,
  'minLength': number,
  'supervision': any,
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
  'opening_times': []
}
