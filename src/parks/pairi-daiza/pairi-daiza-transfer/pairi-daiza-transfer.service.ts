import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import {
  PairiDaizaReponseAnimal,
  PairiDaizaResponseAnimation,
  PairiDaizaResponseShop,
} from '../interfaces/PairiDaizaResponse';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import * as moment from 'moment-timezone';
import * as sluggo from 'sluggo';

@Injectable()
export class PairiDaizaTransferService extends TransferService {
  transferPoiToPoi(poi: PairiDaizaResponseShop | PairiDaizaResponseAnimation | PairiDaizaReponseAnimal, locale?: string): Poi {
    const p: Poi = {
      category: PoiCategory.UNDEFINED,
      id: poi.Slug ?? poi.Id.toString(),
      original: poi,
      title: '',
      previewImage: poi.ListImageUrl,
      image_url: poi.DetailImageUrl,
    };

    if (poi.Lat && poi.Long) {
      p.location = {
        lat: poi.Lat,
        lng: poi.Long,
      };
    }

    let loc: 'TextNL' | 'TextFR' | 'TextEN';
    switch (locale) {
      case 'nl':
        loc = 'TextNL';
        break;
      case 'fr':
        loc = 'TextFR';
        break;
      default:
      case 'en':
        loc = 'TextEN';
        break;
    }

    p.title = this.titleCase(poi.Name[loc]);
    p.description = poi.Description[loc];
    p.id = sluggo(poi.Name[loc])

    p.facts = [];
    if ('AnimalClass' in poi) {
      p.facts.push({
        type: 'animal_class',
        id: 'animal_class',
        value: poi.AnimalClass[loc],
      });
    }

    if ('Alimentation' in poi) {
      p.facts.push({
        type: 'animal_diet',
        id: 'animal_diet',
        value: poi.Alimentation[loc],
      });
    }
    if ('Weight' in poi) {
      p.facts.push({
        type: 'animal_weight',
        id: 'animal_weight',
        value: poi.Weight[loc],
      });
    }

    if ('Longevity' in poi) {
      p.facts.push({
        type: 'animal_longevity',
        id: 'animal_longevity',
        value: poi.Longevity[loc],
      });
    }

    if ('Width' in poi) {
      p.facts.push({
        type: 'animal_width',
        id: 'animal_width',
        value: poi.Width[loc],
      });
    }

    if ('AnimalHeight' in poi) {
      p.facts.push({
        type: 'animal_height',
        id: 'animal_height',
        value: poi.AnimalHeight[loc],
      });
    }

    if ('OpeningHours' in poi) {
      p.openingTimes = [];
      p.showTimes = {
        currentDate: moment.tz('Europe/Berlin').format('YYYY-MM-DD'),
        currentDateTimezone: moment().tz('Europe/Berlin').format(),
        timezone: 'Europe/Berlin',
        showTimes: [],
      };

      if (!poi.ClosingDays.includes(moment().format('YYYY-MM-DDT00:00:00'))) {
        poi.OpeningHours.forEach((oh) => {
          const start = moment(oh.StartHour, 'HH:mm:ss');
          const end = moment(oh.EndHour, 'HH:mm:ss');

          if (poi.Name.TextNL.toLowerCase().includes('voedermoment')) {
            p.showTimes.showTimes.push({
              localFromDate: start.format('YYYY-MM-DD'),
              localFromTime: start.format('HH:mm:ss'),
              timezoneFrom: start.format(),
              isPassed: start.isBefore(moment().tz('Europe/Berlin'))
            });
          } else {
            p.openingTimes.push({
              date: moment().format('YYYY-MM-DD'),
              open: start.format(),
              openTime: start.format('HH:mm:ss'),
              close: oh.EndHour !== '00:00:00' ? end.format() : undefined,
              closeTime: oh.EndHour !== '00:00:00' ? end.format('HH:mm:ss') : undefined,
            });
          }
        });
      }
    }

    return p;
  }

  transferAnimalToPoi(animal: any, locale?: string): Poi {
    return {
      ...this.transferPoiToPoi(animal, locale),
      category: PoiCategory.ANIMAL,
    };
  }

  transferShowToPoi(animal: any, locale?: string): Poi {
    return {
      ...this.transferPoiToPoi(animal, locale),
      category: PoiCategory.SHOW,
    };
  }

  transferRestaurantToPoi(animal: any, locale?: string): Poi {
    return {
      ...this.transferPoiToPoi(animal, locale),
      category: PoiCategory.RESTAURANT,
    };
  }

  transferShopToPoi(animal: any, locale?: string): Poi {
    return {
      ...this.transferPoiToPoi(animal, locale),
      category: PoiCategory.SHOP,
    };
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
