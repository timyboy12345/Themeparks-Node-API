import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { EuropaParkPoiInterface } from '../interfaces/europa-park-poi.interface';

@Injectable()
export class EuropaParkTransferService extends TransferService {
  transferDataObjectToPois(data: any, parkName: string): Poi[] {
    // Print POI types
    // console.log(data['poi-types'].filter((t) => ['europapark', 'rulantica'].includes(t.scope)).map((t) => t.name));

    const pois = this.transferPoisToPois(data.pois
      // Only select entries for this park
      .filter((f) => (f.scopes ?? []).includes(parkName))
      // Remove VirtualLine entries
      .filter((p) => !(p.filterIds ?? []).includes(167)));

    const areas = data.areas;
    return pois.map((p) => {
      if (!p.original.areaId) {
        return p;
      }

      return {
        ...p,
        area: areas.find((a) => a.id === p.original.areaId).name,
      };
    });
  }

  transferPoiToPoi(poi: EuropaParkPoiInterface, locale?: string): Poi {
    const p: Poi = {
      category: PoiCategory.UNDEFINED,
      description: poi.description,
      id: poi.id.toString(),
      original: poi,
      subTitle: poi.excerpt,
      title: poi.name,
    };

    switch (poi.type) {
      case 'attraction':
        p.category = PoiCategory.ATTRACTION;
        break;
      case 'gastronomy':
        p.category = PoiCategory.RESTAURANT;
        break;
      case 'sight':
        p.category = PoiCategory.UNDEFINED;
        break;
      case 'shopping':
        p.category = PoiCategory.SHOP;
        break;
      case 'showlocation':
        p.category = PoiCategory.SHOW;
        break;
      case 'hotel':
        p.category = PoiCategory.HOTEL;
        break;
      case 'park':
        p.category = PoiCategory.UNDEFINED;
        break;
      case 'eventlocation':
        p.category = PoiCategory.UNDEFINED;
        break;
      case 'service':
        p.category = PoiCategory.GUEST_SERVICES;
        break;
      default:
        p.category = PoiCategory.UNDEFINED;
    }

    if (poi.image) {
      p.image_url = poi.image.large;
    }

    if (poi.galleryMedias) {
      p.images = poi.galleryMedias.map((m) => m.xlarge);
    }

    if (poi.youtube) {
      p.videos = [{ platform: 'YOUTUBE', full_url: poi.youtube.reference, thumbnail: poi.youtube.large }];
    }

    if (poi.maxAge) {
      p.maxAge = poi.maxAge;
    }

    if (poi.minAge && poi.minAgeAdult) {
      if (poi.minAge === poi.minAgeAdult) {
        p.minAgeWithoutEscort = poi.minAge;
      } else {
        p.minAgeWithoutEscort = poi.minAge;
        p.minAgeWithEscort = poi.minAgeAdult;
      }
    } else if (poi.minAge) {
      p.minAgeWithoutEscort = poi.minAge;
    } else if (poi.minAgeAdult) {
      p.minAgeWithEscort = poi.minAgeAdult;
    }

    if (poi.minHeightAdult && poi.minHeightAdult) {
      if (poi.minHeight === poi.minHeightAdult) {
        p.minSizeWithoutEscort = poi.minHeight;
      } else {
        p.minSizeWithoutEscort = poi.minHeight;
        p.minSizeWithEscort = poi.minHeightAdult;
      }
    } else if (poi.minHeight) {
      p.minSizeWithoutEscort = poi.minHeight;
    } else if (poi.minHeightAdult) {
      p.minSizeWithEscort = poi.minHeightAdult;
    }

    if (poi.maxHeight) {
      p.maxSize = poi.maxHeight;
    }

    p.facts = [];

    poi.poiAttributes.forEach((att) => {
      switch (att.ident) {
        case 'height':
          p.facts.push({
            type: 'height',
            value: att.value,
            id: 'height',
          });
          break;
        case 'opening':
          p.facts.push({
            type: 'opened',
            value: att.value,
            id: 'opened',
          });
          break;
        case 'length':
          p.facts.push({
            type: 'length',
            value: att.value,
            id: 'length',
          });
          break;
        case 'producer':
          p.facts.push({
            type: 'manufacturer',
            value: att.value,
            id: 'manufacturer',
          });
          break;
        case 'theoretical_capacity_hour':
          p.facts.push({
            type: 'capacity',
            value: att.value,
            id: 'capacity',
          });
          break;
        default:
          break;
      }
    });

    if (poi.latitude && poi.longitude) {
      p.location = {
        lat: poi.latitude,
        lng: poi.longitude,
      };
    }

    return p;
  }
}
