export interface ShowTimes {
  /**
   * @description The duration of a show, in minutes
   */
  duration?: number;

  /**
   * @description The current datetime of this park, to use as a reference
   */
  currentDate: string;

  /**
   * @description The current date with timezone information
   */
  currentDateTimezone: string;

  /**
   * @description A list of all show times for this location, these may be from another date, or have already passed
   */
  showTimes: ShowTime[];

  /**
   * @description The timezone for this set of shows
   */
  timezone: string;
}

export interface ShowTime {
  /**
   * The ID of the show, if one is given
   */
  id?: string;

  /**
   * The local date when the show starts
   */
  localFromDate: string;

  /**
   * The local start time
   */
  localFromTime: string;

  /**
   * The local date the show ends
   */
  localToDate?: string;

  /**
   * The local end time
   */
  localToTime?: string;

  /**
   * The full 'from' datetime in UTC format, with timezone information
   */
  timezoneFrom: string;

  /**
   * The full 'to' datetime in UTC format, with timezone information
   */
  timezoneTo?: string;

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
