import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';

@Injectable()
export class PuyDeFouTransferService extends TransferService {
  transferPoiToPoi(poi: any, locale?: string): Poi {
    const p: Poi = {
      category: PoiCategory.UNDEFINED,
      id: poi.pid,
      original: poi,
      title: poi.title,
      subTitle: poi.subject,
      description: poi.description,
    };

    poi.tags.split(',').forEach((tag: string) => {
      switch (tag) {
        case 'restaurants':
          p.category = PoiCategory.RESTAURANT;
          break;
        case 'shows':
          p.category = PoiCategory.SHOW;
          break;
        default:
          break;
      }
    });

    if (poi.title.toLowerCase().includes('pdf') || poi.hasParent) {
      p.category = PoiCategory.UNDEFINED;
    }

    return p;
  }
}
