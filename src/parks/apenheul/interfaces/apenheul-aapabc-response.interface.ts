export interface ApenheulAapABCResponseInterface {
  'items': ApenheulAapABCItemResponseInterface[],
  'total': number
}

export interface ApenheulAapABCItemResponseInterface {
  'continents': [],
  'weight': string,
  'iucnStatus': string,
  'id': number,
  'link': {
    'url': string,
    'target': string,
    'rel': null,
    'name': string,
    'alt': null,
    'extraClasses': null
  },
  'title': string,
  'intro': string,
  'image': {
    'url': string,
    'alt': null,
    'caption': null,
    'sourceSets':
      {
        'url': string,
        'type': string,
        'media': null
      }[]
  },
  'date': string,
  'tags': null,
  'cardType': 1
}
