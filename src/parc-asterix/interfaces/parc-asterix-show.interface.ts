export interface ParcAsterixShow {
  'title': string,
  'order': number,
  'code': number,
  'changed': number,
  'translations': {
    'fr': number,
    'en': number,
    'es': number,
    'nl': number
  },
  'periode_fermeture':
    {
      'value': string,
      'value2': string,
      'timezone': string,
      'timezone_db': string,
      'date_type': string
    }[],
  'new': boolean,
  'best': boolean,
  'summary': string,
  'description': string,
  'slider_images': string[],
  'phrase_accroche': string,
  'latitude': string,
  'longitude': string,
  'header': string,
  'thumbnail': string,
  'thumbnail_v2': string,
  'header_v2': string,
  'feature': { 'icon': string, 'label': string, 'value': string }[],
  'mapid': number
}
