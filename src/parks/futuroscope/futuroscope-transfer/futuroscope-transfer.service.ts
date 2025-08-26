import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { FuturoscopePoiInterface } from '../interfaces/futuroscope-pois-response.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { RideCategory } from '../../../_interfaces/ride-category.interface';

@Injectable()
export class FuturoscopeTransferService extends TransferService{
  transferPoiToPoi(poi: FuturoscopePoiInterface, locale?: string): Poi {
    let category: PoiCategory;

    switch (poi.type) {
      case 'attraction':
        category = PoiCategory.ATTRACTION;
        break;
      case 'hotel':
        category = PoiCategory.HOTEL;
        break;
      case 'shop':
        category = PoiCategory.SHOP;
        break;
      case 'restaurant':
        category = PoiCategory.RESTAURANT;
        break;
      case 'service':
        category = PoiCategory.SERVICE;
        break;
      case 'wc':
        category = PoiCategory.TOILETS;
        break;
      case 'bar':
        category = PoiCategory.BAR;
        break;
      default:
        category = PoiCategory.UNDEFINED;
        break;
    }

    const p: Poi  = {
      category: category,
      id: poi.id.toString(),
      original: poi,
      title: poi.title,
      description: poi.details[0].text,
    }

    if (poi.latitude && poi.longitude) {
      p.location = {
        lat: Number.parseFloat(poi.latitude),
        lng: Number.parseFloat(poi.longitude)
      }
    }

    if (poi.medias && poi.medias.length > 0) {
      p.previewImage = poi.medias[0].image;
      p.image_url = poi.medias[0].image;
    }

    if (poi.duration && !poi.duration.includes(':')) {
      p.duration = Number.parseInt(poi.duration.split(' ')[0])
    }

    if (poi.theme) {
      switch (poi.theme) {
        case 'Shows':
          p.category = PoiCategory.SHOW;
          break;
        case 'Thrills':
          p.rideCategory  =RideCategory.THRILL;
          break;
        case 'Fun for all':
          p.rideCategory = RideCategory.FAMILY;
          break;
        default:
          break;
      }
    }

    if (poi.share) {
      p.website_url = poi.share;
    }

    if (poi.pdfmenu) {
      p.menuUrl = poi.share;
    }

    return p;
  }
}
