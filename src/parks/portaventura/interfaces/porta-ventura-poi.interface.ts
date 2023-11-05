export interface PortaVenturaResponse {
  data: PortaVenturaPoi[];
}

export interface PortaVenturaPoi {
  'id': number,
  'attributes': {
    'name': string,
    'tagLine': string,
    'videoUrl': string,
    'latitude': number,
    'longitude': number,
    'description': string,
    'minimumHeight': number,
    'maximumHeight': number,
    'createdAt': string,
    'updatedAt': string,
    'publishedAt': string,
    'locale': string,
    'FTPName': string,
    'adultMinimumHeight': number,
    'openingTime': string,
    'closingTime': string,
    'closed': boolean,
    'closedReason': null,
    'customSlug': string,
    'images': PortaVenturaPoiImage,
    'area'?: {
      'data': {
        'id': number,
        'attributes': {
          'name': string
        }
      }
    },
    "park": {
      "data"?: {
        "id": number,
        "attributes": {
          "name": string
        }
      }
    },
  }
}

export interface PortaVenturaPoiImage {
  'data'?: [
    {
      'id': number,
      'attributes': {
        'formats': {
          'large': {
            'ext': string,
            'url': string,
            'hash': string,
            'mime': string,
            'name': string,
            'path'?: string,
            'size': number,
            'width': number,
            'height': number
          },
          'small': {
            'ext': string,
            'url': string,
            'hash': 'small_scale_1_3be48f4d0d',
            'mime': 'image/jpeg',
            'name': 'small_scale[1].jpg',
            'path': null,
            'size': 52.17,
            'width': 500,
            'height': 327
          },
          'medium': {
            'ext': string,
            'url': string,
            'hash': 'medium_scale_1_3be48f4d0d',
            'mime': 'image/jpeg',
            'name': 'medium_scale[1].jpg',
            'path': null,
            'size': 106.02,
            'width': 750,
            'height': 490
          },
          'thumbnail': {
            'ext': string,
            'url': string,
            'hash': string,
            'mime': string,
            'name': string,
            'path': null,
            'size': number,
            'width': number,
            'height': number
          }
        }
      }
    }
  ];
}
