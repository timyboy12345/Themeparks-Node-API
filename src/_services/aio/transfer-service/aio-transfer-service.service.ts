import { Injectable } from '@nestjs/common';
import { TransferService } from '../../transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import {
  AioRecordsInterface,
  AioRecordsItemInterface,
} from '../../../_interfaces/attractions-io/aio-records.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';

@Injectable()
export class AioTransferServiceService extends TransferService {
  private getCategory: any;
  private defaultLanguage: string;

  transferPoiToPoi(poi: AioRecordsItemInterface): Poi {
    const p: Poi = {
      id: `${poi._id}`,
      title: this.getProperty(poi, 'Name'),
      original: poi,
      original_category: poi.Category.toString(),
      category: this.getCategoryById(poi.Category),
      description: this.getProperty(poi, 'Summary'),
      featured: poi.Featured,
    };

    if (poi.Location) {
      const latLng = poi.Location.split(',');
      p.location = {
        lat: parseFloat(latLng[0]),
        lng: parseFloat(latLng[1]),
      };
    }

    if (poi.MinimumAgeRequirement) {
      p.minAgeWithEscort = poi.MinimumAgeRequirement;
    }

    if (poi.MinimumUnaccompaniedAgeRequirement) {
      p.minAgeWithoutEscort = poi.MinimumUnaccompaniedAgeRequirement;
    }

    if (poi.MinimumHeightRequirement) {
      // if (poi.MinimumUnaccompaniedHeightRequirement) {
      //   p.minSizeWithoutEscort = Math.round(poi.MinimumHeightRequirement * 100);
      // } else {
      p.minSizeWithEscort = Math.round(poi.MinimumHeightRequirement * 100);
      // }
    }

    if (poi.MinimumUnaccompaniedHeightRequirement) {
      p.minSizeWithoutEscort = Math.round(poi.MinimumUnaccompaniedHeightRequirement * 100);
    }

    return p;
  }

  transferDataObjectToPois(data: AioRecordsInterface, ...args): Poi[] {
    this.getCategory = args[0];
    this.defaultLanguage = args[1];
    return this.transferPoisToPois(data.Item);
  }

  // TODO: We should keep track of parks that have a lot if ID's not recognized, as that may be a sign a lot of new IDs have been implemented
  private getCategoryById(id: number) {
    const category = this.getCategory(id);
    return category ?? PoiCategory.UNDEFINED;
  }

  private getProperty(poi: AioRecordsItemInterface, property: string): string {
    const data = poi[property];

    if (typeof data === 'object' && data) {
      return data[this.defaultLanguage ?? 'en-GB'];
    }

    return data;
  }
}
