export interface OuwehandsDierenparkResponseInterface {
  'data': OuwehandsDierenparkResponseItemInterface[]
  'pagination': {
    'pages': number,
    'itemsperpage': number
  }
}

export interface OuwehandsDierenparkResponseItemInterface {
  'title': string,
  'subtitle'?: string,
  'image': string,
  'image_size': number,
  'url': string,
  'description': string
}

export interface OuwehandsDierenparkResponseImageInterface {
  'src': string | 'resolution_not_found'
  'base'?: string;
  'alt': '',
  'title': '',
  'renditions': {
    'large': {
      '800x275': {
        'src': string | 'resolution_not_found'
      },
      '800x275_webp': {
        'src': string | 'resolution_not_found'
      }
    },
    'small': {
      '400x380': {
        'src': string | 'resolution_not_found'
      },
      '400x380_webp': {
        'src': 'resolution_not_found'
      }
    },
    'large_zoek': {
      '600x400': {
        'src': string | 'resolution_not_found'
      },
      '600x400_webp': {
        'src': string | 'resolution_not_found'
      }
    },
    'small_zoek': {
      '300x300': {
        'src': string | 'resolution_not_found'
      },
      '300x300_webp': {
        'src': string | 'resolution_not_found'
      }
    }
  }
}
