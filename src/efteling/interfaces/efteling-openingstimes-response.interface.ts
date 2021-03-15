export interface EftelingOpeningTimesResponse {
  OpeningHours: EftelingOpeningTimesOpeningHours[];
  Maintenance: EftelingOpeningTimesMaintenance[];
  Shows: EftelingOpeningTimesShow[];
  Events: EftelingOpeningTimesEvent[];
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
