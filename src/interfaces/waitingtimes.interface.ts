export interface WaitingTimes {
  ride_id: string;
  date?: string;
  state: WaitingTimesState;
  wait: number;
  original: any;
}

export enum WaitingTimesState {
  OPEN = 'Open',
  CLOSED = 'Closed',
  MAINTENANCE = 'Maintenance',
  DOWN = 'Down',
}
