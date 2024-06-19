import { Injectable, NotImplementedException } from '@nestjs/common';
import { Poi } from '../../_interfaces/poi.interface';
import { ShowTime, ShowTimes } from '../../_interfaces/showtimes.interface';
import { ThemeParkOpeningTimes } from '../../_interfaces/park-openingtimes.interface';

@Injectable()
export class TransferService {
  public transferPoiToPoi(poi: any, locale?: string): Poi {
    // TODO: Should these be added to Sentry?
    throw new NotImplementedException("Could not transfer POI to POI");
  }

  public transferPoisToPois(pois: any[], locale?: string) {
    return pois.map(poi => this.transferPoiToPoi(poi, locale));
  }

  public transferRideToPoi(ride: any, locale?: string): Poi {
    throw new NotImplementedException("Could not transfer ride to POI");
  }

  public transferRidesToPois(rides: any, locale?: string): Poi[] {
    return rides.map(rides => this.transferRideToPoi(rides, locale));
  }

  public transferRestaurantToPoi(restaurant: any, locale?: string): Poi {
    throw new NotImplementedException("Could not transfer restaurant to POI");
  }

  public transferRestaurantsToPois(restaurants: any, locale?: string): Poi[] {
    return restaurants.map(restaurants => this.transferRestaurantToPoi(restaurants, locale));
  }

  public transferShowToPoi(show: any, locale?: string): Poi {
    throw new NotImplementedException("Could not transfer show to POI");
  }

  public transferShowsToPois(shows: any, locale?: string): Poi[] {
    return shows.map(shows => this.transferShowToPoi(shows, locale));
  }

  public transferShopToPoi(shop: any, locale?: string): Poi {
    throw new NotImplementedException("Could not transfer shop to POI");
  }

  public transferShopsToPois(shops: any, locale?: string): Poi[] {
    return shops.map((shops: any[]) => this.transferShopToPoi(shops, locale));
  }

  public transferHalloweenEventToPoi(halloweenEvent: any, locale?: string): Poi {
    throw new NotImplementedException("Could not transfer shop to POI");
  }

  public transferHalloweenEventsToPoi(halloweenEvents: any, locale?: string): Poi[] {
    return halloweenEvents.map((halloweenEvent: any[]) => this.transferHalloweenEventToPoi(halloweenEvent, locale));
  }

  public transferHotelToPoi(hotel: any, locale?: string): Poi {
    throw new NotImplementedException("Could not transfer hotel to POI");
  }

  public transferHotelsToPois(hotels: any, locale?: string): Poi[] {
    return hotels.map((hotel: any[]) => this.transferHotelsToPois(hotel, locale));
  }

  public transferShowTimesToShowTimes(showTimes: any, locale?: string): ShowTimes {
    throw new NotImplementedException("Could not transfer show time to POI show time");
  }

  public transferShowTimeToShowTime(showTime: any, locale?: string): ShowTime {
    throw new NotImplementedException("Could not transfer show time to POI show time");
  }

  public transferOpeningTimesToOpeningTimes(openingTimes: any, locale?: string): ThemeParkOpeningTimes[] {
    throw new NotImplementedException("Could not transfer opening times to opening times");
  }

  public transferAnimalToPoi(animal: any, locale?: string): Poi {
    throw new NotImplementedException("Could not transfer animal to POI");
  }

  public transferAnimalsToPois(animals: any, locale?: string): Poi[] {
    return animals.map((animal: any[]) => this.transferAnimalToPoi(animal, locale));
  }

  public transferDataObjectToPois(data: any, ...args): Poi[] {
    throw new NotImplementedException("Could not transfer data object to a list of POIs");
  }
}
