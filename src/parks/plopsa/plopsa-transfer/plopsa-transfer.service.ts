import { Injectable } from '@nestjs/common';
import {
  PlopsaDetailsInterface,
  PlopsaDetailsResponseItemInterface,
} from '../interfaces/plopsa-details.interface';
import * as moment from 'moment-timezone';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { ShowTime } from '../../../_interfaces/showtimes.interface';
import { RideCategory } from '../../../_interfaces/ride-category.interface';
import { ThemeParkOpeningTimes } from '../../../_interfaces/park-openingtimes.interface';

@Injectable()
export class PlopsaTransferService extends TransferService {
  public transferPoiToPoi(holidayParkAttraction: PlopsaDetailsResponseItemInterface): Poi {
    let category: PoiCategory;

    switch (holidayParkAttraction.type) {
      case 'food':
        category = PoiCategory.RESTAURANT;
        break;
      case 'attraction':
        category = PoiCategory.ATTRACTION;
        break;
      case 'shop':
        category = PoiCategory.SHOP;
        break;
      case 'show':
        category = PoiCategory.SHOW;
        break;
      case 'event':
      case 'meet_greet':
        category = PoiCategory.EVENT;
        break;
      default:
        category = PoiCategory.UNDEFINED;
        break;
    }

    const poi: Poi = {
      id: holidayParkAttraction.uniqueID,
      title: holidayParkAttraction.name,
      description: holidayParkAttraction.description,
      category: category,
      original_category: holidayParkAttraction.type,
      original: holidayParkAttraction,
      minSizeWithoutEscort: parseInt(holidayParkAttraction.minHeight),
      maxSize: parseInt(holidayParkAttraction.maxHeight),
      minSizeWithEscort: parseInt(holidayParkAttraction.minHeightSupervised),
    };

    if (holidayParkAttraction.images && holidayParkAttraction.images.length > 0) {
      poi.image_url = holidayParkAttraction.images[0];
    }

    if (poi.category === PoiCategory.ATTRACTION) {
      if ('10' in holidayParkAttraction.attractionType) {
        poi.rideCategory = RideCategory.FAMILY;
      } else if ('12' in holidayParkAttraction.attractionType) {
        poi.rideCategory = RideCategory.KIDS;
      } else if ('11' in holidayParkAttraction.attractionType) {
        poi.rideCategory = RideCategory.THRILL;
      }
    }

    return poi;
  }

  public transferRidesToPois(responseInterface: PlopsaDetailsInterface, locale?: string): Poi[] {
    const pois: PlopsaDetailsResponseItemInterface[] = [];

    if (locale === 'de') {
      for (let key in responseInterface.de.attraction) {
        pois.push(responseInterface.de.attraction[key]);
      }
    } else if (locale === 'nl') {
      for (let key in responseInterface.nl.attraction) {
        pois.push(responseInterface.nl.attraction[key]);
      }
    } else if (locale === 'fr') {
      for (let key in responseInterface.fr.attraction) {
        pois.push(responseInterface.fr.attraction[key]);
      }
    } else {
      for (let key in responseInterface.en.attraction) {
        pois.push(responseInterface.en.attraction[key]);
      }
    }

    return pois.map(holidayParkAttraction => this.transferPoiToPoi(holidayParkAttraction));
  }

  public transferShopsToPois(responseInterface: PlopsaDetailsInterface, locale?: string): Poi[] {
    const shops: PlopsaDetailsResponseItemInterface[] = [];

    if (locale === 'de') {
      for (let key in responseInterface.de.shop) {
        shops.push(responseInterface.de.shop[key]);
      }
    } else if (locale === 'nl') {
      for (let key in responseInterface.nl.shop) {
        shops.push(responseInterface.nl.shop[key]);
      }
    } else if (locale === 'fr') {
      for (let key in responseInterface.fr.shop) {
        shops.push(responseInterface.fr.shop[key]);
      }
    } else {
      for (let key in responseInterface.en.shop) {
        shops.push(responseInterface.en.shop[key]);
      }
    }

    return shops.map(holidayParkAttraction => this.transferPoiToPoi(holidayParkAttraction));
  }

