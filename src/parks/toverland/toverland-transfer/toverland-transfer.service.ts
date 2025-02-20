import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi, PoiStatus } from '../../../_interfaces/poi.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { ToverlandRide } from '../interfaces/toverland-ride.interface';
import * as moment from 'moment-timezone';
import { ToverlandFoodAndDrink } from '../interfaces/toverland-foodanddrink.interface';
import { ToverlandShow, ToverlandShowTime } from '../interfaces/toverland-show.interface';
import { ToverlandHalloweenEvent } from '../interfaces/toverland-halloween-event.interface';
import { ShowTime } from '../../../_interfaces/showtimes.interface';
import { EventCategory } from '../../../_interfaces/event.category';
import * as sluggo from 'sluggo';

@Injectable()
export class ToverlandTransferService extends TransferService {
  transferRideToPoi(ride: ToverlandRide, locale: string): Poi {
    const r = this.transferPoiToPoi(ride, locale);
    r.category = PoiCategory.ATTRACTION;
    return r;
  }

  transferRestaurantToPoi(restaurant: ToverlandFoodAndDrink, locale: string): Poi {
    const r = this.transferPoiToPoi(restaurant, locale);
    r.category = PoiCategory.RESTAURANT;
    return r;
  }

  transferShowToPoi(show: ToverlandShow, locale: string): Poi {
    const s = this.transferPoiToPoi(show, locale);
    s.category = PoiCategory.RESTAURANT;
    return s;
  }

  transferHalloweenEventToPoi(halloweenEvent: ToverlandHalloweenEvent, locale: string): Poi {
    const s = this.transferPoiToPoi(halloweenEvent, locale);
    s.eventCategory = EventCategory.HALLOWEEN;

    switch (halloweenEvent.type_id) {
      case 1:
        s.category = PoiCategory.HALLOWEEN_SCAREZONE;
        break;
      case 3:
        s.category = PoiCategory.FOODTRUCK;
        break;
      case 5:
        s.category = PoiCategory.HALLOWEEN_MAZE;
        break;
      case 6:
        s.category = PoiCategory.HALLOWEEN_HOUSE;
        break;
      default:
        break;
    }

    return s;
  }

  transferPoiToPoi(poi: ToverlandRide | ToverlandFoodAndDrink | ToverlandShow | ToverlandHalloweenEvent, locale: string): Poi {let area;
    switch (poi.area_id) {
      case "2":
        area = "Wunderwald"
        break;
      case "3":
        area = "Ithaka"
        break;
      case "4":
        area = "Magische Vallei"
        break;
      case "5":
        area = "Port Laguna"
        break;
      case "6":
        area = "Avalon"
        break;
      case "1":
      default:
        area = undefined;
    }

    const r: Poi = {
      id: poi.name ? sluggo(poi.name) : `${poi.id}`,
      category: PoiCategory.UNDEFINED,
      title: poi.name,
      subTitle: poi.short_description.en,
      localizedSubtitles: poi.short_description,
      image_url: poi.thumbnail,
      description: poi.description.en,
      localizedDescriptions: poi.description,
      area: area,
      original: poi,
      location: {
        lat: parseFloat(poi.latitude),
        lng: parseFloat(poi.longitude),
      },
    };

    switch (locale) {
      case 'de':
        r.subTitle = poi.short_description.de;
        r.description = poi.description.de;
        break;
      case 'nl':
        r.subTitle = poi.short_description.nl;
        r.description = poi.description.nl;
        break;
      default:
      case 'en':
        break;
    }

    if ('opening_times' in poi && poi.opening_times) {
      r.openingTimes = poi.opening_times.map((ot) => {
        return {
          date: moment(ot.start).format(),
          openTime: moment(ot.start).format('HH:mm:ss'),
          closeTime: moment(ot.end).format('HH:mm:ss'),
          open: moment(ot.start).format(),
          close: moment(ot.end).format(),
          isPassed: !moment(ot.end).isBefore()
        }
      })
    }

    // TODO: Implement other status codes
    if ('last_status' in poi && poi.last_status) {
      switch (poi.last_status.status_id) {
        case 2:
          r.state = PoiStatus.CLOSED;
          break;
        // 1 = open (big ride), 7 = alternating schedule, 8 = open (playgrounds)
        case 1:
        case 7:
        case 8:
          r.state = PoiStatus.OPEN;
          break;
      }
    }

    if ('last_waiting_time' in poi && poi.last_waiting_time) {
      if (!r.state || r.state === PoiStatus.OPEN)
        r.currentWaitTime = poi.last_waiting_time.waiting_time;
      else
        r.currentWaitTime = null;
    }

    if ('times' in poi && poi.times) {
      r.showTimes = {
        currentDateTimezone: moment().tz('Europe/Amsterdam').format(),
        timezone: 'Europe/Amsterdam',
        currentDate: moment().format(),
        showTimes: poi.times.map(t => this.transferShowTimeToShowTime(t))
      }
    }

    if ('minLength' in poi && poi.minLength) {
      switch (poi.minLength) {
        case "8":
          r.minSizeWithoutEscort = 110;
          break;
        case "9":
          r.minSizeWithoutEscort = 120;
          break;
        case "10":
          r.minSizeWithoutEscort = 132;
          r.maxSize = 195;
          break;
        case "11":
          r.minSizeWithoutEscort = 140;
          break;
        case "7":
        case "12":
        default:
          r.minSizeWithEscort = undefined;
          break;
      }
    }

    if ('supervision' in poi && poi.supervision) {
      switch (poi.supervision) {
        case "6":
          r.minSizeWithEscort = undefined;
          r.minSizeWithoutEscort = 120;
          break;
        case "30":
          r.minSizeWithEscort = undefined;
          r.minSizeWithoutEscort = 100;
          break;
        case "32":
          r.minSizeWithEscort = 100;
          r.minSizeWithoutEscort = 120;
          break;
        case "33":
          r.minSizeWithEscort = 90;
          r.minSizeWithoutEscort = 110;
          break;
        case "34":
          r.minSizeWithEscort = 90;
          r.minSizeWithoutEscort = 120;
          break;
        default:
          break;
      }
    }

    return r;
  }

  transferShowTimeToShowTime(showTime: ToverlandShowTime): ShowTime {
    return {
      localFromDate: moment(showTime.start).format('YYYY-MM-DD'),
      localFromTime: moment(showTime.start).format('HH:mm'),
      timezoneFrom: moment(showTime.start).tz('Europe/Amsterdam').format(),
      isPassed: moment(showTime.start).isBefore(),
    }
  }
}
