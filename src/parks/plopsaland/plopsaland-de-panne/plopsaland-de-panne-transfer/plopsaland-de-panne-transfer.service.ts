import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../../_services/transfer/transfer.service';
import { Poi } from '../../../../_interfaces/poi.interface';
import { PlopsalandDePanneDetailsResponseItemInterface } from '../interfaces/plopsaland-de-panne-details-response.interface';
import { PoiCategory } from '../../../../_interfaces/poi-categories.enum';
import { ShowTime } from '../../../../_interfaces/showtimes.interface';
import * as moment from 'moment';

@Injectable()
export class PlopsalandDePanneTransferService extends TransferService {
  transferPoiToPoi(poi: PlopsalandDePanneDetailsResponseItemInterface): Poi {
    let c: PoiCategory;

    switch (poi.type) {
      case 'attraction':
        c = PoiCategory.ATTRACTION;
        break;
      case 'atm':
        c = PoiCategory.ATM;
        break;
      case 'event':
        c = PoiCategory.EVENT;
        break;
      case 'food':
        c = PoiCategory.RESTAURANT;
        break;
      case 'meet_greet':
        c = PoiCategory.MEET_AND_GREET;
        break;
      case 'shop':
        c = PoiCategory.SHOP;
        break;
      case 'proximus':
      default:
        c = PoiCategory.UNDEFINED;
        break;
    }

    const p: Poi = {
      id: poi.id,
      title: poi.name,
      category: c,
      original: poi,
      description: poi.description,
      images: poi.images,
    };

    if (poi.minHeight) {
      p.minSizeWithoutEscort = parseInt(poi.minHeight);
    }

    if (poi.minHeightSupervised) {
      p.minSizeWithEscort = parseInt(poi.minHeightSupervised);
    }

    if (poi.maxHeight) {
      p.maxSize = parseInt(poi.maxHeight);
    }

    if (poi.images && poi.images.length > 0) {
      p.image_url = poi.images[0];
    }

    if (poi.timeblocks) {
      p.showTimes = {
        currentDate: moment().format(),
        allShowTimes: [],
        pastShowTimes: [],
        futureShowTimes: [],
        todayShowTimes: [],
      };

      const dates = Object.keys(poi.timeblocks).map((key) => {
        return {
          date: key,
          shows: poi.timeblocks[key],
        };
      });
      const showTimes: ShowTime[] = [];

      dates.forEach(d => {
        d.shows.forEach(show => {
          const start = moment(`${d.date}T${show.start}:00Z`);
          const end = show.end && show.end != "" ? moment(`${d.date}T${show.end}:00Z`) : moment(d.date);

          showTimes.push({
            from: start.format(),
            fromTime: show.start,
            to: show.end ? end.format() : null,
            toTime: show.end ? show.end : null,
            id: show.id,
            isPassed: moment(start).isBefore()
          });
        });
      });

      const d = new Date();
      p.showTimes.allShowTimes = showTimes;
      p.showTimes.futureShowTimes = showTimes.filter(s => moment(s.from).isSame(d, 'day') && !s.isPassed);
      p.showTimes.pastShowTimes = showTimes.filter(s => moment(s.from).isSame(d, 'day') && s.isPassed);
      p.showTimes.todayShowTimes = showTimes.filter(s => moment(s.from).isSame(d, 'day'));
      p.showTimes.otherDateShowTimes = showTimes.filter(s => !moment(s.from).isSame(d, 'day'));
    }

    return p;
  }
}
