import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { WildlandsAnimalsResponseItemInterface } from '../interfaces/wildlands-animals-response.interface';
import { Poi } from '../../../_interfaces/poi.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WildlandsTransferService extends TransferService {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  transferPoiToPoi(poi: WildlandsAnimalsResponseItemInterface): Poi {
    const baseUrl = this.configService.get('WILDLANDS_API_URL');
    const url = `${baseUrl}${poi.url}`;

    const p: Poi = {
      id: poi.id,
      title: poi.title,
      area: poi.world,
      original: poi,
      category: PoiCategory.ANIMAL,
      website_url: url
    };

    if (poi.photo) {
      p.image_url = `${baseUrl}${poi.photo['750x330']}`;
      p.previewImage = `${baseUrl}${poi.photo['400x230']}`;
      p.images = [`${baseUrl}${poi.photo['750x330']}`];
    }

    return p;
  }
}
