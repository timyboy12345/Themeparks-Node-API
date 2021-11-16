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
  /**
   * The ID of the show, if one is given
   */
  id?: string;

  /**
   * The full date when the show starts
   */
  from: string;

  /**
   * The start time
   */
  fromTime: string;

  /**
   * The full date when the show ends
   */
  to?: string;

  /**
   * The end time
   */
  toTime?: string;

  /**
   * The duration of the show (in minutes)
   */
  duration?: number;

  /**
   * Whether the show has passed or not
   */
  isPassed?: boolean;

  /**
   * Any information about special editions
   */
  edition?: string;
}
