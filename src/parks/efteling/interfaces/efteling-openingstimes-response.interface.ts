export interface EftelingOpeningTimesResponse {
  OpeningHours: EftelingOpeningTimesOpeningHours[];
  Maintenance: EftelingOpeningTimesMaintenance[];
  Shows: EftelingOpeningTimesShow[];
  Events: EftelingOpeningTimesEvent[];
  AttractionInfo: EftelingOpeningTimesAttraction[];
}

export interface EftelingOpeningTimesOpeningHours {
  Date: string;
  OpeningHours: { Open: string; Close: string; }[];
  Crowded: number;
}

export interface EftelingOpeningTimesMaintenance {
  DateFrom: string;
  DateTo: string;
  OpenInWeekend: boolean;
  State: string;
  Type: string;
  Url: string;
  Name: string;
}

export interface EftelingOpeningTimesShow {
  Name: string;
  Url: string;
  Duration: 120;
  ShowDates: string[];
}

export interface EftelingOpeningTimesEvent {
  Name: string;
  Description: string;
  Link: string;
  Type: string;
  DateFrom: string;
  DateTo: string;
}

export interface EftelingOpeningTimesAttraction {
  'Id': string,
  'Type': string,
  'OpeningHours': string,
  'Empire': string,
  'State': string,
  'OpeningTimes'?: EftelingOpeningTimesAttractionOpeningTime[]
  'PastOpeningTimes'?: EftelingOpeningTimesAttractionOpeningTime[]
  'ShowDuration'?: number
  'ShowTimes'?: EftelingOpeningTimesAttractionShowTimes[]
  'PastShowTimes'?: EftelingOpeningTimesAttractionShowTimes[]
  'WaitingTime': string,
  'VirtualQueue': {
    'State': 'enabled' | 'full' | 'walkin',
    'WaitingTime': number,
    'Geofences': '[{"desc":"Danse Macabre Plein","latitude":51.6484438,"longitude":5.0485892,"radius":40}]'
  }
}

export interface EftelingOpeningTimesAttractionOpeningTime {
  'Date': string,
  'Description': string,
  'HourFrom': string,
  'HourTo': string
}

export interface EftelingOpeningTimesAttractionShowTimes {
  'ShowDateTime': string,
  'StartDateTime': string,
  'EndDateTime': string,
  'Edition'?: string
}
