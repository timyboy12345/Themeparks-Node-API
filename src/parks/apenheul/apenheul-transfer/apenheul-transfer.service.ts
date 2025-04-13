import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { ApenheulAapABCItemResponseInterface } from '../interfaces/apenheul-aapabc-response.interface';
import { Poi } from '../../../_interfaces/poi.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import * as sluggo from 'sluggo';

@Injectable()
export class ApenheulTransferService extends TransferService {
  transferPoiToPoi(poi: ApenheulAapABCItemResponseInterface): Poi {
    return {
      category: PoiCategory.ANIMAL,
      id: sluggo(poi.title),
      original: poi,
      title: poi.title,
      subTitle: poi.intro ?? poi.weight,
      image_url: poi.image ? 'https://apenheul.nl' + poi.image.url : null,
      images: [poi.image ? 'https://apenheul.nl' + poi.image.url : null],
      website_url: 'https://apenheul.nl' + poi.link.url,
    };
  }
}
