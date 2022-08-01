export interface EnergylandiaCalendarInterface {
  [key: string]: EnergylandiaCalendarItemInterface
}

export interface EnergylandiaCalendarItemInterface {
  'status': string,
  'date': string,
  'data': string,
  'title': string,
  'color': string,
  'time_od': string,
  'time_do': string,
  'happening': {
    'title': string,
    'link': string,
    'start': string,
    'stop': string
  }[],
  'show': {
    'id': number,
    'title': string,
    'link': string,
    'time': string
  }[],
  'crowd': {
    'type': string,
    'color': string
  }[],
  'birthdays': {
    [key: string]: string
  }
}
