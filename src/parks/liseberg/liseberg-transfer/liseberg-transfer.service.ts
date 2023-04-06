import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi, PoiStatus } from '../../../_interfaces/poi.interface';
import {
  LisebergApiResponseCategory,
  LisebergApiResponseItemInterface,
} from '../interfaces/liseberg-api-response.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';

@Injectable()
export class LisebergTransferService extends TransferService {
  transferPoiToPoi(poi: LisebergApiResponseItemInterface): Poi {
    let category: PoiCategory;

    switch (poi.type) {
      case LisebergApiResponseCategory.attraction:
        category = PoiCategory.ATTRACTION;
        break;
      case LisebergApiResponseCategory.eatery:
        category = PoiCategory.RESTAURANT;
        break;
      case LisebergApiResponseCategory.service:
        category = PoiCategory.SERVICE;
        break;
      case LisebergApiResponseCategory.shop:
        category = PoiCategory.SHOP;
        break;
      case LisebergApiResponseCategory.venue:
      case LisebergApiResponseCategory.pentathlon:
      default:
        category = PoiCategory.UNDEFINED;
        break;
    }

    const p: Poi = {
      id: `${poi.id}`,
      title: poi.title,
      description: poi.description,
      original: poi,
      category: category,
      original_category: poi.type,
    };

    if (poi.images) {
      p.images = [poi.images.original];
      p.previewImage = poi.images.small;
      p.image_url = poi.images.original;
    }

    if (poi.state) {
      if (poi.state.isOpen) {
        p.state = PoiStatus.OPEN;
        p.currentWaitTime = poi.state.minWaitTime;
      } else {
        p.state = PoiStatus.CLOSED;
      }
    }

    if (poi.linkUrl) {
      p.website_url = poi.linkUrl;
    }

    if (poi.lat && poi.lng) {
      p.location = {
        lat: poi.lat,
        lng: poi.lng,
      };
    } else if (poi.coordinates) {
      p.location = {
        lat: poi.coordinates.latitude,
        lng: poi.coordinates.longitude,
      };
    }

    if (poi.heightLimitation) {
      switch (poi.heightLimitation) {
        case 'At least 90 cm or no height limit if accompanied by adult':
          p.minSizeWithEscort = 0;
          p.minSizeWithoutEscort = 90;
          break;
        case 'At least 110 cm':
          p.minSizeWithoutEscort = 110;
          break;
        case 'At least 110 cm or no height limit if accompanied by adult':
          p.minSizeWithEscort = 0;
          p.minSizeWithoutEscort = 110;
          break;
        case 'At least 130 cm or no height limit if accompanied by adult':
          p.minSizeWithEscort = 0;
          p.minSizeWithoutEscort = 130;
          break;
        case 'At least 9 years old':
          p.minAgeWithoutEscort = 9;
          break;
        case 'At least 110 cm or 90 cm if accompanied by adult':
          p.minSizeWithEscort = 90;
          p.minSizeWithoutEscort = 110;
          break;
        case 'At least 130 cm and 7 years old':
          p.minAgeWithoutEscort = 7;
          p.minSizeWithoutEscort = 130;
          break;
        case 'At least 130 cm or 90 cm if accompanied by adult':
          p.minSizeWithoutEscort = 130;
          p.minSizeWithEscort= 90;
          break;
        case 'At least 132 cm and 7 years old':
          p.minSizeWithoutEscort = 132;
          p.minAgeWithoutEscort = 7;
          break;
        case 'At least 140 cm':
          p.minSizeWithoutEscort = 140;
          break;
        default:
          break;
      }
    }

    return p;
  }
}
