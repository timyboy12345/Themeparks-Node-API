import { PoiOpeningTime } from './poi-openingtimes.interface';
import { PoiCategory } from './poi-categories.enum';
import { WaitingTimes } from './waitingtimes.interface';
import { ShowTimes } from './showtimes.interface';
import { RideCategory } from './ride-category.interface';
import { Translation } from './translation.interface';

export interface Poi {
  id: string;
  category: PoiCategory;
  rideCategory?: RideCategory;
  original_category?: string;
  title: string;
  localizedTitles?: Translation;
  localizedTitle?: string;
  subTitle?: string;
  localizedSubtitles?: Translation;
  localizedSubtitle?: string;
  description?: string;
  localizedDescriptions?: Translation;
  localizedDescription?: string;
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
  minSize?: number;
  maxSize?: number;
  minAge?: number;
  maxAge?: number;
  minSizeEscort?: number;
  tags?: string[];
  image_url?: string;
  website_url?: string;
  translatedWebsiteUrl?: Translation;
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
