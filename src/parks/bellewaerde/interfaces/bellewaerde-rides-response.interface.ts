export interface BellewaerdeRidesResponseInterface {
  'texts': {
    'noneHeightNoticeText': string,
    'heightNoticeText': string,
    'heightAloneNoticeText': string,
    'heightAdultNoticeText': string,
    'closedNoticeText': string,
    'maintenanceNoticeText': string,
    'reopenedNoticeText': string,
    'isNewLabelText': string,
    'winScrollText': string,
    'macScrollText': string
  },
  'markers': BellewaerdeRidesResponseRideInterface[]
}

export interface BellewaerdeRidesResponseRideInterface {
  'x': number,
  'y': number,
  'url': string,
  'type': string,
  'entity_type': string,
  'icon_svg': string,
  'icon_png': '',
  'category': BellewaerdeRidesResponseCategory,
  'category_id': number,
  'title': string,
  'categories': [
    {
      'icon_svg': string,
      'icon_png': '',
      'category': string,
      'category_id': number
    }
  ],
  'height': number,
  'heightAlone': number,
  'heightAdult': number,
  'imgUrl': string,
  'color': string,
  'fear_level': null,
  'isNew': number,
  'isClosed': number,
  'reopenedDate': string,
  'isMaintenance': number,
  'inverse': number,
  'inverse_text': string,
  'inverse_image': '',
  'single_rider': number,
  'fast_lane': number
}

export enum BellewaerdeRidesResponseCategory {
  Show = 'Show',
  Splash = 'Splash',
  Familie = 'Familie',
  Spannend = 'Spannend',
  Kids = 'Kids',
  Duizelig = 'Duizelig',
}
