import { EventCategory } from './event.category';

export interface ThemeParkEvent {
  fromDate?: string;
  toDate?: string;
  type: EventCategory;
  name?: string;
  subTitle?: string;
  description?: string;
}
