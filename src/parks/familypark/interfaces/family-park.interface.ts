export interface FamilyParkCategory {
  title: string;
  poiType: string;
  technicalName: string;
  content: FamilyParkPoi[];
}

export interface FamilyParkPoi {
  poiType: string;
  eventTags?: string[] | null;
  optionalText?: string;
  title: string;
  technicalName?: string;
  waitingTimeName?: string | null;
  subtitle?: string;
  description?: string;
  shortDescription?: string;
  mainImage?: FamilyParkImage | null;
  mainVideo?: string;
  type?: FamilyParkType | FamilyParkType[] | null;
  subType?: FamilyParkType[] | null;
  longitude: number;
  latitude: number;
  zone?: FamilyParkZone | null;
  zoneContentFragment?: FamilyParkZoneContentFragment | null;
  status?: any[] | null;
  statusText?: string;
  fearLevel?: number | null;
  scareOMeterImage?: any | null;
  services?: FamilyParkService[] | null;
  buySpeedyPassCTA?: string;
  buyTicketsCTA?: string;
  accessibilities?: FamilyParkAccessibility[] | null;
  heightSoloRide?: number | null;
  heightAccompaniedByAdult?: number | null;
  minHeightNotAllowed?: number | null;
  maxHeightNotAllowed?: number | null;
  maxWeight?: number | null;
  maxWeightText?: string;
  accessibilityImage?: any | null;
  rideDetails?: FamilyParkRideDetails | null;
  gallery?: any[] | null;
  relatedPOI?: string[] | null;
  path?: string;
  extraInformation?: FamilyParkExtraInformation | null;
  menu?: FamilyParkMenu | null;
  voucher?: string;
  category?: FamilyParkType[] | null;
  isClosed?: boolean;
  openingStatuses?: any[] | null;
  statusDescription?: string;
  accessibility?: any[] | null;
}

export interface FamilyParkImage {
  path: string;
  url: string;
  focusPositionX?: number | null;
  focusPositionY?: number | null;
  renditions: FamilyParkRendition[];
  type: string;
}

export interface FamilyParkRendition {
  url: string;
  width: number;
}

export interface FamilyParkType {
  id: string;
  title: string;
  icon: string;
}

export interface FamilyParkZone {
  id: string;
  title: string;
  icon: string;
}

export interface FamilyParkZoneContentFragment {
  name: string;
  mainImage: FamilyParkImage | null;
  description: string;
}

export interface FamilyParkService {
  title: string;
  description: string;
  icon: string;
}

export interface FamilyParkAccessibility {
  title: string;
  description: string;
  icon: string;
  preserveIconColors?: boolean;
}

export interface FamilyParkRideDetails {
  speed: number | null;
  yearOfConstruction: number | null;
  capacity: number | null;
  airTime: number | null;
  duration: number | null;
  waterDepth: number | null;
  access: string;
  schedule: string;
  rateEntrance: string;
  looping: boolean | null;
  height: number | null;
  length: number | null;
}

export interface FamilyParkExtraInformation {
  title: string;
  description: string;
  extraInformation: FamilyParkService[];
}

export interface FamilyParkMenu {
  title: string;
  description: string;
  mainImage: FamilyParkImage | null;
  link: string;
  allergens: string;
  infoBox: string;
}
