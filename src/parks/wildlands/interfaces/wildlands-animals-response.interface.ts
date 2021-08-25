export interface WildlandsAnimalsResponseInterface {
  'data': {
    'items': WildlandsAnimalsResponseItemInterface[]
  },
  'pagination': {
    'pagination': {
      'current_page': number,
      'pages': number,
      'first_item': number,
      'last_item': number,
      'item_amount': number,
      'itemsperpage': number,
      'translation_shown': string,
      'translation_of': string,
      'control_items': [
        {
          'number': number
        },
        {
          'number': number
        },
        {
          'number': number,
          'current': number
        },
        {
          'number': number
        },
        {
          'number': number
        }
      ],
      'previous': {
        'number': number
      },
      'next': {
        'number': number
      }
    },
    'secondary_pagination': {
      'current_page': number,
      'pages': number,
      'first_item': number,
      'last_item': number,
      'item_amount': number,
      'itemsperpage': number,
      'translation_shown': string,
      'translation_of': string
    }
  }
}

export interface WildlandsAnimalsResponseItemInterface {
  'id': string,
  'url': string,
  'title': string,
  'world': string,
  'style_class': string,
  'photo': {
    '390x225': string,
    '750x330': string,
    '400x230': string,
    '105x60': string
  },
  'filters': WildlandsAnimalsResponseFilterItemInterface[]
}

export interface WildlandsAnimalsResponseFilterItemInterface {
  'name': string,
  'alias': string
}
