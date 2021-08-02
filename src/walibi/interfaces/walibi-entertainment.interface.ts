export interface WalibiEntertainment {
  'uuid': string,
  'serviceCode': string,
  'title': string,
  'description': string,
  'image': {
    'url': string,
    'thumbnailUrl': string
  },
  'category': {
    'id': string,
    'name': string,
    'weight': number,
    'icon': {
      'iconType': string,
      'imageUrl': string
    }
  },
  'location': {
    'lat': string,
    'lon': string
  },
  'additionalContent': [
    {
      'title': string,
      'text': string,
      'image': {
        'url': string,
        'thumbnailUrl': string
      }
    }
  ],
  'status': string
}
