import { PoiOpeningTime } from './poiOpeningtimes.interface';
import { PoiCategory } from './poiCategories.enum';
import { WaitingTimes } from './waitingtimes.interface';
import { ShowTimes } from './showtimes.interface';
import { RideCategory } from './ride-category.interface';

export interface Poi {
  id: string;
  category: PoiCategory;
  rideCategory?: RideCategory;
  original_category?: string;
  title: string;
  subTitle?: string;
  description?: string;
  area?: string;
  createdAt?: string;
  location?: {
    lat: number,
    lng: number
  },
  entrance?: {
    id?: string,
    world?: {
      lat: number,
      lng: number
    },
    map?: {
      lat: number,
      lng: number
    }
  };
  exit?: {
    id?: string,
    world?: {
      lat: number,
      lng: number
    },
    map?: {
      lat: number,
      lng: number
    }
  };
  maxAge?: string;
  maxSize?: string;
  minAge?: number;
  minSize?: number;
  minSizeEscort?: number;
  tags?: string[];
  image_url?: string;
  website_url?: string;
  fastpass?: boolean;
  singlerider?: boolean;
  featured?: boolean;
  photoPoint?: boolean;

  images?: string[];

  waitingTimes?: WaitingTimes;

  showTimes?: ShowTimes;

  openingTimes?: PoiOpeningTime[];

  original: any;
}
