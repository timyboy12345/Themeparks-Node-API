import { Injectable } from '@nestjs/common';
import { Poi } from '../../../_interfaces/poi.interface';
import { PhantasialandPoi } from '../interfaces/phantasialand-poi.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { LocalizedDataInterface } from '../../../_interfaces/localized-data.interface';
import { TransferService } from '../../../_services/transfer/transfer.service';

@Injectable()
export class PhantasialandTransferService extends TransferService {
  public transferPoiToPoi(poi: PhantasialandPoi): Poi {
    let c: PoiCategory;

    switch (poi.category) {
      case 'ATTRACTIONS':
        c = PoiCategory.ATTRACTION;
        break;
      case 'SHOWS':
        c = PoiCategory.SHOW;
        break;
      case 'RESTAURANTS_AND_SNACKS':
        c = PoiCategory.RESTAURANT;
        break;
      case 'SHOPS':
        c = PoiCategory.SHOP;
        break;
      case 'SERVICE':
        c = PoiCategory.SERVICE;
        break;
      case 'PHANTASIALAND_HOTELS':
        c = PoiCategory.HOTEL;
        break;
      case 'EVENT_LOCATIONS':
        c = PoiCategory.EVENT_LOCATION;
        break;
      case 'PHANTASIALAND_HOTELS_BARS':
        c = PoiCategory.HOTEL_BAR;
        break;
      case 'PHANTASIALAND_HOTELS_RESTAURANTS':
        c = PoiCategory.HOTEL_RESTAURANT;
        break;
      case 'THE_SIX_DRAGONS':
      default:
        c = PoiCategory.UNDEFINED;
        break;
    }

    let entrance = undefined;
    if (poi.entrance) {
      entrance = {
        lat: poi.entrance.world.lat,
        lng: poi.entrance.world.lng,
      };
    }

    return {
      id: poi.id + '',
      title: poi.title.en,
      subTitle: poi.tagline.en,
      description: poi.description.en,
      entrance: entrance,
      area: this.titleCase(poi.area.replace(/_/g, ' ')),
      location: {
        lat: poi.entrance.world.lat,
        lng: poi.entrance.world.lng,
      },
      image_url: poi.titleImage?.url,
      original_category: poi.category,
      category: c,
      original: poi,
      // Phantasialand maxAge seems to be misused and is confusing
      // maxAge: poi.maxAge,
      maxSize: poi.maxSize,
      minAgeWithoutEscort: poi.minAge,
      minSizeWithEscort: poi.minSizeEscort === 1 ? 0 : poi.minSizeEscort,
      minSizeWithoutEscort: poi.minSize,
    };
  }

  public getLocalizedData(poi: PhantasialandPoi): LocalizedDataInterface {
    return {};
  }

  private titleCase(str: string): string {
    const splitStr = str.toLowerCase().split(' ');

    for (let i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }

    // Directly return the joined string
    return splitStr.join(' ');
  }
}
