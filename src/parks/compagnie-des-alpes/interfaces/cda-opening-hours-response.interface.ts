export interface CdaOpeningHoursResponseInterface {
  'calendar': {
    [key: string]: {
      'months': {
        [key: string]: {
          'monthNumber': number,
          'localizedMonth': string,
          'days': {
            [key: string]: {
              'dayNumber': number,
              'localizedDay': string,
              'events': string[],
              'openingHour': string,
              'closingHour': string,
              'ticket': null,
              'closed': boolean,
              'soldOut': boolean,
              'crowdy': boolean
            }
          }
        },
      }
    }
  },
  'events': {
    '/content/dam/blw/nl/opening-hour-events/1000-1800': {
      'title': '10:00 - 18:00',
      'icon': '',
      'color': '#92d050',
      'link': ''
    },
    '/content/dam/blw/nl/opening-hour-events/halloween': {
      'title': 'Halloween',
      'icon': '',
      'color': '#eb6123',
      'link': '/content/blw/park/nl/het-park/evenementen/halloween'
    },
    '/content/dam/blw/nl/opening-hour-events/1100-1900': {
      'title': '11:00 - 19:00',
      'icon': '',
      'color': '#002060',
      'link': ''
    },
    '/content/dam/blw/nl/opening-hour-events/1000-1900': {
      'title': '10:00 - 19:00',
      'icon': '',
      'color': '#0099cc',
      'link': ''
    },
    '/content/dam/blw/nl/opening-hour-events/halloween-nocturne': {
      'title': 'Halloween nocturnes',
      'icon': '',
      'color': '#001F3F',
      'link': '/content/blw/park/nl/het-park/evenementen/halloween'
    },
    '/content/dam/blw/nl/opening-hour-events/1000-2000': {
      'title': '10:00 - 20:00',
      'icon': '',
      'color': '#ff7c80',
      'link': ''
    },
    '/content/dam/blw/nl/opening-hour-events/summer-evening': {
      'title': 'Summer Evening',
      'icon': '',
      'color': '#FF4136',
      'link': ''
    },
    '/content/dam/blw/nl/opening-hour-events/1000-2100': {
      'title': '10:00 - 21:00',
      'icon': '',
      'color': '#9933ff',
      'link': ''
    },
    '/content/dam/blw/nl/opening-hour-events/1000-2200': {
      'title': '10:00 - 22:00',
      'icon': '',
      'color': '#ed7d31',
      'link': ''
    },
    '/content/dam/blw/nl/opening-hour-events/kerst': {
      'title': 'Kerst',
      'icon': '',
      'color': '#cb312b',
      'link': '/content/blw/park/nl/het-park/evenementen/kerst'
    },
    '/content/dam/blw/nl/opening-hour-events/1000-1700': {
      'title': '10:00 - 17:00',
      'icon': '',
      'color': '#ffc000',
      'link': ''
    },
    '/content/dam/blw/nl/opening-hour-events/1100-1700': {
      'title': '11:00 - 17:00',
      'icon': '',
      'color': '#806000',
      'link': ''
    }
  }
}
