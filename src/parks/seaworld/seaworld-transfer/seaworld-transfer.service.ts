import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { SeaworldBaseItem } from '../interfaces/seaworld-base-item.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { ShowTime } from '../../../_interfaces/showtimes.interface';
import * as moment from 'moment-timezone';

@Injectable()
export class SeaworldTransferService extends TransferService {
  transferPoiToPoi(poi: SeaworldBaseItem, locale?: string): Poi {
    const p: Poi = {
      category: PoiCategory.UNDEFINED,
      original_category: poi.Type,
      id: `${poi.Id}`,
      original: poi,
      title: poi.Name,
      subTitle: poi.ShortDescription,
      description: poi.LongDescription,
      image_url: poi.ListingImageUrl,
    }

    if (poi.ImageUrl) {
      p.images = [poi.ImageUrl]
    }

    if (!p.image_url && poi.ImageUrl) {
      p.image_url = poi.ImageUrl;
    }

    switch (poi.Type) {
      case 'Rides':
      case 'Attractions':
        p.category = PoiCategory.ATTRACTION;
        break;
      case 'Dining':
        p.category = PoiCategory.RESTAURANT;
        break;
      case 'Services':
        p.category = PoiCategory.SERVICE;
        break;
      case 'Animal Experiences':
        p.category = PoiCategory.ANIMAL;
        break;
      case 'Restrooms':
        p.category = PoiCategory.TOILETS;
        break;
      case 'Shops':
        p.category = PoiCategory.SHOP;
        break;
      case 'Shows':
        p.category = PoiCategory.SHOW;
        break;
      case 'Venues':
        p.category = PoiCategory.EVENT_LOCATION;
        break;
      default:
        p.category = PoiCategory.UNDEFINED;
        break;
    }

    if (poi.Coordinate) {
      p.location = {
        lat: poi.Coordinate.Latitude,
        lng: poi.Coordinate.Longitude
      }
    }

    if (poi.ShowTimes) {
      //   "StartDateTime": "2024-06-10T18:30:00Z",
      //   "EndDateTime": "2024-06-10T19:00:00Z",
      //   "StartTime": "2024-06-10T13:30:00",
      //   "EndTime": "2024-06-10T14:00:00"
      const showTimes = poi.ShowTimes.map((s): ShowTime => {
        const start = moment(s.StartTime).tz('America/Los_Angeles', false);

        return {
          from: start.format(),
          fromTime: moment(s.StartTime).format('HH:mm:ss'),
          to: moment(s.StartTime).tz('America/Los_Angeles', false).format(),
          isPassed: moment().tz('America/Los_Angeles', false).isAfter(start),
        }
      })

      const d = new Date();
      p.showTimes = {
        currentDate: moment().tz('America/Los_Angeles').format(),
        allShowTimes: showTimes,
        futureShowTimes: showTimes.filter(s => moment(s.from).isSame(d, 'day') && !s.isPassed),
        pastShowTimes: showTimes.filter(s => moment(s.from).isSame(d, 'day') && s.isPassed),
        todayShowTimes: showTimes.filter(s => moment(s.from).isSame(d, 'day')),
        otherDateShowTimes: showTimes.filter(s => !moment(s.from).isSame(d, 'day')),
      };
    }

    if (poi.MinimumHeight > 0) {
      p.minSizeWithEscort = Math.round(poi.MinimumHeight * 2.54)
    }

    return p
  }
}
