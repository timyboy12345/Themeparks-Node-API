export interface AtraccionesResponseInterface {
  'data': AtraccionesResponseAtraccioneInterface[]
}

export interface AtraccionesResponseAtraccioneInterface {
  'bookingAutoReplyEmail': {
    'en': string,
    'es': string
  },
  'bookingConfirmAutoReplyEmail': {
    'en': string,
    'es': string
  },
  'bookingEmails': [
    string
  ],
  'bookingEnabled': number,
  'bookingSystem': number,
  'calendarEnabled': boolean,
  'category': number,
  'cmsModule': number,
  'currency': number,
  'currencyData': {
    'id': number,
    'currencyString': string,
    'currencyName': string,
    'symbol': string,
    'isoCode': string,
    'countryCode': string,
    'priority': number,
    'ts': string
  },
  'currentSeason': {
    'id': number,
    'name': {
      'es': string,
      'en': string
    },
    'service': number,
    'dayLimitBooking': number,
    'minutesLimitBooking': number,
    'minutesLimitBookingType': number,
    'bookingDaysRange': number,
    'maxPaxFromMobile': number,
    'isDefault': boolean,
    'seasonBehaviour': number,
    'status': number,
    'ts': string
  },
  'establishment': number,
  'externalBookingTranslatableUrl': {
    'es': string
  },
  'externalId': string,
  'galleryId': string,
  'id': number,
  'itemsCatalogEnabled': boolean,
  'leadsEnabled': boolean,
  'letsplayEnabled': boolean,
  'ordersEnabled': boolean,
  'paxSeparation': boolean,
  'paymentRequired': boolean,
  'photographs': number[],
  'place': {
    'point': {
      'latitude': number,
      'longitude': number,
      'hotelId': number,
      'hotelLevel': number,
      'targetGrouping': number
    },
    'service': number,
    'item': {
      'itemType': number,
      'itemId': number
    },
    'selected': string
  },
  'productsCatalogEnabled': boolean,
  'productsCombosEnabled': boolean,
  'productsCount': number,
  'published': boolean,
  'publishedTimestamp': string,
  'seatingsEnabled': boolean,
  'serviceOrder': number,
  'shareable': boolean,
  'status': number,
  'temporaryClosed': boolean,
  'textList': [
    {
      'text': {
        'es': string
      },
      'description': {
        'es': string
      },
      'icon': number,
      'iconUploaded': boolean,
      'order': number
    },
    {
      'text': {
        'es': string
      },
      'description': {
        'es': string
      },
      'icon': number,
      'iconUploaded': boolean,
      'order': number
    }
  ],
  'translatableDescription': {
    'es': string
  },
  'translatableName': {
    'en'?: string
    'es'?: string
    'de'?: string
  },
  'translatableReservationTitle': {
    'es': string
  },
  'translatableSubTitle': {
    'es': string
  },
  'ts': string,
  'type': number,
  'typeString': string,
  'waitingTime': number,
  'waitingTimeLastUpdate': string
}
