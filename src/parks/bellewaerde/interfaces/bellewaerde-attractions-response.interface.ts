export interface BellewaerdeAttractionResponseInterface {
  'title': string,
  'waitingTimeName': string, // Also known as the ID
  'subtitle': string,
  'description': string,
  'shortDescription': string,
  'mainImage': BellewaerdeMediaInterface,
  'mainVideo': string,
  'type': {
    'id': 'blw:attraction-target-groups/kids' | 'blw:attraction-target-groups/families' | 'blw:attraction-target-groups/sensations' | 'blw:restaurant-types/fast-food' | 'blw:restaurant-types/sweets' | 'blw:restaurant-types/snacks' | 'blw:restaurant-types/self-service',
    'title': 'Families' | 'Kinderen' | 'Sensaties' | 'Fast Food' | 'Zoetigheden' | 'Snacks' | 'Zelfbediening'
  },
  'subType': [
    {
      'id': 'blw:attraction-types/water' |  'blw:attraction-types/indoor' |  'blw:attraction-types/rollercoaster' |  'blw:attraction-types/spinning',
      'title': 'Water' | 'Draaiend' | 'Achtbaan' | 'Overdekt'
    }
  ],
  'longitude': number,
  'latitude': number,
  'zone': {
    'id': 'blw:zones/canada' | 'blw:zones/india' | 'blw:zones/kids-park' | 'blw:zones/mundo-amazonia' | 'blw:zones/jungle',
    'title': 'Canada' | 'Jungle' | 'KidsPark' | 'Mexico' | 'Mundo Amazonia',
  },
  'zoneContentFragment': {
    'name': string,
    'mainImage': BellewaerdeMediaInterface,
    'description': string
  },
  'status': [],
  'statusText': '',
  'fearLevel': null,
  'scareOMeterImage': null,
  'services': [],
  'buySpeedyPassCTA': '',
  'buyTicketsCTA': '',
  'accessibilities': [
    {
      'title': 'Niet geschikt voor zwangere vrouwen',
      'description': '<p>Niet geschikt voor zwangere vrouwen.</p>\n',
      'icon': '/content/dam/blw/nl/website-elementen/iconen/zwart/doelgroepen/icoon-vrienden.svg'
    }
  ],
  'heightSoloRide': number,
  'heightAccompaniedByAdult': number,
  'minHeightNotAllowed': number,
  'maxHeightNotAllowed': number,
  'accessibilityImage': BellewaerdeMediaInterface,
  'rideDetails': {
    'speed': number,
    'yearOfConstruction': number,
    'capacity': number,
    'airTime': number,
    'duration': number,
    'waterDepth': number,
    'access': '',
    'schedule': '',
    'rateEntrance': '',
    'looping': number,
    'height': number,
    'length': number
  },
  'gallery': []
}

export interface BellewaerdeMediaInterface {
  'path': string,
  'url': string,
  'focusPositionX': null,
  'focusPositionY': null,
  'renditions': [
    {
      'url': '/content/dam/blw/nl/afbeeldingen/attracties/niagara/niagara-boot-water-golf-avond.jpg/_jcr_content/renditions/cq5dam.thumbnail.48.48.png',
      'width': 48
    },
    {
      'url': '/content/dam/blw/nl/afbeeldingen/attracties/niagara/niagara-boot-water-golf-avond.jpg/_jcr_content/renditions/cq5dam.thumbnail.140.100.png',
      'width': 140
    },
    {
      'url': '/content/dam/blw/nl/afbeeldingen/attracties/niagara/niagara-boot-water-golf-avond.jpg/_jcr_content/renditions/cq5dam.thumbnail.319.319.png',
      'width': 319
    },
    {
      'url': '/content/dam/blw/nl/afbeeldingen/attracties/niagara/niagara-boot-water-golf-avond.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
      'width': 1280
    },
    {
      'url': '/content/dam/blw/nl/afbeeldingen/attracties/niagara/niagara-boot-water-golf-avond.jpg/_jcr_content/renditions/cq5dam.zoom.2048.2048.jpeg',
      'width': 2048
    }
  ],
  'type': 'IMAGE'
}
