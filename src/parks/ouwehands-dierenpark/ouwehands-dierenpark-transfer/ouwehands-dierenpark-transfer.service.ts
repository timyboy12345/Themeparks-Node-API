import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import {
  OuwehandsDierenparkResponseImageInterface,
  OuwehandsDierenparkResponseItemInterface,
} from '../interfaces/ouwehands-dierenpark-response.interface';
import { Poi } from '../../../_interfaces/poi.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OuwehandsDierenparkTransferService extends TransferService {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  transferPoiToPoi(poi: OuwehandsDierenparkResponseItemInterface): Poi {
    let id = poi.title.toLowerCase();
    id = id.replace(/\W/g, '');

    const baseUrl = this.configService.get('OUWEHANDS_DIERENPARK_API_URL');
    const url = `${baseUrl}${poi.url}`;

    const p: Poi = {
      id: id,
      title: poi.title,
      description: poi.description,
      original: poi,
      category: PoiCategory.ANIMAL,
      website_url: url,
    };

    if (poi.image) {
      const parsedImage: OuwehandsDierenparkResponseImageInterface = JSON.parse(poi.image);

      if (parsedImage.base) {
        const imageUrl = `${baseUrl}${this.parseImageUrl(parsedImage.base)}`
        p.image_url = imageUrl;
        p.images = [imageUrl];
      }

      if (parsedImage.renditions.small['400x380'] && parsedImage.renditions.small['400x380'].src != 'resolution_not_found') {
        p.previewImage = `${baseUrl}${this.parseImageUrl(parsedImage.renditions.small['400x380'].src)}`;
      }
    }

    return p;
  }

  private parseImageUrl(url: string): string {
    return url
      ? url.replace(/\/\/\//g, '/').replace(/\/$/, '')
      : null;
  }
}
