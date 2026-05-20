import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import * as sluggo from 'sluggo';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { SixflagsCedarPoiInterface } from '../interfaces/sixflags-cedar-poi.interface';

@Injectable()
export class SixflagsTransferService extends TransferService {
  transferPoiToPoi(poi: SixflagsCedarPoiInterface): Poi {
    let category: PoiCategory;
    switch (poi.type?.name) {
      case 'Waterpark Slide':
        category = PoiCategory.SLIDE;
        break;
      case 'Waterpark Pool':
        category = PoiCategory.POOL;
        break;
      case 'Thrill':
      case 'Water':
      case 'Roller Coaster':
      case 'Family':
      case 'Kiddie':
        category = PoiCategory.ATTRACTION;
        break;
      case 'Guest Services':
      case 'Cashless Kiosk':
      case 'Pet Service Relief':
      case 'Stroller and Wheelchair Rental':
        category = PoiCategory.SERVICE;
        break;
      case 'First Aid':
        category = PoiCategory.FIRSTAID;
        break;
      case 'Smoking Area':
        category = PoiCategory.SMOKING_AREA;
        break;
      case 'Lockers':
        category = PoiCategory.LOCKERS;
        break;
      default:
        category = PoiCategory.UNDEFINED;
        break;
    }

    const location = poi.location && poi.location.latitude && poi.location.latitude !== '0.000000'
      ? {
        lat: poi.location.latitude,
        lng: poi.location.longitude,
      }
      : undefined;

    return {
      id: sluggo(poi.name),
      category: category,
      original_category: poi.type?.name,
      title: poi.name.replace(/<[^>]*>/g, ''),
      original: poi,
      area: poi.area?.name,
      description: poi.description,
      location: location,
      videos: poi.mediaGallery?.filter((m) => m.type === 'video')
        .map((v) => {
          return { platform: 'YOUTUBE', full_url: v.link };
        }),
    };
  }
}
