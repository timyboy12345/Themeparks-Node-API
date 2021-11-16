import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import {
  CedarfairBaseResponseInterface,
  CedarfairBaseResponseType,
} from '../interfaces/cedarfair-base-response.interface';
import { Poi } from '../../../_interfaces/poi.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';

@Injectable()
export class CedarfairTransferService extends TransferService {
  transferPoiToPoi(poi: CedarfairBaseResponseInterface): Poi {
    let c: PoiCategory = PoiCategory.UNDEFINED;

    switch (poi.type) {
      case CedarfairBaseResponseType.ATM:
        c = PoiCategory.ATM;
        break;
      case CedarfairBaseResponseType.Coasters:
      case CedarfairBaseResponseType.Attractions:
      case CedarfairBaseResponseType.Family:
      case CedarfairBaseResponseType.Kids:
      case CedarfairBaseResponseType.ThrillRides:
        c = PoiCategory.ATTRACTION;
        break;
      case CedarfairBaseResponseType.FunPix:
        c = PoiCategory.PHOTO_SHOP;
        break;
      case CedarfairBaseResponseType.Lockers:
        c = PoiCategory.LOCKERS;
        break;
      case CedarfairBaseResponseType.Restrooms:
        c = PoiCategory.TOILETS;
        break;
      case CedarfairBaseResponseType.Meals:
      case CedarfairBaseResponseType.wpDining:
        c = PoiCategory.RESTAURANT;
        break;
      case CedarfairBaseResponseType.Snacks:
        c = PoiCategory.SNACKBAR;
        break;
      case CedarfairBaseResponseType.SmokingArea:
        c = PoiCategory.SMOKING_AREA;
        break;
      case CedarfairBaseResponseType.Waterpark:
        c = PoiCategory.SLIDE;
        break;
      case CedarfairBaseResponseType.Shopping:
        c = PoiCategory.SHOP;
        break;
      case CedarfairBaseResponseType.Venue:
        c = PoiCategory.SHOW;
        break;
      default:
        break;
    }

    const p: Poi = {
      id: poi.id,
      title: poi.label,
      original: poi,
      category: c,
      description: poi.description,
    };

    if (poi.location) {
      p.location = {
        lat: poi.location.lat,
        lng: poi.location.lon,
      };
    }

    if (poi.images && poi.images.length > 0) {
      p.image_url = poi.images[0].src;
      p.images = [poi.images[0].src];
      p.previewImage = poi.images[0].src;
    }

    return p;
  }
}
