import { PoiOpeningTime } from './poi-openingtimes.interface';
import { PoiCategory } from './poi-categories.enum';
import { WaitingTimes } from './waitingtimes.interface';
import { ShowTimes } from './showtimes.interface';
import { RideCategory } from './ride-category.interface';
import { Translation } from './translation.interface';
import { PoiMenuItemInterface } from './poi-menu-item.interface';

export interface Poi {
  /**
   * An unique identifier for this ride
   *  - There can not be two POIs with the same ID within one park
   *  - Different parks may have the same ID though
   */
  id: string;

  /**
   * The category this POI belongs to
   */
  category: PoiCategory;

  /**
   * The ride category this POI belongs to
   */
  rideCategory?: RideCategory;

  /**
   * The original category for this POI (how the park describes the ride)
   */
  original_category?: string;

  /**
   * The name of the POI
   */
  title: string;

  /**
   * Any localisations the title of this POI may have
   */
  localizedTitles?: Translation;

  /**
   * The localised title for the selected localisation
   */
  localizedTitle?: string;

  /**
   * A possible subtitle for this POI
   */
  subTitle?: string;

  /**
   * All localisations of the subtitle
   */
  localizedSubtitles?: Translation;

  /**
   * The subtitle in the selected localisation
   */
  localizedSubtitle?: string;

  /**
   * A full description for this POI given by the park
   */
  description?: string;

  /**
   * All localisations of the description for this POI
   */
  localizedDescriptions?: Translation;

  /**
   * The description in the selected localisation
   */
  localizedDescription?: string;

  /**
   * The name of the area this ride is in
   */
  area?: string;

  /**
   * The location on the world map where this ride is located
   */
  location?: {
    lat: number,
    lng: number
  },

  /**
   * The location on the world map where the entrance for this ride is located
   */
  entrance?: {
    lat: number,
    lng: number
  };

  /**
   * The location on the world map where the exit for this ride is located
   */
  exit?: {
    lat: number,
    ln: number
  };

  /**
   * The minimum length in centimeters that riders need to be to ride alone
   */
  minSize?: number;

  /**
   * The length that riders with parents are allowed to ride (in cm)
   */
  minSizeWithEscort?: number;

  /**
   * The maximum length in centimeters for this ride
   */
  maxSize?: number;

  /**
   * The minimum age to ride this ride
   */
  minAge?: number;

  /**
   * The minimum age to ride this ride with parents
   */
  minAgeWithEscort?: number;

  /**
   * The maximum age to ride this ride
   */
  maxAge?: number;

  /**
   * Any tags the park may have given this ride
   */
  tags?: string[];

  /**
   * The header image of this ride
   */
  image_url?: string;

  /**
   * An array of urls on which images of this attraction can be found
   */
  images?: string[];

  /**
   * A preview image for this ride (a smaller image that does not require as much bandwith)
   */
  previewImage?: string;

  /**
   * A full URL that leads to the official web page for this ride
   */
  website_url?: string;

  /**
   * URLs for different translations of this POI
   */
  translatedWebsiteUrl?: Translation;

  /**
   * Whether this ride has a fastpass line
   */
  fastpass?: boolean;

  /**
   * Whether this ride has a single rider line
   */
  singleRider?: boolean;

  /**
   * Whether this POI is featured (according to the park)
   */
  featured?: boolean;

  /**
   * Whether this POI has a photo point or not
   */
  photoPoint?: boolean;

  /**
   * The current wait time of this ride
   */
  currentWaitTime?: number;

  /**
   * The current status of this ride
   */
  state?: PoiStatus;

  waitingTimes?: WaitingTimes[];

  showTimes?: ShowTimes;

  openingTimes?: PoiOpeningTime[];

  /**
   * Any menu items this POI may have
   */
  menuItems?: PoiMenuItemInterface[];

  /**
   * When this data point was created
   */
  createdAt?: string;

  /**
   * When this data point was updated
   */
  updatedAt?: string;

  /**
   * The original POI (The object returned by the park)
   */
  original: any;
}

export enum PoiStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  CLOSED_TODAY = 'CLOSED_TODAY',
  DOWN = 'DOWN',
  MAINTENANCE = 'MAINTENANCE',
  UNDEFINED = 'UNDEFINED'
}
