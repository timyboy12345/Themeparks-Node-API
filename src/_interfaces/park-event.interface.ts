import { EventCategory } from './event.category';
import { Poi } from './poi.interface';

export interface ThemeParkEvent {
  fromDate?: string;
  toDate?: string;
  dates?: string[];
  type: EventCategory;
  slug: string;
  name?: string;
  subTitle?: string;
  description?: string;
  image?: string,
  pois?: Poi[];
}
