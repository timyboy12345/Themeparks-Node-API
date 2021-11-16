export interface ThemeParkOpeningTimes {
  date: string;
  events?: string[];
  openingTimes: ThemeParkOpeningTime[]
}

export interface ThemeParkOpeningTime {
  open: string;
  openTime: string;
  close: string;
  closeTime: string;
  comments?: string[];
}
