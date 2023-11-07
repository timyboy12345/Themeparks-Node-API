import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { SeaworldBaseItem } from '../interfaces/seaworld-base-item.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';

@Injectable()
export class SeaworldTransferService extends TransferService {
  transferPoiToPoi(poi: SeaworldBaseItem, locale?: string): Poi {
    const p: Poi = {
      category: PoiCategory.UNDEFINED,
      original_category: poi.Type,
      id: `${poi.Id}`,
      original: poi,
      title: poi.Name,
      subTitle: poi.ShortDescription,
      description: poi.LongDescription,
      image_url: poi.ListingImageUrl,
    }

    if (poi.ImageUrl) {
      p.images = [poi.ImageUrl]
    }

    if (!p.image_url && poi.ImageUrl) {
      p.image_url = poi.ImageUrl;
    }

    switch (poi.Type) {
      case 'Rides':
      case 'Attractions':
        p.category = PoiCategory.ATTRACTION;
        break;
      case 'Dining':
        p.category = PoiCategory.RESTAURANT;
        break;
      case 'Services':
        p.category = PoiCategory.SERVICE;
        break;
      case 'Animal Experiences':
        p.category = PoiCategory.ANIMAL;
        break;
      case 'Restrooms':
        p.category = PoiCategory.TOILETS;
        break;
      case 'Shops':
        p.category = PoiCategory.SHOP;
        break;
      case 'Shows':
        p.category = PoiCategory.SHOW;
        break;
      case 'Venues':
        p.category = PoiCategory.EVENT_LOCATION;
        break;
      default:
        p.category = PoiCategory.UNDEFINED;
        break;
    }

    if (poi.Coordinate) {
      p.location = {
        lat: poi.Coordinate.Latitude,
        lng: poi.Coordinate.Longitude
      }
    }

    if (poi.MinimumHeight > 0) {
      p.minSizeWithEscort = Math.round(poi.MinimumHeight * 2.54)
    }

    return p
  }
}
