import { Injectable } from '@nestjs/common';
import { HolidayParkAttraction } from '../interfaces/holiday-park-attraction.interface';
import { Poi } from '../../_interfaces/poi.interface';
import { PoiCategory } from '../../_interfaces/poi-categories.enum';
import { HolidayParkAttractionsResponseInterface } from '../interfaces/holiday-park-attractions-response.interface';
import { RideCategory } from '../../_interfaces/ride-category.interface';
import { HolidayParkPageResponseInterface } from '../interfaces/holiday-park-page-response.interface';
import { TransferService } from '../../_services/transfer/transfer.service';

@Injectable()
export class HolidayParkTransferService extends TransferService {
  public transferPoiToPoi(holidayParkAttraction: HolidayParkAttraction): Poi {
    let category: PoiCategory;

    switch (holidayParkAttraction.type) {
      case 'food':
        category = PoiCategory.RESTAURANT;
        break;
      case 'attraction':
        category = PoiCategory.ATTRACTION;
        break;
      case 'shop':
        category = PoiCategory.SHOP;
        break;
      case 'event':
      case 'meet_greet':
        category = PoiCategory.EVENT;
        break;
      default:
        category = PoiCategory.UNDEFINED;
        break;
    }

    const poi: Poi = {
      id: holidayParkAttraction.uniqueID,
      title: holidayParkAttraction.name,
      description: holidayParkAttraction.description,
      image_url: holidayParkAttraction.images[0],
      category: category,
      original_category: holidayParkAttraction.type,
      original: holidayParkAttraction,
      minSize: parseInt(holidayParkAttraction.minHeight),
      maxSize: parseInt(holidayParkAttraction.maxHeight),
      minSizeEscort: parseInt(holidayParkAttraction.minHeightSupervised),
    };

    if (poi.category === PoiCategory.ATTRACTION) {
      if ('10' in holidayParkAttraction.attractionType) {
        poi.rideCategory = RideCategory.FAMILY;
      } else if ('12' in holidayParkAttraction.attractionType) {
        poi.rideCategory = RideCategory.KIDS;
      } else if ('11' in holidayParkAttraction.attractionType) {
        poi.rideCategory = RideCategory.THRILL;
      }
    }

    return poi;
  }

  public transferRidesToPois(responseInterface: HolidayParkAttractionsResponseInterface): Poi[] {
    const pois: HolidayParkAttraction[] = [];

    for (let key in responseInterface.en.attraction) {
      pois.push(responseInterface.en.attraction[key]);
    }

    return pois.map(holidayParkAttraction => this.transferPoiToPoi(holidayParkAttraction));
  }

  public transferShopsToPois(responseInterface: HolidayParkPageResponseInterface): Poi[] {
    const pois: HolidayParkAttraction[] = [];

    for (let key in responseInterface.en.shop) {
      pois.push(responseInterface.en.shop[key]);
    }

    return pois.map(holidayParkAttraction => this.transferPoiToPoi(holidayParkAttraction));
  }

  public transferRestaurantsToPois(responseInterface: HolidayParkPageResponseInterface): Poi[] {
    const pois: HolidayParkAttraction[] = [];

    for (let key in responseInterface.en.food) {
      pois.push(responseInterface.en.food[key]);
    }

    return pois.map(holidayParkAttraction => this.transferPoiToPoi(holidayParkAttraction));
  }

  // public HolidayParkShowsResponseToPois(holidayParkAttractionsResponse: HolidayParkPageResponseInterface): Poi[] {
  //   const pois: HolidayParkAttraction[] = [];
  //
  //   for (let key in holidayParkAttractionsResponse.en.) {
  //     pois.push(holidayParkAttractionsResponse.en.food[key]);
  //   }
  //
  //   return pois.map(holidayParkAttraction => this.HolidayParkAttractionToPoi(holidayParkAttraction));
  // }
}
