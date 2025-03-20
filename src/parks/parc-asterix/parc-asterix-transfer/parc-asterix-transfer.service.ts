import { Injectable } from '@nestjs/common';
import { Poi } from '../../../_interfaces/poi.interface';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { ConfigService } from '@nestjs/config';
import * as sluggo from 'sluggo';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';

@Injectable()
export class ParcAsterixTransferService extends TransferService {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  transferPoiToPoi(poi: any, locale?: string): Poi {
    const p: Poi = {
      category: PoiCategory.ATTRACTION,
      id: sluggo(poi.title),
      original: poi,
      title: poi.title,
      description: poi.description,
      subTitle: poi.summary,
    };

    if (poi.latitude && poi.longitude) {
      p.location = {
        lat: poi.latitude,
        lng: poi.longitude,
      };
    }

    if (poi.logo) {
      const logo = JSON.parse(poi.logo);
      p.image_url = logo.url;
    }

    if (poi.sliders) {
      const sliders = JSON.parse(poi.sliders);
      p.images = sliders.map((m) => m.url);
    }

    if (poi.is_best) {
      p.featured = Boolean(poi.is_best);
    }

    if (poi.min_size) {
      p.minSizeWithEscort = poi.min_size;
    }

    if (poi.min_size_unaccompanied) {
      p.minSizeWithoutEscort = poi.min_size_unaccompanied;
    }

    p.photoPoint = Boolean(poi.has_picture_point);

    return p;
  }

  transferRideToPoi(ride: any, locale?: string): Poi {
    return { ...this.transferPoiToPoi(ride), category: PoiCategory.ATTRACTION };
  }

  transferHotelToPoi(ride: any, locale?: string): Poi {
    return { ...this.transferPoiToPoi(ride), category: PoiCategory.HOTEL };
  }

  transferShopToPoi(ride: any, locale?: string): Poi {
    return { ...this.transferPoiToPoi(ride), category: PoiCategory.SHOP };
  }

  transferShowToPoi(ride: any, locale?: string): Poi {
    return { ...this.transferPoiToPoi(ride), category: PoiCategory.SHOW };
  }

  transferRestaurantToPoi(ride: any, locale?: string): Poi {
    return { ...this.transferPoiToPoi(ride), category: PoiCategory.RESTAURANT };
  }
}
