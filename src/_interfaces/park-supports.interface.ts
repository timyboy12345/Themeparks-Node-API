export interface ThemeParkSupports {
  // General POI data
  supportsPois: boolean;
  supportsPoiLocations: boolean;

  // Restaurants
  supportsRestaurants: boolean;
  supportsRestaurantOpeningTimes: boolean;

  // Shops
  supportsShops: boolean;
  supportsShopOpeningTimes: boolean;

  // Rides
  supportsRides: boolean;
  supportsRideWaitTimes: boolean;
  supportsRideWaitTimesHistory: boolean;

  // Shows
  supportsShows: boolean;
  supportsShowTimes: boolean;

  // Opening Times
  supportsOpeningTimes: boolean;
  supportsOpeningTimesHistory: boolean;

  /**
   * @description Whether or not a park supports retrieving a list of animals visible to the public
   */
  supportsAnimals: boolean;

  /**
   * @description Whether or not a park supports localized names and descriptions for POIs
   */
  supportsTranslations: boolean;

  /**
   * @description Whether or not a park supports returning Halloween related items, such as scare zones and experiences
   */
  supportsHalloween: boolean;
}
