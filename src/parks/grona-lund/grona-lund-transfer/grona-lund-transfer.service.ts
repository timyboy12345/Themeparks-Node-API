import { Injectable } from "@nestjs/common";
import { TransferService } from "../../../_services/transfer/transfer.service";
import { Poi } from "../../../_interfaces/poi.interface";
import { ContentfulRideBlock } from "../interfaces/attraktioner-response.interface";
import { PoiCategory } from "../../../_interfaces/poi-categories.enum";
import * as sluggo from "sluggo";

@Injectable()
export class GronaLundTransferService extends TransferService {
  transferRideToPoi(poi: ContentfulRideBlock): Poi {
    const p: Poi = {
      id: sluggo(poi.title),
      title: poi.title,
      category: PoiCategory.ATTRACTION,
      original: poi,
    };

    if (poi.preamble) {
      p.subTitle = poi.preamble.preamble;
    }

    if (poi.minimumHeightInteger) {
      p.minSizeWithoutEscort = poi.minimumHeightInteger;
    }

    if (poi.pageLink) {
      p.website_url = "https://gronalund.com" + poi.pageLink.slug;
    }

    if (poi.ageRequirement === "Rek. från 11 år") {
      p.minAgeWithoutEscort = 11;
    }

    if (poi.imageInList.file) {
      p.image_url = poi.imageInList.file.url;
      p.previewImage = poi.imageInList.file.url;
    }

    if (poi.tags) {
      p.tags = poi.tags.map((t) => t.title);
    }

    if (poi.couponCount) {
      p.price = Number.parseInt(poi.couponCount);
      p.priceName = "Coupons";
      p.priceType = "tokens";
    }

    // Add maximum heights manually, as they are not included in the API
    switch (poi.rideId) {
      // Lyktan
      case 59:
      // Fritt Fall & Fritt Fall Tilt
      case 41:
      // Insane
      case 30:
      // Katapulten
      case 35:
      // Monster
      case 110:
      // Ikaros
      case 79:
        p.maxSize = 195;
        break;
      // The pump
      case 318:
      // Kvasten
      case 29:
        p.maxSize = 205;
        break;
      default:
        break;
    }

    return p;
  }

  transferRestaurantToPoi(restaurant: any, locale?: string): Poi {
    const poi: Poi = {
      category: PoiCategory.RESTAURANT,
      title: restaurant.title,
      subTitle: restaurant.preamble?.preamble,
      id: sluggo(restaurant.title),
      description: restaurant.description?.childMarkdownRemark.html,
      original: restaurant,
    };

    if (restaurant.imageInList?.file) {
      poi.image_url = restaurant.imageInList.file.url;
      poi.previewImage = restaurant.imageInList.file.url;
    }

    if (restaurant.pageLink) {
      poi.website_url = "https://gronalund.com" + restaurant.pageLink.slug;
    }

    return poi;
  }
}
