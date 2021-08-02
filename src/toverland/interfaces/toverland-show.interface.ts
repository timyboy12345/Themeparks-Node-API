import { ToverlandTranslatable } from './toverland-translatable.interface';

export interface ToverlandShow {
  'id': number,
  'name': string,
  'area_id': string,
  'latitude': string,
  'longitude': string,
  'short_description': ToverlandTranslatable,
  'description': ToverlandTranslatable,
  'thumbnail': string,
  'header_description': ToverlandTranslatable,
  'area': {
    'id': number,
    'name': string
  },
  'times': ToverlandShowTime[]
}

export interface ToverlandShowTime {
  show_id: string,
  start: string,
}
