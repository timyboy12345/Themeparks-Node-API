export interface ParcAsterixResponseInterface {
  'data': {
    'openAttractions': ParcAsterixResponseAttractionInterface[],
    'openShows': ParcAsterixResponseShowInterface[],
    'restaurants': ParcAsterixResponseRestaurantInterface[],
    'hotels': ParcAsterixResponseHotelInterface[]
  },
  'extensions': {
    'lighthouse_subscriptions': {
      'version': number,
      'channels': []
    }
  }
}

export interface ParcAsterixResponseAttractionInterface {
  'id': string,
  'drupalId': string,
  'title': string,
  'slug': string,
  'summary': string,
  'description': string,
  'experience': {
    'id': ParcAsterixAttractionsExperienceEnum,
    'label': string,
    'color': string,
    '__typename': 'Experience'
  },
  'mapId': string,
  'latitude': number,
  'longitude': number,
  'features': ParcAsterixResponseFeatureInterface[],
  'headerV1': string,
  'thumbnailV1': null,
  'headerV2': string,
  'thumbnailV2': null,
  'sliders': ParcAsterixResponseSliderInterface[],
  'minAge': number,
  'order': number,
  'isNew': boolean,
  'isBest': boolean,
  'hasQueuingCut': boolean,
  'hasQueuingCutFear': boolean,
  'hasPicturePoint': boolean,
  'blocks': {
    'min_size': ParcAsterixResponseFeatureInterface,
    'universe': ParcAsterixResponseFeatureInterface,
    'min_size_accompanied': ParcAsterixResponseFeatureInterface,
    'experience': ParcAsterixResponseFeatureInterface
  },
  'labels': {
    'type': ParcAsterixResponseFeatureInterface,
    'min_size': ParcAsterixResponseFeatureInterface,
    'min_size_accompanied': ParcAsterixResponseFeatureInterface
  },
  '__typename': 'Attraction'
}

export enum ParcAsterixAttractionsExperienceEnum {
  'Pour_toute_la_famille' = 1,
  'Sensations_fortes' = 7,
  'Petits_Gaulois' = 10
}

export interface ParcAsterixResponseRestaurantInterface {
  'id': string,
  'drupalId': string,
  'title': string,
  'slug': string,
  'type': string,
  'kind': string,
  'theme': string,
  'universe': string,
  'summary': string,
  'description': string,
  'header': string,
  'sliders': ParcAsterixResponseSliderInterface[],
  'mapId': string,
  'latitude': number,
  'longitude': number,
  'menuUrl': string,
  'mobileUrl': string,
  'related': {
    'id': string,
    '__typename': string
  }[],
  'blocks': {
    'kind': ParcAsterixResponseFeatureInterface,
    'theme': ParcAsterixResponseFeatureInterface,
    'universe': ParcAsterixResponseFeatureInterface
  },
  'labels': [],
  '__typename': 'Restaurant'
}

export interface ParcAsterixResponseShowInterface {
  "id": string,
  "drupalId": string,
  "title": string,
  "slug": string,
  "summary": string,
  "description": string,
  "mapId": string,
  "latitude": number,
  "longitude": number,
  "features": ParcAsterixResponseFeatureInterface[],
  "closingTimes": ParcAsterixResponseShowTimeInterface[],
  "headerV1": null,
  "thumbnailV1": null,
  "headerV2": string,
  "thumbnailV2": null,
  "sliders": ParcAsterixResponseSliderInterface[],
  "minAge": number,
  "order": number,
  "isNew": boolean,
  "isBest": boolean,
  "schedules": [
    "11h30",
    "14h00",
    "15h30",
    "17h00"
  ],
  "scheduleIsFrom": false,
  "blocks": {
    "type": ParcAsterixResponseFeatureInterface
  },
  "labels": string[],
  "__typename": "Show"
}

export interface ParcAsterixResponseHotelInterface {"id": "7",
  "drupalId": string,
  "title": string,
  "slug": string,
  "summary": string,
  "description": string,
  "latitude": number,
  "longitude": number,
  "features": ParcAsterixResponseFeatureInterface[],
  "fromPriceAdult": null,
  "fromPriceKid": null,
  "priceAdult": null,
  "priceKid": null,
  "header": string,
  "thumbnail": null,
  "sliders": ParcAsterixResponseSliderInterface[],
  "offers": null,
  "order": number,
  "stars": number,
  "blocks": [],
  "labels": [],
  "__typename": "Hotel"
}

export interface ParcAsterixResponseFeatureInterface {
  'icon': string,
  'text': string,
  'shortText': string,
  'value': string,
  'color'?: string | ParcAsterixResponseColorEnum,
  '__typename': 'Feature'
}

export interface ParcAsterixResponseSliderInterface {
  'picture': string,
  'order': number,
  '__typename': 'Slider'
}

export enum ParcAsterixResponseColorEnum {
  $colorMapSensation = '$colorMapSensation',
  $colorBlue = '$colorBlue',
  $colorGreenLight = '$colorGreenLight',
  $colorOrangeLight = '$colorOrangeLight',
  $colorOrange = '$colorOrange',
  $colorPurple = '$colorPurple'
}

export interface ParcAsterixResponseShowTimeInterface {
  "startAt": string,
  "endAt": string,
  "timezone": "Europe/Paris",
  "__typename": "ShowClosingTime"
}
