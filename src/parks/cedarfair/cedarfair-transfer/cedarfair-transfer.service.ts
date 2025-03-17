import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { CedarfairBaseResponseInterface } from '../interfaces/cedarfair-base-response.interface';
import { Poi } from '../../../_interfaces/poi.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import * as sluggo from 'sluggo';

@Injectable()
export class CedarfairTransferService extends TransferService {
  transferPoiToPoi(poi: CedarfairBaseResponseInterface): Poi {
    let c: PoiCategory;
    let rawCategory = poi.fimsId.split('-')[0];
    switch (rawCategory) {
      case 'RIDE':
        c = PoiCategory.ATTRACTION;
        break;
      case 'RESTAURANT':
        c = PoiCategory.RESTAURANT;
        break;
      case 'SHOW':
        c = PoiCategory.SHOW;
        break;
      case 'RESTROOM':
        c = PoiCategory.TOILETS;
        break;
      case 'RETAIL':
        c = PoiCategory.SHOP;
        break;
      case 'GS':
        c = PoiCategory.GUEST_SERVICES;
        break;
      case 'PARKING':
        c = PoiCategory.PARKING;
        break;
      default:
        c = PoiCategory.UNDEFINED;
        break;
    }

    let id: string;

    if (poi.name) {
      id = sluggo(poi.name);
    } else {
      id = poi.uuid;
    }

    const p: Poi = {
      id: id,
      title: poi.name,
      original: poi,
      category: c,
      description: poi.description,
    };

    if (poi.area && poi.area.name) {
      p.area = poi.area.name;
    }

    function inchToCm(inch: number): number {
      return Math.round(inch * 2.54);
    }

    if (poi.height) {
      if (poi.height.maxAlone) {
        p.maxSize = inchToCm(poi.height.maxAlone);
      }

      if (poi.height.minAccompanied >= 0 && poi.height.maxAccompanied === poi.height.minAlone) {
        p.minSizeWithEscort = inchToCm(poi.height.minAccompanied);
        p.minSizeWithoutEscort = inchToCm(poi.height.minAlone);
      } else if (poi.height.minAccompanied === 0 && poi.height.minAlone > 0) {
        p.minSizeWithoutEscort = inchToCm(poi.height.minAlone);
      }
    }

    if (poi.location) {
      p.location = {
        lat: parseFloat(poi.location.latitude),
        lng: parseFloat(poi.location.longitude),
      };
    }

    const baseURL: string = 'https://cdn-cloudfront.cfauthx.com/binaries';

    if (poi.image) {
      p.image_url = baseURL + poi.image;
      p.previewImage = baseURL + poi.image;
    }

    if (poi.mediaGallery) {
      const images = poi.mediaGallery
        .filter((i) => i.type == 'ImageCompound');
      const videos = poi.mediaGallery
        .filter((i) => i.type == 'VideoCompound');

      p.images = images
        // @ts-ignore
        .map((i) => baseURL + i.image);

      if (videos.length > 0) {
        p.videos = videos.map((v) => {
          return {
            platform: "YOUTUBE",
            embed_id: v.id
          }
        })
      }
    }

    return p;
  }
}
