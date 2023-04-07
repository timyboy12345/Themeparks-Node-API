import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { ContentfulRideBlock } from '../interfaces/attraktioner-response.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';

@Injectable()
export class GronaLundTransferService extends TransferService{
  transferRideToPoi(poi: ContentfulRideBlock): Poi {
    const p: Poi = {
      id: poi.id,
      title: poi.title,
      category: PoiCategory.ATTRACTION,
      original: poi
    }

    if (poi.minimumHeightInteger) {
      p.minSizeWithoutEscort = poi.minimumHeightInteger;
    }

    if (poi.ageRequirement === 'Rek. från 11 år') {
      p.minAgeWithoutEscort = 11;
    }

    if (poi.imageInList.file) {
      p.image_url = poi.imageInList.file.url;
      p.previewImage = poi.imageInList.file.url;
    }

    if (poi.tags) {
      p.tags = poi.tags.map(t => t.title);
    }

    if (poi.couponCount) {
      p.price = Number.parseInt(poi.couponCount);
      p.priceName = 'Coupons';
      p.priceType = 'tokens';
    }

    return p;
  }
}
