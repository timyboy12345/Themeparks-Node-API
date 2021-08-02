import { SixflagsMapItemInterface } from './sixflags-map-item.interface';

export interface SixflagsMapResponseInterface {
  rides: SixflagsMapItemInterface[];
  restaurants: SixflagsMapItemInterface[];
  shops: SixflagsMapItemInterface[];
  facilities: SixflagsMapItemInterface[];
  events: SixflagsMapItemInterface[];
  renderLocation: any;
  entranceLocation: any;
  checkInLocation: any;
  toastMessages: any[];
}
