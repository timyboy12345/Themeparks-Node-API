import { Injectable } from '@nestjs/common';
import { HolidayParkAttraction } from '../interfaces/holiday-park-attraction.interface';
import { Poi } from '../../../_interfaces/poi.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { HolidayParkAttractionsResponseInterface } from '../interfaces/holiday-park-attractions-response.interface';
import { RideCategory } from '../../../_interfaces/ride-category.interface';
import { HolidayParkPageResponseInterface } from '../interfaces/holiday-park-page-response.interface';
import { TransferService } from '../../../_services/transfer/transfer.service';
import * as moment from 'moment-timezone';
import { ShowTime } from '../../../_interfaces/showtimes.interface';

@Injectable()
export class HolidayParkTransferService extends TransferService {
  public transferPoiToPoi(holidayParkAttraction: HolidayParkAttraction): Poi {
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

  public transferRidesToPois(responseInterface: HolidayParkAttractionsResponseInterface, locale?: string): Poi[] {
    const pois: HolidayParkAttraction[] = [];

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

  public transferShopsToPois(responseInterface: HolidayParkPageResponseInterface, locale?: string): Poi[] {
    const shops: HolidayParkAttraction[] = [];

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

  public transferRestaurantsToPois(responseInterface: HolidayParkPageResponseInterface, locale?: string): Poi[] {
    const restaurants: HolidayParkAttraction[] = [];

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

  transferShowsToPois(responseInterface: HolidayParkPageResponseInterface, locale?: string): Poi[] {
    const shows: HolidayParkAttraction[] = [];

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

  transferShowToPoi(holidayParkShow: HolidayParkAttraction): Poi {
    const show = this.transferPoiToPoi(holidayParkShow);

    const today = moment().tz('Europe/Berlin').format('YYYY-MM-DD');
    const timeBlockData: [] = holidayParkShow.timeblocks[today];
    const shows: ShowTime[] = [];

    if (timeBlockData) {
      timeBlockData.forEach((timeBlock: any) => {
        const s: ShowTime = {
          from: moment().tz('Europe/Berlin').set({
            hour: timeBlock.start.split(':')[0],
            minute: timeBlock.start.split(':')[1],
            second: 0,
          }).format(),
          id: timeBlock.id,
          fromTime: timeBlock.start,
          toTime: timeBlock.end,
        };

        shows.push(s);
      });
    }

    show.showTimes = {
      currentDate: today,
      allShowTimes: shows,
      todayShowTimes: shows,
      futureShowTimes: shows.filter((s) => !s.isPassed),
      pastShowTimes: shows.filter((s) => s.isPassed),
    };

    return show;
  }

  // public HolidayParkShowsResponseToPois(holidayParkAttractionsResponse: HolidayParkPageResponseInterface): Poi[] {
  //   const pois: HolidayParkAttraction[] = [];
  //
  //   for (let key in holidayParkAttractionsResponse.en.) {
  //     pois.push(holidayParkAttractionsResponse.en.food[key]);
  //   }
  //
  //   return pois.map(holidayParkAttraction => this.HolidayParkAttractionToPoi(holidayParkAttraction));
  // }
}
