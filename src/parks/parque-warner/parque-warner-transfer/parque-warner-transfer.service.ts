import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { ParqueWarnerResponseDocInterface } from '../interfaces/parque-warner-response.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ParqueWarnerTransferService extends TransferService {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  transferPoiToPoi(poi: ParqueWarnerResponseDocInterface): Poi {
    const imageUrl = this.configService.get('PARQUE_WARNER_IMAGE_URL');

    let category: PoiCategory;

    switch (poi.type_s) {
      case 'attractions':
        category = PoiCategory.ATTRACTION;
        break;
      case 'events':
        category = PoiCategory.SHOW;
        break;
      case 'stores':
        category = PoiCategory.SHOP;
        break;
      case 'restaurants':
        category = PoiCategory.RESTAURANT;
        break;
      default:
        category = PoiCategory.UNDEFINED;
        break;
    }

    const p: Poi = {
      id: poi.id,
      title: poi.attractionName_s ?? poi.restaurantName_s ?? poi.storeName_s ?? poi.eventName_s,
      subTitle: poi.briefDescription_s,
      description: poi.description_s,
      original: poi,
      category: category,
      original_category: poi.type_s,
    };

    if (poi['theme-areas_ss'] && poi['theme-areas_ss'].length > 0) {
      p.area = poi['theme-areas_ss'][0];
    }

    if (poi.mainImage_s) {
      p.image_url = `${imageUrl}${poi.mainImage_s}`;
    }

    if (poi.galleryPhoto_ss) {
      p.images = poi.galleryPhoto_ss.map(i => {
        return `${imageUrl}${i}`;
      });
    }

    if (poi.realpath && poi.realpath.length > 0) {
      p.website_url = `${imageUrl}${poi.realpath[0]}`;
    }

    if (poi.longitude_s && poi.latitude_s) {
      p.location = {
        lat: parseFloat(poi.latitude_s),
        lng: parseFloat(poi.longitude_s)
      }
    }

    if (poi.minHeight_ss && poi.minHeight_ss.length > 0) {
      p.minSize = parseInt(poi.minHeight_ss[0].split(' ')[0]);
    }

    if (poi.maxHeight_ss && poi.maxHeight_ss.length > 0) {
      p.maxSize = parseInt(poi.maxHeight_ss[0].split(' ')[0]);
    }

    return p;
  }
}
