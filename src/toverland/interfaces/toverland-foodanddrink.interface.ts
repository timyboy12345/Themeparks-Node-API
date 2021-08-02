import { ToverlandTranslatable } from './toverland-translatable.interface';

export interface ToverlandFoodAndDrink {
  'id': 8,
  'name': string
  'area_id': number,
  'latitude': string,
  'longitude': string,
  'short_description': ToverlandTranslatable,
  'description': ToverlandTranslatable,
  'thumbnail': string
  'header_description': ToverlandTranslatable,
  'last_status': {
    'id': number,
    'food_and_drink_id': number,
    'status_id': number,
    'status': {
      'id': number,
      'name': ToverlandTranslatable
    }
  },
  'opening_times': any[]
}
