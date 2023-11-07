import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { HersheyparkResponseItem } from '../interfaces/hersheypark-response.interface';
import { RideCategory } from '../../../_interfaces/ride-category.interface';

@Injectable()
export class HersheyparkTransferService extends TransferService {
  transferPoiToPoi(poi: HersheyparkResponseItem, locale?: string): Poi {
    let p: Poi = {
      category: PoiCategory.UNDEFINED,
      id: `${poi.id}`,
      original: poi,
      title: poi.name,
      description: poi.description,
      images: poi.images,
      image_url: poi.thumbnail,
      // TODO: Fix Park Area
      area: poi.parkarea?.name,
      facts: [],
      fastpass: poi.fasttrack,
    };

    if (poi.latitude !== 0 && poi.longitude !== 0) {
      p.location = {
        lat: poi.latitude,
        lng: poi.longitude,
      }
    }

    if (poi.rating) {
      switch (poi.rating.id) {
        case 1:
          p.rideCategory = RideCategory.KIDS;
          break;
        case 2:
        case 3:
          p.rideCategory = RideCategory.FAMILY;
          break;
        case 4:
        case 5:
          p.rideCategory = RideCategory.THRILL;
          break;
        default:
          break;
      }
    }

    if (poi.factMaxSpeed) {
      let speed = parseInt(poi.factMaxSpeed);

      p.facts.push({
        id: 'max-speed',
        type: 'speed',
        value: `${Math.round(speed * 1.609344)}`,
      });
    }

    if (poi.factHeight) {
      let height = parseInt(poi.factHeight);

      p.facts.push({
        id: 'height',
        type: 'height',
        value: `${Math.round(height * 0.3048)}`,
      });
    }

    if (poi.factLength) {
      let length = parseInt(poi.factLength);

      p.facts.push({
        id: 'length',
        type: 'length',
        value: `${Math.round(length * 1.609344)}`,
      });
    }

    if (poi.factTime) {
      let timeArray = poi.factTime.split(':').map((i) => parseInt(i));

      p.facts.push({
        id: 'duration',
        type: 'duration',
        value: `${(timeArray[0] * 60) + timeArray[1]}`,
      });
    }

    if (poi.videos) {
      p.videos = poi.videos.map((v) => {
        return {
          platform: 'YOUTUBE',
          embed_id: v,
        };
      });
    }

    return p;
  }

  transferRideToPoi(ride: any, locale?: string): Poi {
    return {
      ...this.transferPoiToPoi(ride),
      category: PoiCategory.ATTRACTION,
    };
  }

  transferRestaurantToPoi(restaurant: any, locale?: string): Poi {
    return {
      ...this.transferPoiToPoi(restaurant),
      category: PoiCategory.RESTAURANT,
    };
  }

  transferShowToPoi(show: any, locale?: string): Poi {
    return {
      ...this.transferPoiToPoi(show),
      category: PoiCategory.SHOW,
    };
  }

  transferShopToPoi(shop: any, locale?: string): Poi {
    return {
      ...this.transferPoiToPoi(shop),
      category: PoiCategory.SHOP,
    };
  }

  transferAnimalToPoi(animal: any, locale?: string): Poi {
    return {
      ...this.transferPoiToPoi(animal),
      category: PoiCategory.ANIMAL,
    };
  }
}
