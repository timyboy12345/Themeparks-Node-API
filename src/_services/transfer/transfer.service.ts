import { Injectable, NotImplementedException } from '@nestjs/common';
import { Poi } from '../../_interfaces/poi.interface';
import { ShowTime, ShowTimes } from '../../_interfaces/showtimes.interface';
import { ThemeParkOpeningTimes } from '../../_interfaces/park-openingtimes.interface';

@Injectable()
export class TransferService {
  public transferPoiToPoi(poi: any): Poi {
    throw new NotImplementedException("Could not transfer POI to POI");
  }

  public transferPoisToPois(pois: any[]) {
    return pois.map(poi => this.transferPoiToPoi(poi));
  }

  public transferRideToPoi(ride: any): Poi {
    throw new NotImplementedException("Could not transfer ride to POI");
  }

  public transferRidesToPois(rides: any): Poi[] {
    return rides.map(rides => this.transferRideToPoi(rides));
  }

  public transferRestaurantToPoi(restaurant: any): Poi {
    throw new NotImplementedException("Could not transfer restaurant to POI");
  }

  public transferRestaurantsToPois(restaurants: any): Poi[] {
    return restaurants.map(restaurants => this.transferRestaurantToPoi(restaurants));
  }

  public transferShowToPoi(show: any): Poi {
    throw new NotImplementedException("Could not transfer show to POI");
  }

  public transferShowsToPois(shows: any): Poi[] {
    return shows.map(shows => this.transferShowToPoi(shows));
  }

  public transferShopToPoi(shop: any): Poi {
    throw new NotImplementedException("Could not transfer shop to POI");
  }

  public transferShopsToPois(shops: any): Poi[] {
    return shops.map(shops => this.transferShopToPoi(shops));
  }

  public transferHotelToPoi(hotel: any): Poi {
    throw new NotImplementedException("Could not transfer hotel to POI");
  }

  public transferHotelsToPois(hotels: any): Poi[] {
    return hotels.map(hotel => this.transferHotelsToPois(hotel));
  }

  public transferShowTimesToShowTimes(showTimes: any): ShowTimes {
    throw new NotImplementedException("Could not transfer show time to POI show time");
  }

  public transferShowTimeToShowTime(showTime: any): ShowTime {
    throw new NotImplementedException("Could not transfer show time to POI show time");
  }

  public transferOpeningTimesToOpeningTimes(openingTimes: any): ThemeParkOpeningTimes[] {
    throw new NotImplementedException("Could not transfer opening times to opening times");
  }

  public transferDataObjectToPois(data: any): Poi[] {
    throw new NotImplementedException("Could not transfer data object to a list of POIs");
  }
}