  public transferRestaurantsToPois(responseInterface: PlopsaDetailsInterface, locale?: string): Poi[] {
    const restaurants: PlopsaDetailsResponseItemInterface[] = [];

    if (locale === 'de') {
      for (let key in responseInterface.de.food) {
        restaurants.push(responseInterface.de.food[key]);
      }
    } else if (locale === 'nl') {
      for (let key in responseInterface.nl.food) {
        restaurants.push(responseInterface.nl.food[key]);
      }
    } else if (locale === 'fr') {
      for (let key in responseInterface.fr.food) {
        restaurants.push(responseInterface.fr.food[key]);
      }
    } else {
      for (let key in responseInterface.en.food) {
        restaurants.push(responseInterface.en.food[key]);
      }
    }

    return restaurants.map(holidayParkRestaurant => this.transferPoiToPoi(holidayParkRestaurant));
  }

  transferShowsToPois(responseInterface: PlopsaDetailsInterface, locale?: string): Poi[] {
    const shows: PlopsaDetailsResponseItemInterface[] = [];

    if (locale === 'de') {
      for (let key in responseInterface.de.show) {
        shows.push(responseInterface.de.show[key]);
      }
    } else if (locale === 'nl') {
      for (let key in responseInterface.nl.show) {
        shows.push(responseInterface.nl.show[key]);
      }
    } else if (locale === 'fr') {
      for (let key in responseInterface.fr.show) {
        shows.push(responseInterface.fr.show[key]);
      }
    } else {
      for (let key in responseInterface.en.show) {
        shows.push(responseInterface.en.show[key]);
      }
    }

    return shows.map(holidayParkShow => this.transferShowToPoi(holidayParkShow));
  }

  transferShowToPoi(holidayParkShow: PlopsaDetailsResponseItemInterface): Poi {
    const show = this.transferPoiToPoi(holidayParkShow);

    const today = moment().tz('Europe/Berlin').format('YYYY-MM-DD');
    const timeBlockData: any[] = holidayParkShow.timeblocks[today];
    const shows: ShowTime[] = [];

    if (timeBlockData) {
      timeBlockData.forEach((timeBlock: any) => {
        const start = moment().tz('Europe/Berlin').set({
          hour: timeBlock.start.split(':')[0],
          minute: timeBlock.start.split(':')[1],
          second: 0,
        });

        const s: ShowTime = {
          id: timeBlock.id,
          localFromDate: start.format('YYYY-MM-DD'),
          localFromTime: timeBlock.start,
          timezoneFrom: start.format(),
          isPassed: moment().tz('Europe/Berlin').isAfter(start),
        };

        if (timeBlock.end) {
          const end = moment().tz('Europe/Berlin').set({
            hour: timeBlock.start.split(':')[0],
            minute: timeBlock.start.split(':')[1],
            second: 0,
          });

          const duration = start.diff(end, 'minutes');
          s.localToTime = timeBlock.end;
          s.localToDate = end.format('YYYY-MM-DD');
          s.duration = duration;
          s.timezoneTo = end.format();
        }

        shows.push(s);
      });
    }

    show.showTimes = {
      currentDateTimezone: moment().tz('Europe/Berlin').format(),
      timezone: 'Europe/Berlin',
      currentDate: today,
      showTimes: shows,
    };

    return show;
  }

  transferOpeningTimesToOpeningTimes(openingTimes: any, locale?: string): ThemeParkOpeningTimes[] {
    const o: ThemeParkOpeningTimes[] = []

    const months = Object.entries(openingTimes.data)

    for (let [k, v] of months) {
      for (const [key, value] of Object.entries<any>(v)) {
        o.push({
          date: key,
          openingTimes: (value.slots ?? []).map((s) => {
            return {
              open: s.start_time,
              openTime: s.start_time.split('T')[1].slice(0, 8),
              close: s.end_time,
              closeTime: s.end_time.split('T')[1].slice(0, 8),
            }
          })
        })
      }
    }


    return o
  }
}
