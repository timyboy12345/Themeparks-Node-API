import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import {
  HansaParkDataResponseCategoryIdEnum,
  HansaParkDataResponseItemInterface,
} from '../interfaces/hansa-park-data-response.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import * as moment from 'moment';

@Injectable()
export class HansaParkTransferService extends TransferService {
  transferPoiToPoi(poi: HansaParkDataResponseItemInterface): Poi {
    let category: PoiCategory = PoiCategory.UNDEFINED;
    const categoryIds = poi.categories.map(c => c.id);

    if (categoryIds.includes(HansaParkDataResponseCategoryIdEnum.Attractions)) {
      category = PoiCategory.ATTRACTION;
    }

    if (categoryIds.includes(HansaParkDataResponseCategoryIdEnum.Restaurants)) {
      category = PoiCategory.RESTAURANT;
    }

    const thumbnailUrl = poi.images && poi.images.length > 0 ? poi.images[0].resized.medium : null;

    const p: Poi = {
      id: `${poi.id}`,
      title: poi.name,
      category: category,
      original: poi,
      images: poi.images.map(i => i.fullPath),
      image_url: thumbnailUrl,
    };

    if (poi.themeworlds && poi.themeworlds.length > 0) {
      p.area = poi.themeworlds[0].name;
    }

    if (poi.geo) {
      p.location = {
        lat: poi.geo.lat,
        lng: poi.geo.lon,
      };
    }

    if (poi.waitingTime && poi.waitingTime.prefix != 'n.A') {
      p.currentWaitTime = poi.waitingTime.minutes;
    }

    if (poi.restrictions.childAlone && !Array.isArray(poi.restrictions.childAlone)) {
      p.minSizeWithoutEscort = poi.restrictions.childAlone.heightMin;
      p.maxAge = poi.restrictions.childAlone.ageMax;
    }

    if (poi.restrictions.withAdult && !Array.isArray(poi.restrictions.withAdult)) {
      p.minAgeWithEscort = poi.restrictions.withAdult.ageMin;
      p.minSizeWithEscort = poi.restrictions.withAdult.heightMin;
    }

    if (poi.openingHoursFrom && poi.openingHoursTo) {
      const momentOpenTime = moment().set({
        'hour': parseInt(poi.openingHoursFrom.split(':')[0]),
        'minutes': parseInt(poi.openingHoursFrom.split(':')[1]),
        'seconds': 0,
      });

      const momentCloseTime = moment().set({
        'hour': parseInt(poi.openingHoursTo.split(':')[0]),
        'minutes': parseInt(poi.openingHoursTo.split(':')[1]),
        'seconds': 0,
      });

      p.openingTimes = [{
        date: momentOpenTime.format('YYYY-MM-DD'),
        openTime: poi.openingHoursFrom,
        closeTime: poi.openingHoursTo,
        open: momentOpenTime.format(),
        close: momentCloseTime.format(),
      }];
    }

    // TODO: Add videos once URLs are not encoded
    // if (poi.videos) {
    //   p.videos = poi.videos
    //     .filter((video) => video.provider === 'youtube')
    //     .map((v) => {
    //       return {
    //         platform: 'YOUTUBE',
    //         embed_id: v.embedId,
    //         full_url: v.url,
    //       };
    //     });
    // }

    return p;
  }
}
