import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';

@Injectable()
export class ArtisTransferService extends TransferService {
  transferPoiToPoi(poi: any, locale?: string): Poi {
    let cat: PoiCategory = PoiCategory.UNDEFINED;

    switch (poi.category) {
      case 'animals':
        cat = PoiCategory.ANIMAL;
        break;
      case 'plants':
        cat = PoiCategory.UNDEFINED;
        break;
      case 'art-and-history':
        cat = PoiCategory.UNDEFINED;
        break;
      case 'facilities':
        cat = PoiCategory.GUEST_SERVICES;
        break;
      case 'food-and-drinks':
        cat = PoiCategory.RESTAURANT;
        break;
      default:
        break;
    }

    const p: Poi = {
      category: cat,
      original: poi,
      title: poi.title,
      id: poi.id,
      subTitle: poi.subtitle,
      description: poi.details?.description,
      location: poi.coordinates,
    };

    if (poi.images) {
      p.image_url = poi.images.header.image;
      p.previewImage = poi.images.header.thumbnail;
    }

    if (poi.details.moreInfo) {
      p.website_url = `https://www.artis.nl/${poi.details.moreInfo.url}`;
    }

    if (poi.details.regular) {
      // TODO: Add these facts
    }

    // TODO: poi.openingTimes

    return p;
  }
}
