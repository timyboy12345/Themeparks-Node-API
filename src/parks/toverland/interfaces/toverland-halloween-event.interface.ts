import { ToverlandTranslatable } from './toverland-translatable.interface';

export interface ToverlandHalloweenEvent {
  'id': number,
  'name': string,
  'area_id': string,
  'latitude': string,
  'longitude': string,
  'short_description': ToverlandTranslatable,
  'description': ToverlandTranslatable,
  'type_id': number,
  'thumbnail': string,
  'header_description': ToverlandTranslatable,
  'youtube_link'?: string,
  'button_link': ToverlandTranslatable,
  'button_text': ToverlandTranslatable,
  'show_times': []
}
