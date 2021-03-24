import { Injectable, NotImplementedException } from '@nestjs/common';
import { Poi } from '../../_interfaces/poi.interface';

@Injectable()
export class TransferService {
  public transferPoiToPoi(poi: any): Poi {
    throw new NotImplementedException();
  }

  public transferPoisToPois(pois: any[]) {
    return pois.map(poi => this.transferPoiToPoi(poi));
  }

  public transferRideToPoi(ride: any): Poi {
    throw new NotImplementedException();
  }

  public transferRidesToPois(rides: any): Poi[] {
    return rides.map(this.transferRideToPoi);
  }

  public transferRestaurantToPoi(ride: any): Poi {
    throw new NotImplementedException();
  }

  public transferRestaurantsToPois(restaurants: any): Poi[] {
    return restaurants.map(this.transferRestaurantToPoi);
  }

  public transferShowToPoi(ride: any): Poi {
    throw new NotImplementedException();
  }

  public transferShowsToPois(shows: any): Poi[] {
    return shows.map(this.transferShowToPoi);
  }

  public transferShopToPoi(ride: any): Poi {
    throw new NotImplementedException();
  }

  public transferShopsToPois(shops: any): Poi[] {
    return shops.map(this.transferShopToPoi);
  }
}
