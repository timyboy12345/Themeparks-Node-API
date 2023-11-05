import { Injectable } from '@nestjs/common';
import { Poi } from '../../../_interfaces/poi.interface';
import { PortaVenturaPoi } from '../interfaces/porta-ventura-poi.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { TransferService } from '../../../_services/transfer/transfer.service';

@Injectable()
export class PortaVenturaTransferService extends TransferService {
  // TODO: Add all supported elements
  transferPoiToPoi(poi: PortaVenturaPoi, locale?: string): Poi {
    const p: Poi = {
      id: `${poi.id}`,
      title: poi.attributes.name,
      category: undefined,
      description: poi.attributes.description,
      location: {
        lat: poi.attributes.latitude,
        lng: poi.attributes.longitude,
      },
      original: poi,
    };

    if (poi.attributes.images && poi.attributes.images.data) {
      let images = [];
      let thumb = null;

      poi.attributes.images.data.forEach((imageObject) => {
        if (imageObject.attributes.formats) {
          if (imageObject.attributes.formats.large) {
            images.push(imageObject.attributes.formats.large.url);
          } else if (imageObject.attributes.formats.medium) {
            images.push(imageObject.attributes.formats.medium.url);
          } else if (imageObject.attributes.formats.small) {
            images.push(imageObject.attributes.formats.small.url);
          }

          if (imageObject.attributes.formats.small && !thumb) {
            thumb = imageObject.attributes.formats.small.url;
          } else if (imageObject.attributes.formats.thumbnail && !thumb) {
            thumb = imageObject.attributes.formats.thumbnail.url;
          }
        }
      })

      p.images = images;
      p.previewImage = thumb;
    }

    if (poi.attributes.area && poi.attributes.area.data) {
      p.area = poi.attributes.area.data.attributes.name
    }

    return p;
  }

  transferRideToPoi(ride: any, locale?: string): Poi {
    const r = this.transferPoiToPoi(ride, locale);
    r.category = PoiCategory.ATTRACTION;
    return r;
  }

  transferShowToPoi(ride: any, locale?: string): Poi {
    const r = this.transferPoiToPoi(ride, locale);
    r.category = PoiCategory.SHOW;
    return r;
  }

  transferShopToPoi(ride: any, locale?: string): Poi {
    const r = this.transferPoiToPoi(ride, locale);
    r.category = PoiCategory.SHOP;
    return r;
  }

  transferRestaurantToPoi(ride: any, locale?: string): Poi {
    const r = this.transferPoiToPoi(ride, locale);
    r.category = PoiCategory.RESTAURANT;
    return r;
  }
}
