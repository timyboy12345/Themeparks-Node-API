import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi, PoiStatus } from '../../../_interfaces/poi.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';

@Injectable()
export class FamilyparkTransferService extends TransferService {
  transferPoiToPoi(poi: any, locale?: string): Poi {
    const p: Poi = {
      category: PoiCategory.UNDEFINED,
      id: poi.properties.id.toString(),
      original: poi,
      title: poi.properties.name,
    };

    if (poi.geometry && poi.geometry.geometries && poi.geometry.geometries.length > 0 && poi.geometry.geometries[0].coordinates) {
      p.location = {
        lat: poi.geometry.geometries[0].coordinates[1],
        lng: poi.geometry.geometries[0].coordinates[0],
      };
    }

    if (poi.properties.images.length > 0) {
      p.image_url = poi.properties.images[0].url;
      p.previewImage = poi.properties.images[0].url;

      p.images = poi.properties.images.map((i) => i.url);
    }

    if (poi.properties.tags.area.length > 0) {
      switch (poi.properties.tags.area[0]) {
        case 163:
          p.area = 'Abentuer Insel';
          break;
        case 164:
          p.area = 'Bauernhof';
          break;
        case 165:
          p.area = 'Arlebnisburg';
          break;
        case 166:
          p.area = 'Bauernhof';
          break;
        default:
          break;
      }
    }

    if (poi.properties.tags.category.length > 0) {
      switch (poi.properties.tags.category[0]) {
        case 2:
        case 3:
          p.category = PoiCategory.ATTRACTION;
          break;
        default:
          break;
      }
    }

    if (poi.properties.technicalSpecifications.minSizeAccompanied) {
      p.minSizeWithEscort = poi.properties.technicalSpecifications.minSizeAccompanied;
    }

    if (poi.properties.technicalSpecifications.minSizeUnaccompanied) {
      p.minSizeWithoutEscort = poi.properties.technicalSpecifications.minSizeUnaccompanied;
    }

    if (poi.properties.liveData) {
      if (poi.properties.liveData.status === 94) {
        p.state = PoiStatus.CLOSED;
      } else {
        p.state = PoiStatus.OPEN;
        p.currentWaitTime = poi.properties.liveData.waitingTime ?? null;
      }
    }

    p.facts = [];
    if (poi.properties.technicalSpecifications.length) {
      p.facts.push({
        id: 'length',
        type: 'length',
        value: poi.properties.technicalSpecifications.length,
      });
    }

    if (poi.properties.technicalSpecifications.heightMax) {
      p.facts.push({
        id: 'height',
        type: 'height',
        value: poi.properties.technicalSpecifications.heightMax,
      });
    }

    if (poi.properties.technicalSpecifications.capacity) {
      p.facts.push({
        id: 'capacity',
        type: 'capacity',
        value: poi.properties.technicalSpecifications.capacity,
      });
    }

    return p;
  }
}
