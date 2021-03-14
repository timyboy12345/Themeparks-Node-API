export interface DisneylandParisAttraction {
  'id': string,
  'contentType': string,
  'entityType': string,
  'contentId': string,
  'url': string,
  'pageLink': {
    'tcmId': string,
    'title': string,
    'regions': [
      {
        'contentId': string,
        'templateId': string,
        'schemaId': string
      },
      {
        'contentId': string,
        'templateId': string,
        'schemaId': string
      },
      {
        'contentId': string,
        'templateId': string,
        'schemaId': string
      }
    ]
  },
  'hideFunctionality': string,
  'name': string,
  'squareMediaMobile': {
    'url': string,
    'alt': string
  },
  'subType': string,
  'location': {
    'id': string,
    'value': string,
    'urlFriendlyId': string,
    'iconFont': string,
    'pageLink': null
  },
  'coordinates': [
    {
      'lat': number,
      'lng': number,
      'type': string
    }
  ],
  'closed': boolean,
  'schedules': [],
  'heroMedia': {
    'url': string
  },
  'age': [
    {
      'id': string,
      'value': string,
      'urlFriendlyId': string,
      'iconFont': string
    },
    {
      'id': string,
      'value': string,
      'urlFriendlyId': string,
      'iconFont': string
    }
  ],
  'height': [
    {
      'id': string,
      'value': string,
      'urlFriendlyId': string,
      'iconFont': string
    }
  ],
  'interests': [
    {
      'id': string,
      'value': string,
      'urlFriendlyId': string,
      'iconFont': string
    }
  ],
  'photopass': boolean,
  'fastPass': boolean,
  'singleRider': boolean,
  'mobilityDisabilities': [
    {
      'id': string,
      'value': string,
      'urlFriendlyId': string,
      'iconFont': string
    },
    {
      'id': string,
      'value': string,
      'urlFriendlyId': string,
      'iconFont': string
    },
    {
      'id': string,
      'value': string,
      'urlFriendlyId': string,
      'iconFont': string
    },
    {
      'id': string,
      'value': string,
      'urlFriendlyId': string,
      'iconFont': string
    },
    {
      'id': string,
      'value': string,
      'urlFriendlyId': string,
      'iconFont': string
    },
    {
      'id': string,
      'value': string,
      'urlFriendlyId': string,
      'iconFont': string
    },
    {
      'id': string,
      'value': string,
      'urlFriendlyId': string,
      'iconFont': string
    },
    {
      'id': string,
      'value': string,
      'urlFriendlyId': string,
      'iconFont': string
    },
    {
      'id': string,
      'value': string,
      'urlFriendlyId': string,
      'iconFont': string
    },
    {
      'id': string,
      'value': string,
      'urlFriendlyId': string,
      'iconFont': string
    },
    {
      'id': string,
      'value': string,
      'urlFriendlyId': string,
      'iconFont': string
    }
  ],
  'serviceAnimals': [
    {
      'id': string,
      'value': string,
      'urlFriendlyId': string,
      'iconFont': string
    }
  ],
  'physicalConsiderations': []
}
