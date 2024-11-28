import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { PoiOpeningTime } from '../../../_interfaces/poi-openingtimes.interface';
import { BeekseBergenOpeningHoursInterface } from '../interfaces/beekse-bergen-opening-hours.interface';
import * as sluggo from 'sluggo';
import * as moment from 'moment-timezone';

@Injectable()
export class BeekseBergenTransferService extends TransferService {
  transferAnimalToPoi(animal: BeekseBergenApiResponseItem, locale: string): Poi {
    return {
      ...this.transferPoiToPoi(animal, locale),
      category: PoiCategory.ANIMAL,
    };
  }

  transferRestaurantToPoi(restaurant: BeekseBergenApiResponseItem, locale: string): Poi {
    return {
      ...this.transferPoiToPoi(restaurant, locale),
      category: PoiCategory.RESTAURANT,
    };
  }

  transferRideToPoi(ride: any, locale: string): Poi {
    return {
      ...this.transferPoiToPoi(ride, locale),
      category: PoiCategory.ATTRACTION,
    };
  }

  transferShopToPoi(ride: any, locale: string): Poi {
    return {
      ...this.transferPoiToPoi(ride, locale),
      category: PoiCategory.SHOP,
    };
  }

  transferPoiToPoi(poi: any, locale?: string): Poi {
    const p: Poi = {
      category: PoiCategory.UNDEFINED,
      id: poi.id,
      original: poi,
      title: poi.attributes.name,
    };

    // TODO: Implement localizations
    let l = poi.attributes;

    switch (locale) {
      case 'nl':
        const loc0 = poi.attributes.localizations.data.find((l) => l.attributes.locale === 'nl');
        if (loc0) l = loc0.attributes;
        break;
      case 'fr':
        const loc1 = poi.attributes.localizations.data.find((l) => l.attributes.locale === 'fr');
        if (loc1) l = loc1.attributes;
        break;
      case 'de':
        const loc2 = poi.attributes.localizations.data.find((l) => l.attributes.locale === 'de');
        if (loc2) l = loc2.attributes;
        break;
      default:
      case 'en':
        const loc3 = poi.attributes.localizations.data.find((l) => l.attributes.locale === 'en');
        if (loc3) l = loc3.attributes;
        break;
    }

    p.id = sluggo(l.name);
    p.title = l.name;
    p.subTitle = l.subtitle;
    p.description = l.description + ' ' + l.bottomDescription;

    let media = null;

    if (poi.attributes.images && poi.attributes.images.data) {
      media = poi.attributes.images.data;
    } else if (poi.attributes.media && poi.attributes.media.data) {
      media = poi.attributes.media.data;
    } else if (poi.attributes.hero && poi.attributes.hero.data) {
      media = [poi.attributes.hero.data];
    }

    if (media) {
      p.images = media.map((i: any) => i.attributes.formats.large ? i.attributes.formats.large.url : i.attributes.url);

      if (media.length > 0) {
        p.image_url = media[0].attributes.formats.medium.url;
        p.previewImage = media[0].attributes.formats.thumbnail.url;
      }
    }

    if (poi.attributes.openingHours && poi.attributes.openingHours.data) {
      p.openingTimes = this.getOpeningTimes(poi.attributes.openingHours.data);
    }

    // TODO: Some restaurants support `openingHours`

    if (poi.attributes.area_item && poi.attributes.area_item.data) {
      p.area = poi.attributes.area_item.data.attributes.title;
    }

    p.facts = [];
    const keys = {
      'habitat': 'animal_habitat',
      'food': 'animal_diet',
      'age': 'animal_longevity',
      'weight': 'animal_weight',
      'offspring': 'animal_offspring',
      'gestation': 'animal_gestation',
      'iucn': 'animal_iucn',
      'bigFive': 'animal_bigFive',
    };

    for (const [key, value] of Object.entries(keys)) {
      if (l[key]) {
        p.facts.push({
          id: value,
          type: value,
          value: l[key],
        });
      }
    }

    return p;
  }

  private getOpeningTimes(openingHours: BeekseBergenOpeningHoursInterface[], days: number = 7): PoiOpeningTime[] {
    const times: PoiOpeningTime[] = [];

    const today = moment();
    for (let i = 0; i < days; i++) {
      const time = this.getOpeningTimesForDay(openingHours, today);

      if (time) {
        times.push(time);
      }

      today.add(1, 'days');
    }

    return times;
  }

  private getOpeningTimesForDay(openingHours: BeekseBergenOpeningHoursInterface[], date: moment.Moment): PoiOpeningTime | null {
    const found = openingHours
      .find((d) => {
        const startDate = moment(d.attributes.startDate, 'YYYY-MM-DD');
        const endDate = moment(d.attributes.endDate, 'YYYY-MM-DD');

        // TODO: Not all restaurants are open on all weekdays
        // return date.isBetween(startDate, endDate) && d.attributes.weekdays.data.find((wd) => wd.id === date.day());
        return date.isBetween(startDate, endDate);
      });

    if (found) {
      return {
        date: date.format('YYYY-MM-DD'),
        open: date.set({
          'hours': parseInt(found.attributes.startTime.split(':')[0]),
          'minutes': parseInt(found.attributes.startTime.split(':')[1]),
          'seconds': 0
        }).format(),
        openTime: found.attributes.startTime,
        close: date.set({
          'hours': parseInt(found.attributes.endTime.split(':')[0]),
          'minutes': parseInt(found.attributes.endTime.split(':')[1]),
          'seconds': 0
        }).format(),
        closeTime: found.attributes.endTime
      }
    }

    return;
  }
}
