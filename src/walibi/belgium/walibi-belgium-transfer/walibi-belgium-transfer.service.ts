import { Injectable } from '@nestjs/common';
import { Poi } from '../../../_interfaces/poi.interface';
import { WalibiBelgiumEntertainment } from '../interfaces/walibi-belgium-entertainment.interface';
import { PoiCategory } from '../../../_interfaces/poiCategories.enum';
import { WalibiBelgiumEntertainmentsResponse } from '../interfaces/walibi-belgium-entertainments-response.interface';
import { RideCategory } from '../../../_interfaces/ride-category.interface';

@Injectable()
export class WalibiBelgiumTransferService {
  public WalibiBelgiumEntertainmentToPoi(entertainment: WalibiBelgiumEntertainment): Poi {
    let category: PoiCategory = PoiCategory.UNDEFINED;
    let rideCategory: RideCategory = null;

    switch (entertainment.category.name) {
      case "Toiletten":
        category = PoiCategory.TOILETS;
        break;
      case "Kids":
        category = PoiCategory.ATTRACTION;
        rideCategory = RideCategory.KIDS;
        break;
      case "Thrills":
        category = PoiCategory.ATTRACTION;
        rideCategory = RideCategory.THRILL;
        break;
      case "Familie":
        category = PoiCategory.ATTRACTION;
        rideCategory = RideCategory.FAMILY;
        break;
      case "Restaurant":
        category = PoiCategory.RESTAURANT;
        break;
      case "Snacks & drinks":
        category = PoiCategory.SNACKBAR;
        break;
      case "Frituur":
        category = PoiCategory.SNACKBAR;
        break;
      case "Shop":
        category = PoiCategory.SHOP;
        break;
      case "Lockers":
      case "Reception":
        category = PoiCategory.SERVICE;
        break;
      case "FirstAid":
        category = PoiCategory.FIRSTAID;
        break;
      default:
        break;
    }

    const poi: Poi = {
      id: entertainment.uuid,
      title: entertainment.title,
      description: entertainment.description,
      category: category,
      original_category: entertainment.category.name,
      rideCategory: rideCategory,
      original: entertainment,
      image_url: entertainment.image.url,
      location: {
        lat: parseFloat(entertainment.location.lat),
        lng: parseFloat(entertainment.location.lon)
      }
    };

    if (category == PoiCategory.ATTRACTION) {
      poi.subTitle = entertainment.additionalContent[0].title;
      poi.description = entertainment.additionalContent[0].text;
    }

    return poi;
  }

  public WalibiBelgiumEntertainmentsToPois(entertainments: WalibiBelgiumEntertainment[]): Poi[] {
    return entertainments.map(poi => this.WalibiBelgiumEntertainmentToPoi(poi));
  }

  public WalibiBelgiumEntertainmentResponseToPois(response: WalibiBelgiumEntertainmentsResponse): Poi[] {
    let pois: Poi[] = [];

    for (const i in response) {
      pois = pois.concat(this.WalibiBelgiumEntertainmentsToPois(response[i]));
    }

    return pois;
  }
}
