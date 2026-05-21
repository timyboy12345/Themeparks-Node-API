import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import * as sluggo from 'sluggo';
import * as moment from 'moment-timezone';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { SixflagsCedarPoiInterface } from '../interfaces/sixflags-cedar-poi.interface';
import { ThemeParkOpeningTimes } from '../../../_interfaces/park-openingtimes.interface';
import { SixflagsCedarOpeningHoursInterface } from '../interfaces/sixflags-cedar-opening-hours.interface';

// TODO: Find out where show times are stored when a sixflags park is open
@Injectable()
export class SixflagsTransferService extends TransferService {
  transferPoiToPoi(poi: SixflagsCedarPoiInterface): Poi {
    let category: PoiCategory;
    switch (poi.type?.name) {
      case 'Waterpark Slide':
        category = PoiCategory.SLIDE;
        break;
      case 'Waterpark Pool':
        category = PoiCategory.POOL;
        break;
      case 'Thrill':
      case 'Water':
      case 'Roller Coaster':
      case 'Family':
      case 'Kiddie':
        category = PoiCategory.ATTRACTION;
        break;
      case 'Guest Services':
      case 'Cashless Kiosk':
      case 'Pet Service Relief':
      case 'Stroller and Wheelchair Rental':
        category = PoiCategory.SERVICE;
        break;
      case 'First Aid':
        category = PoiCategory.FIRSTAID;
        break;
      case 'Smoking Area':
        category = PoiCategory.SMOKING_AREA;
        break;
      case 'Lockers':
        category = PoiCategory.LOCKERS;
        break;
      default:
        category = PoiCategory.UNDEFINED;
        break;
    }

    if (poi.foodTypes || poi.fimsId.includes('RESTAURANT')) {
      category = PoiCategory.RESTAURANT;
    }

    if (poi.fimsId.includes('RETAIL')) {
      category = PoiCategory.SHOP;
    }

    if (poi.fimsId.includes('RESTROOM')) {
      category = PoiCategory.TOILETS;
    }

    if (poi.fimsId.includes('SHOW')) {
      category = PoiCategory.SHOW;
    }

    const location = poi.location && poi.location.latitude && poi.location.latitude !== '0.000000'
      ? {
        lat: poi.location.latitude,
        lng: poi.location.longitude,
      }
      : undefined;

    return {
      // TODO: The slug for quidiya city does not work correctly, just like some campground parks
      id: sluggo(poi.name),
      category: category,
      original_category: poi.type?.name,
      title: poi.name
        .replace(/<[^>]*>/g, '')
        .replace(/&#x27;/g, '\''),
      image_url: poi.image,
      previewImage: poi.image,
      original: poi,
      area: poi.area?.name,
      description: poi.description,
      location: location,
      videos: poi.mediaGallery?.filter((m) => m.type === 'video')
        .map((v) => {
          return { platform: 'YOUTUBE', full_url: v.link };
        }),
    };
  }

  transferOpeningTimesToOpeningTimes(openingTimes: SixflagsCedarOpeningHoursInterface, locale?: string): ThemeParkOpeningTimes[] {
    return openingTimes.dates
      .filter((d) => !d.isParkClosed)
      .map((d) => {
        return {
          date: moment.parseZone(d.date, 'MM/DD/YYYY').format(),
          openingTimes: d.operatings[0].items.map((o) => {
            return {
              open: o.timeFrom,
              openTime: o.timeFrom,
              close: o.timeTo,
              closeTime: o.timeTo,
            };
          }),
        };
      });
  }
}
