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
  private defaultLanguage: string;

  transferPoiToPoi(poi: AioRecordsItemInterface): Poi {
    const p: Poi = {
      id: `${poi._id}`,
      title: this.getProperty(poi, 'Name'),
      original: poi,
      category: this.getCategory(poi.Category),
      description: this.getProperty(poi, 'Summary'),
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
    this.defaultLanguage = args[1];
    return this.transferPoisToPois(data.Item);
  }

  private getCategory(id: number) {
    return this.categories(id);
  }

  private getProperty(poi: AioRecordsItemInterface, property: string): string {
    const data = poi[property];

    if (typeof data === 'object' && data) {
      return data[this.defaultLanguage ?? 'en-GB'];
    }

    return data;
  }
}
