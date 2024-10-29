import { EventCategory } from './event.category';
import { Poi } from './poi.interface';

export interface ThemeParkEvent {
  fromDate?: string;
  toDate?: string;
  dates?: string[];
  type: EventCategory;
  name?: string;
  subTitle?: string;
  description?: string;
  image: 'https://www.toverland.com/fileadmin/_processed_/5/b/csm_Cirque-close-middel_9ac7a20e79.jpg',
  pois?: Poi[];
}
