import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { SixflagsMapItemInterface, SixflagsRideRideTypeMapEnum } from '../interfaces/sixflags-map-item.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { RideCategory } from '../../../_interfaces/ride-category.interface';

@Injectable()
export class SixflagsTransferService extends TransferService {
  transferPoiToPoi(poi: SixflagsMapItemInterface): Poi {
    let category: PoiCategory;
    let originalCategory: string;
    let id: number;

    if (poi.name.toLowerCase().includes('slide') || (poi.description ?? '').toLowerCase().includes('slide')) {
      category = PoiCategory.SLIDE;
      id = poi.rideId;
    } else if (poi.restaurantId) {
      category = PoiCategory.RESTAURANT;
      id = poi.restaurantId;
    } else if (poi.rideId) {
      category = PoiCategory.ATTRACTION;
      id = poi.rideId;
    } else if (poi.shopId) {
      category = PoiCategory.SHOP;
      id = poi.shopId;
    } else if (poi.eventId) {
      category = PoiCategory.EVENT;
      id = poi.eventId;
    } else if (poi.facilityId) {
      category = PoiCategory.SERVICE;
      id = poi.facilityId;
    }

    const p: Poi = {
      id: id + '',
      title: poi.name,
      description: poi.body ?? poi.description,
      subTitle: poi.tagLine ?? poi.description,
      original: poi,
      category: category,
      featured: poi.isFeatured,
      fastpass: poi.isFlashPassEligible,
    };

    if ([PoiCategory.ATTRACTION, PoiCategory.SLIDE].includes(category)) {
      if (poi.rideType && poi.rideType.includes(SixflagsRideRideTypeMapEnum.RideTypeThrill)) {
        p.rideCategory = RideCategory.THRILL;
      } else if (poi.rideType && poi.rideType.includes(SixflagsRideRideTypeMapEnum.RideTypeFamily)) {
        p.rideCategory = RideCategory.FAMILY;
      } else if (poi.rideType && poi.rideType.includes(SixflagsRideRideTypeMapEnum.RideTypeKids)) {
        p.rideCategory = RideCategory.KIDS;
      } else {
        p.rideCategory = RideCategory.UNDEFINED;
      }

      // TODO: Improve min/max height
      if (poi.minimumHeight) {
        p.minSizeWithoutEscort = Math.round(poi.minimumHeight * 2.54);
      }
    }

    if (category === PoiCategory.RESTAURANT && poi.menuItems) {
      p.menuItems = [];
      poi.menuItems.forEach((value, key) => {
        p.menuItems.push({
          id: `${key}`,
          name: value.name,
        });
      });
    }

    if (poi.renderLocation) {
      p.location = {
        lat: poi.renderLocation.latitude,
        lng: poi.renderLocation.longitude,
      };
    } else if (poi.entranceLocation) {
      p.location = {
        lat: poi.entranceLocation.latitude,
        lng: poi.entranceLocation.longitude,
      };
    }

    if (poi.entranceLocation) {
      p.entrance = {
        lat: poi.entranceLocation.latitude,
        lng: poi.entranceLocation.longitude,
      };
    }

    if (poi.images && poi.images.length > 0) {
      p.images = [];

      for (const [key, value] of Object.entries(poi.images[0])) {
        if (!p.image_url) {
          p.image_url = value;
        }

        p.images.push(value);
      }
    }

    return p;
  }

  transferRideToPoi(ride: any): Poi {
    return this.transferPoiToPoi(ride);
  }

  transferRestaurantToPoi(restaurant: any): Poi {
    return this.transferPoiToPoi(restaurant);
  }

  transferShopToPoi(shop: any): Poi {
    return this.transferPoiToPoi(shop);
  }

  transferShowToPoi(show: any): Poi {
    return this.transferPoiToPoi(show);
  }
}
