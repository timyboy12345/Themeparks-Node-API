import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { ToverlandRide } from '../interfaces/toverland-ride.interface';
import * as moment from 'moment';
import { ToverlandFoodAndDrink } from '../interfaces/toverland-foodanddrink.interface';
import { ToverlandShow, ToverlandShowTime } from '../interfaces/toverland-show.interface';
import { ShowTime } from '../../../_interfaces/showtimes.interface';

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

  transferPoiToPoi(poi: ToverlandRide | ToverlandFoodAndDrink | ToverlandShow, locale: string): Poi {let area;
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
      id: `${poi.id}`,
      category: PoiCategory.UNDEFINED,
      title: poi.name,
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
        r.description = poi.description.de;
        break;
      case 'nl':
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

    if ('last_waiting_time' in poi && poi.last_waiting_time) {
      r.currentWaitTime = poi.last_waiting_time.waiting_time;
    }

    if ('times' in poi && poi.times) {
      r.showTimes = {
        currentDate: moment().format(),
        allShowTimes: poi.times.map(t => this.transferShowTimeToShowTime(t)),
        pastShowTimes: poi.times.map(t => this.transferShowTimeToShowTime(t)).filter(t => t.isPassed),
        futureShowTimes: poi.times.map(t => this.transferShowTimeToShowTime(t)).filter(t => !t.isPassed),
        todayShowTimes: poi.times.map(t => this.transferShowTimeToShowTime(t)),
      }
    }

    if ('minLength' in poi && poi.minLength) {
      switch (poi.minLength) {
        case "8":
          r.minSize = 110;
          break;
        case "9":
          r.minSize = 120;
          break;
        case "10":
          r.minSize = 132;
          r.maxSize = 195;
          break;
        case "11":
          r.minSize = 140;
          break;
        case "7":
        case "12":
        default:
          r.minSize = undefined;
          break;
      }
    }

    if ('supervision' in poi && poi.supervision) {
      switch (poi.supervision) {
        case "6":
          r.minSize = undefined;
          r.minSizeWithEscort = 120;
          break;
        case "30":
          r.minSize = undefined;
          r.minSizeWithEscort = 100;
          break;
        case "32":
          r.minSizeWithEscort = 120;
          r.minSize = 100;
          break;
        case "33":
          r.minSizeWithEscort = 110;
          r.minSize = 90;
          break;
        case "34":
          r.minSizeWithEscort = 120;
          r.minSize = 90;
          break;
        default:
          break;
      }
    }

    return r;
  }

  transferShowTimeToShowTime(showTime: ToverlandShowTime): ShowTime {
    return {
      from: moment(showTime.start).format(),
      fromTime: moment(showTime.start).format('HH:mm:ss'),
      isPassed: moment(showTime.start).isBefore()
    }
  }
}
