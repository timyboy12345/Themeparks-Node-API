import { PhantasialandTranslatable } from './phantasialand-translatable.interface';

export interface PhantasialandPoi {
  'poiNumber': number,
  'minAge': null,
  'maxAge': null,
  'minSize': number,
  'maxSize': null,
  'minSizeEscort': number,
  'tags': string[],
  'category': string,
  'slug': null,
  'area': string,
  'parkMonitorReferenceName': string,
  'seasons': string[],
  'navigationEnabled': boolean,
  'id': number,
  'createdAt': string,
  'updatedAt': string,
  'titleImage': {
    'id': number,
    'url': string
  },
  'title': PhantasialandTranslatable,
  'tagline': PhantasialandTranslatable,
  'description': PhantasialandTranslatable,
  'entrance': {
    'id': null,
    'world': {
      'lat': number,
      'lng': number
    },
    'map': {
      'lat': number,
      'lng': number
    }
  },
  'exit': null,
  'preferredDestinations': [],
  'weblink': PhantasialandTranslatable
}
