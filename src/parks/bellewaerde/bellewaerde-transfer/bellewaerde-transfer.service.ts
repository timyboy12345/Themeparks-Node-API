import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { RideCategory } from '../../../_interfaces/ride-category.interface';
import { BellewaerdeAttractionResponseInterface } from '../interfaces/bellewaerde-attractions-response.interface';

@Injectable()
export class BellewaerdeTransferService extends TransferService {
  transferRestaurantToPoi(restaurant: BellewaerdeAttractionResponseInterface, locale?: string): Poi {
    const r = {
      id: restaurant.waitingTimeName,
      original: restaurant,
      category: PoiCategory.RESTAURANT,
      title: restaurant.title,
      description: restaurant.shortDescription,
      subTitle: restaurant.subtitle,
      location: {
        lat: restaurant.latitude,
        lng: restaurant.longitude,
      },
      area: restaurant.zone.title,
    };

    // switch (restaurant.type.id) {
    //   case 'blw:restaurant-types/fast-food':
    //     r.category = PoiCategory.fast
    //     break;
    // }

    return r;
  }
  transferShopToPoi(shop: BellewaerdeAttractionResponseInterface, locale?: string): Poi {
    const s = {
      id: shop.waitingTimeName,
      original: shop,
      category: PoiCategory.SHOP,
      title: shop.title,
      description: shop.shortDescription,
      subTitle: shop.subtitle,
      location: {
        lat: shop.latitude,
        lng: shop.longitude,
      },
      area: shop.zone.title,
    };

    return s;
  }

  public transferRideToPoi(poi: BellewaerdeAttractionResponseInterface): Poi {
    const imageBase = 'https://www.bellewaerde.be';

    let c = PoiCategory.ATTRACTION;
    const ride: Poi = {
      id: poi.waitingTimeName,
      original: poi,
      category: c,
      title: poi.title,
      description: poi.shortDescription,
      subTitle: poi.subtitle,
      location: {
        lat: poi.latitude,
        lng: poi.longitude,
      },
      area: poi.zone.title,
    };

    if (poi.mainVideo) {
      ride.videos = [{
        platform: 'URL',
        full_url: imageBase + poi.mainVideo,
      }];
    }

    switch (poi.type.id) {
      case 'blw:attraction-target-groups/families':
        ride.rideCategory = RideCategory.FAMILY;
        break;
      case 'blw:attraction-target-groups/sensations':
        ride.rideCategory = RideCategory.THRILL;
        break;
      case 'blw:attraction-target-groups/kids':
        ride.rideCategory = RideCategory.KIDS;
        break;
      default:
        ride.rideCategory = RideCategory.UNDEFINED;
        break;
    }

    if (poi.mainImage) {
      ride.image_url = imageBase + poi.mainImage.renditions
        .filter((i) => i.width <= 700)
        .sort((a, b) => {
          return a.width < b.width ? 1 : -1;
        })[0].url;
      ride.images = [imageBase + poi.mainImage.path];
    }

    if (poi.heightSoloRide) {
      ride.minSizeWithoutEscort = poi.heightSoloRide;
    }

    if (poi.heightAccompaniedByAdult) {
      ride.minSizeWithEscort = poi.heightAccompaniedByAdult;
    }

    if (poi.maxHeightNotAllowed) {
      ride.maxSize = poi.maxHeightNotAllowed;
    }

    ride.facts = [];

    if (poi.rideDetails) {
      if (poi.rideDetails.speed) {
        ride.facts.push({
          type: 'speed',
          id: 'speed',
          value: poi.rideDetails.speed.toString()
        })
      }

      if (poi.rideDetails.height) {
        ride.facts.push({
          type: 'height',
          id: 'height',
          value: poi.rideDetails.height.toString()
        })
      }

      if (poi.rideDetails.length) {
        ride.facts.push({
          type: 'length',
          id: 'length',
          value: poi.rideDetails.length.toString()
        })
      }

      if (poi.rideDetails.capacity) {
        ride.facts.push({
          type: 'capacity',
          id: 'capacity',
          value: poi.rideDetails.capacity.toString()
        })
      }

      if (poi.rideDetails.yearOfConstruction) {
        ride.facts.push({
          type: 'build_in',
          id: 'build_in',
          value: poi.rideDetails.yearOfConstruction.toString()
        })
      }
    }

    return ride;
  }
}
