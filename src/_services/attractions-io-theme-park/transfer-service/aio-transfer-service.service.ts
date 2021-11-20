import { Injectable } from '@nestjs/common';
import { TransferService } from '../../transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import {
  AioRecordsInterface,
  AioRecordsItemInterface,
} from '../../../_interfaces/attractions-io/aio-records.interface';

@Injectable()
export class AioTransferServiceService extends TransferService {
  private categories: any;

  transferPoiToPoi(poi: AioRecordsItemInterface): Poi {
    const p: Poi = {
      id: `${poi._id}`,
      title: poi.Name,
      original: poi,
      category: this.getCategory(poi.Category),
      description: poi.Summary,
      featured: poi.Featured
    };

    if (poi.Location) {
      const latLng = poi.Location.split(',');
      p.location = {
        lat: parseFloat(latLng[0]),
        lng: parseFloat(latLng[1])
      }
    }

    if (poi.MinimumAgeRequirement) {
      p.minAgeWithEscort = poi.MinimumAgeRequirement;
    }

    if (poi.MinimumUnaccompaniedAgeRequirement) {
      p.minAge = poi.MinimumUnaccompaniedAgeRequirement;
    }

    if (poi.MinimumHeightRequirement) {
      if (poi.MinimumUnaccompaniedHeightRequirement) {
        p.minSizeWithEscort = Math.round(poi.MinimumHeightRequirement * 100);
      } else {
        p.minSize = Math.round(poi.MinimumHeightRequirement * 100);
      }
    }

    if (poi.MinimumUnaccompaniedHeightRequirement) {
      p.minSize = Math.round(poi.MinimumUnaccompaniedHeightRequirement * 100);
    }

    return p;
  }

  transferDataObjectToPois(data: AioRecordsInterface, ...args): Poi[] {
    this.categories = args[0];
    return this.transferPoisToPois(data.Item);
  }

  private getCategory(id: number) {
    return this.categories(id);
  }
}
