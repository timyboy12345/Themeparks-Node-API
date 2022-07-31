import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { ApenheulAapABCItemResponseInterface } from '../interfaces/apenheul-aapabc-response.interface';
import { Poi } from '../../../_interfaces/poi.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';

@Injectable()
export class ApenheulTransferService extends TransferService {
  transferPoiToPoi(poi: ApenheulAapABCItemResponseInterface): Poi {
    return {
      category: PoiCategory.ANIMAL,
      id: poi.Title, original: poi,
      title: poi.Subtitle,
      subTitle: poi.Title,
      image_url: poi.ImageUrl,
      website_url: 'https://apenheul.nl' + poi.Url
    }
  }
}
