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

  // Animals
  supportsAnimals: boolean;
}
