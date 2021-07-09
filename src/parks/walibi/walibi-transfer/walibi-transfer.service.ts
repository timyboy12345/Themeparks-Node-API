import { Injectable } from '@nestjs/common';
import { Poi } from '../../../_interfaces/poi.interface';
import { WalibiEntertainment } from '../interfaces/walibi-entertainment.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { RideCategory } from '../../../_interfaces/ride-category.interface';
import { TransferService } from '../../../_services/transfer/transfer.service';

@Injectable()
export class WalibiTransferService extends TransferService {
  public transferPoiToPoi(entertainment: WalibiEntertainment): Poi {
    let category = this.getCategory(entertainment.category.name);

    const poi: Poi = {
      id: entertainment.uuid,
      title: entertainment.title,
      description: entertainment.description,
      category: category.poiCategory,
      original_category: entertainment.category.name,
      rideCategory: category.rideCategory,
      original: entertainment,
      image_url: entertainment.image.url,
    };

    if (entertainment.location) {
      poi.location = {
        lat: parseFloat(entertainment.location.lat),
        lng: parseFloat(entertainment.location.lon),
      };
    }

    if (category.poiCategory == PoiCategory.ATTRACTION) {
      poi.subTitle = entertainment.additionalContent[0].title;
      poi.description = entertainment.additionalContent[0].text;
    }

    return poi;
  }

  public transferShopToPoi(ride: any): Poi {
    return this.transferPoiToPoi(ride);
  }

  public transferShowToPoi(ride: any): Poi {
    return this.transferPoiToPoi(ride);
  }

  public transferRideToPoi(ride: any): Poi {
    return this.transferPoiToPoi(ride);
  }

  public transferRestaurantToPoi(ride: any): Poi {
    return this.transferPoiToPoi(ride);
  }

  private getCategory(category: string): { poiCategory: PoiCategory, rideCategory?: RideCategory } {
    switch (category) {
      case 'Toiletten':
        return {
          poiCategory: PoiCategory.TOILETS,
        };
      case 'Kids':
        return {
          poiCategory: PoiCategory.ATTRACTION,
          rideCategory: RideCategory.KIDS,
        };
      case 'Thrilling':
      case 'Exciting':
      case 'Thrills':
      case 'Sensational':
        return {
          poiCategory: PoiCategory.ATTRACTION,
          rideCategory: RideCategory.THRILL,
        };
      case 'Familie':
      case 'Family':
      case 'Fun':
        return {
          poiCategory: PoiCategory.ATTRACTION,
          rideCategory: RideCategory.FAMILY,
        };
      case 'Restaurant':
      case 'Barbecue':
      case 'Meals':
        return {
          poiCategory: PoiCategory.RESTAURANT,
        };
      case 'Frituur':
      case 'Friterie':
      case 'Snacks':
      case 'Snacks & drinks':
      case 'Ice cream':
        return {
          poiCategory: PoiCategory.SNACKBAR,
        };
      case 'Shop':
        return {
          poiCategory: PoiCategory.SHOP
        }
      case 'Lockers':
      case 'Reception':
        return {
          poiCategory: PoiCategory.SERVICE
        }
      case 'FirstAid':
        return {
          poiCategory: PoiCategory.FIRSTAID
        }
      default:
        return {
          poiCategory: PoiCategory.UNDEFINED
        }
    }
  }
}
