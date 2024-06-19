export interface PoiOpeningTime {
  // The full datetime opening time
  open: string;

  // The full datetime closing time
  close?: string;

  // The hour:minute:second the poi opens
  openTime: string;

  // The hour:minute:second the poi closes
  closeTime?: string;

  // The date of this opening time, without time
  date: string;

  // Whether the time has passed or not
  isPassed?: boolean;

  // Any additional comments, provided by the park
  comments?: string;
}
