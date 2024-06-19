export interface PortaventuraBaseRideInterface {
  'id': string,
  'name': string,
  'latitude': number,
  'longitude': number,
  'minimumHeight': number,
  'adultMinimumHeight': number, // 1.3
  'closed': boolean,
  'schedule': { open: string, close: string }[],
  'queue': number,
  'status': 'ok',
  'area': string | null,
  'park': string,
  'images': string[],
  'express': boolean,
  'order': number,
  'tags': PortaventuraTag[],
  'logo': string,
  'thumbnail': string,
  'maximumHeight': number,
  'urls': [],
  'similar': {
    'data': {
      'id': number,
      'attributes': {}
    }[]
  },
  'videoUrl': string | null, // YouTube URL
  'description': string,
  'tagLine': string
}

export interface PortaventuraTag {
  'name': string,
  'icon': string | null,
  'filters': PortaventuraFilter[]
}

export interface PortaventuraFilter {
  'id': number,
  'attributes': {
    'customSlug': string
  }
}

export interface PortaventuraWaitingTime {
  "id": string,
  "queue": number,
  "status": "ok",
  "closed": boolean,
  "schedule": {
    'open': string,
    'close': string
  }[]
}
