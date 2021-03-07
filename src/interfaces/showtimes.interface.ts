export interface ShowTimes {
  duration?: number;
  currentDate: string;
  allShowTimes: ShowTime[];
  todayShowTimes: ShowTime[];
  otherDateShowTimes?: ShowTime[];
  pastShowTimes: ShowTime[];
  futureShowTimes: ShowTime[];
}

export interface ShowTime {
  id?: string;
  from: string;
  fromTime: string;
  to?: string;
  duration?: number;
  isPassed?: boolean;
  edition?: string;
}
