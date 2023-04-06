export interface TivoliDataResponseInterface {
  error?: boolean,
  'rides': {
    Data: Ride[],
    LastUpdatedUtc: string
  }
  'food': {
    'Data': Food[],
    'LastUpdatedUtc': '/Date(1636455310000)/'
  },
  events: {
    'Data': Event[],
    'LastUpdatedUtc': string
  },
  locations: {
    'Data': Location[],
    'LastUpdatedUtc': string
  },
}

export interface Ride {
  'Identifier'?: string,
  'BeaconId': number,
  'BookMinutesBeforeClose': number,
  'AccessAge': '' | 'All' | 'All ages' | 'Minimum 12 years' | 'Over 18 years' | 'Min. 6 years old' | 'Min. 3 years old' | 'Minimum 8 years',
  'AccessMinHeight': '' | 'All' | 'Minimum 120 cm.',
  'AccessWheelChair': boolean,
  'AccessHealthInformation': boolean,
  'AccessPrice': '1 game for 20 DKK',
  'AccessNotes': 'Follows park opening hours',
  'RideSpeedRate': number,
  'RideActionRate': number,
  'AccessAgeValue'?: number,
  'AccessMinHeightValue'?: number,
  'AccessPriceValue'?: number,
  'IsGame': boolean,
  'ActivityStatus': {
    'Title': string,
    'Label': string,
    'Type': number
  },
  'IsActive': boolean,
  'Facts': Fact[],
  'OpeningHoursPeriods': [],
  'MediaListMedia': [],
  'Placement': PlacementLocation,
  'Keywords': string[],
  'MediaListImages': string[],
  'IntroductionHeadline': string,
  'IntroductionDescription': string,
  'IntroductionDescriptionSecondaryHeadline': string,
  'IntroductionDescriptionSecondary': string,
  'IntroductionImage'?: string,
  'IntroductionLinkAlternative': string,
  'IntroductionLinkExtra': string,
  'IntroductionLinkExtra2': string,
  'IntroductionShowAsText': boolean,
  'IntroductionShowAsTextHighlight': boolean,
  'PageTitle': string,
  'PageSubtitle': string,
  'PageManchet': string,
  'PageText': string,
  'Id': string
}

export interface Fact {
  'Label': string | 'Height' | 'Built' | 'Number of fish' | 'Maker' | 'Speed' | 'Number of Gondolas' | 'Length of ride' | 'Number of scenes' | 'Number of trunks' | 'G-effect' | 'Number of passengers per ride' | 'Number of boats' | 'Number of different animals' | 'Number of loops' | 'Number of cars' | 'Roller Coaster type' | 'Number of ships' | 'Number of diamonds' | 'Quantity of water' | 'Capacity' | 'Power consumption' | 'Number of bends' | 'Time in the dark' | 'Ride time' | 'Rotating axles',
  'Value': string
}

export interface PlacementLocation {
  'IsOutsideOfTivoli': boolean,
  'LocationLatitude': string,
  'LocationLongitude': string
}

export interface Food {
  'SmileyLink': string,
  'KitchenCategories': string[],
  'PriceCategories': string[],
  'FoodCategories': string[],
  'SpecialConditions': string[],
  'DiscountCategories': string[],
  'NumberOfPeople': string[],
  'PrivateCategories': string[],
  'BusinessCategories': string[],
  'Phone': string,
  'Email': string,
  'Website': string,
  'Booking': '',
  'ClickAndCollectOutletId': string,
  'LocationCategory': string,
  'MenuItems': [],
  'OpeningHoursPeriods': [],
  'Placement': PlacementLocation,
  'Keywords': string[],
  'MediaListImages': string[],
  'IntroductionHeadline': string,
  'IntroductionDescription': string,
  'IntroductionDescriptionSecondaryHeadline': string,
  'IntroductionDescriptionSecondary': string,
  'IntroductionImage': string,
  'IntroductionLinkAlternative': string,
  'IntroductionLinkExtra': string,
  'IntroductionLinkExtra2': string,
  'IntroductionShowAsText': boolean,
  'IntroductionShowAsTextHighlight': boolean,
  'PageTitle': string,
  'PageSubtitle': string,
  'PageManchet': string,
  'PageText': string,
  'Id': string
}

export interface Event {
  'Actors': string,
  'Programme': string,
  'EventUrl': string,
  'EventImportant': string,
  'EventPrice1Title': string,
  'EventPrice1Comment': string,
  'EventPrice1Url': string,
  'EventPrice1Lowest': string,
  'EventPrice1Highest': string,
  'EventPeriodStartDate': string,
  'EventPeriodStopDate': string,
  'EventPeriodTextComment': string,
  'Location': PlacementLocation[],
  'IsEventConcept': false,
  'MediaListMedia': [],
  'MediaListEventImage': [],
  'Disabled': false,
  'ShowTimes': {
    'EventTimeStart': string,
    'EventTimeEnd': string,
    'EventComment': string
  }[],
  'Placement'?: PlacementLocation,
  'Keywords': string[],
  'MediaListImages': string[],
  'IntroductionHeadline': string,
  'IntroductionDescription': string,
  'IntroductionDescriptionSecondaryHeadline'?: string,
  'IntroductionDescriptionSecondary'?: string,
  'IntroductionImage'?: string,
  'IntroductionLinkAlternative'?: string,
  'IntroductionLinkExtra'?: string,
  'IntroductionLinkExtra2'?: string,
  'IntroductionShowAsText': boolean,
  'IntroductionShowAsTextHighlight': boolean,
  'PageTitle': string,
  'PageSubtitle'?: string,
  'PageManchet': string,
  'PageText'?: string,
  'Id': string
}

export interface Location {
  'Section': string,
  'Placement': PlacementLocation,
  'Keywords': string[],
  'MediaListImages': [],
  'IntroductionHeadline': string,
  'IntroductionDescription': string,
  'IntroductionDescriptionSecondaryHeadline': '',
  'IntroductionDescriptionSecondary': string,
  'IntroductionImage'?: string,
  'IntroductionLinkAlternative': string,
  'IntroductionLinkExtra'?: string,
  'IntroductionLinkExtra2'?: string,
  'IntroductionShowAsText': boolean,
  'IntroductionShowAsTextHighlight': boolean,
  'PageTitle': string,
  'PageSubtitle'?: string,
  'PageManchet': string,
  'PageText': string,
  'Id': string
}
