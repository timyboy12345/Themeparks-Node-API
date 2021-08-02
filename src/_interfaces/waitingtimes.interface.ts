import { PoiStatus } from './poi.interface';

export interface WaitingTimes {
  ride_id: string;
  date?: string;
  state: PoiStatus;
  wait?: number;
}
