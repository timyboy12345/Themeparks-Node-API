export interface BlijdorpAnimalsResponseInterface {
  'items': BlijdorpAnimalInterface[]
  'nextPage': number | null,
  'maxPage': number
}

export interface BlijdorpAnimalInterface {
  'title': string,
  'description': string,
  'link': string,
  'image': {
    'dimensions': {
      'width': number,
      'height': number
    },
    'alt': string,
    'copyright': null,
    'url': string,
    'id': string,
    'edit': {
      'x': number,
      'y': number,
      'zoom': number,
      'background': string
    }
  },
  'category': string,
  'species': string,
  'threat_level': 'endangered' | 'critically_endangered' | 'least_concern' | 'near_threatened' | 'vulnerable'
}
