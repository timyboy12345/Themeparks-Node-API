export interface FuturoscopePoisResponseInterface {
  poi: FuturoscopePoiInterface[];
}

export interface FuturoscopePoiInterface {
  'id': string,
  'id_exploit': number,
  'id_plan_visit': string,
  'latitude': string,
  'longitude': string,
  'order': number,
  'infos': [] | { description: string, label: string },
  'medias': [
    {
      'image': string
    }
  ],
  'lang': string,
  'program': boolean,
  'title': string,
  'type': 'attraction' | 'hotel' | 'shop' | 'restaurant' | 'service' | 'wc' | 'bar',
  'details': [
    {
      'text': string
    }
  ],
  'schedule': string,
  'continuous': boolean,
  'id_plan': string,
  'share'?: string,
  'tags': string,
  'duration'?: string,
  'theme': 'Fun for all' | 'Waiter service' | 'Self-service' | 'Fast Food' | 'Take away meals' | 'Thrills' | 'Shows',
  'quizz': number,
  'pdfmenu': string,
}
