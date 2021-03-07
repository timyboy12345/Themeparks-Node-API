export interface EftelingWaitTimesResponse {
  Version: string;
  AppVersion: number;
  AppPlatform: string;
  TimeStamp: string;
  Timeslot: EftelingTimeslot;
  OpeningHours: {
    Date: string;
    BusyIndication: string;
    HourFrom: string;
    HourTo: string;
    SpecialEvent: false
  };
  AttractionInfo: EftelingAttractionInfo[];
  MaintenanceInfo: EftelingMaintenanceInfo[];
  Disclaimer: string;
}

export interface EftelingAttractionInfo {
  Id: string;
  Type: EftelingAttractionInfoType;
  MapLocation: string;
  ShowDuration: number;
  State: string;
  StateColor: string;
  StatePercentage: string;
  IsTheaterShow: false;
  PastShowTimes: EftelingShowTime[];
  ShowTimes: EftelingShowTime[];
  OpeningTimes: EftelingOpeningTimes[];
  WaitingTime: number;
}

export interface EftelingShowTime {
  ShowDateTime: string;
  StartDateTime: string;
  EndDateTime: string;
  Edition: string;
}

export interface EftelingOpeningTimes {
  Date: string;
  HourFrom: string;
  HourTo: string;
}

export interface EftelingMaintenanceInfo {
  AttractionId: string;
  DateFrom: string;
  DateTo: string;
  OpenInWeekend: false;
}

export interface EftelingTimeslot {
  AttractionId: number;
  MaxPersons: number;
  NextAvailableTimeslot: string;
  State: 'enabled' | 'disabled';
  ReservationType: 'person' | 'group';
  MaxDays: number;
}

export enum EftelingAttractionInfoType {
  'SHOW' = 'Show',
  'MERCHANDISE' = 'Merchandise',
  'HORECA' = 'Horeca',
  'ATTRACTION' = 'Attraction',
  'PARKEVENTLOCATION' = 'Parkeventlocation',
  'TOILETTEN' = 'Toiletten'
}
