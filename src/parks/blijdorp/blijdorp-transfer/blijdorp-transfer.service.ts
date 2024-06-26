import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { BlijdorpShow } from '../interfaces/blijdorp-show.interface';
import * as moment from 'moment-timezone';
import { ShowTime, ShowTimes } from '../../../_interfaces/showtimes.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { BlijdorpAnimalInterface } from '../interfaces/blijdorp-animals-response.interface';

@Injectable()
export class BlijdorpTransferService extends TransferService {
  transferShowToPoi(poi: BlijdorpShow): Poi {
    const currentDate = moment().tz('Europe/Amsterdam');

    let show: ShowTime;

    if (poi.all_day === 0) {
      const start = moment(poi.start_time, 'HH:mm').tz('Europe/Amsterdam');
      const end = moment(poi.end_time, 'HH:mm').tz('Europe/Amsterdam');
      const duration = moment.duration(end.diff(start));

      show = {
        localFromDate: currentDate.format('YYYY-MM-DD'),
        localFromTime: poi.start_time,
        localToDate: currentDate.format('YYYY-MM-DD'),
        localToTime: poi.end_time,
        isPassed: currentDate.isAfter(start),
        timezoneFrom: start.format(),
        timezoneTo: end.format(),
        duration: duration.asMinutes(),
      };
    } else {
      const start = moment('12:00', 'HH:mm').tz('Europe/Amsterdam');

      show = {
        localFromTime: '12:00',
        localToTime: '16:00',
        duration: 240,
        timezoneFrom: start.format(),
        timezoneTo: start.add(4, 'hours').format(),
        localFromDate: currentDate.format('YYYY-MM-DD'),
        localToDate: currentDate.format('YYYY-MM-DD'),
        // TODO: This does not seem to work properly
        isPassed: currentDate.isAfter(start),
      };
    }

    const showTimes: ShowTimes = {
      timezone: 'Europe/Amsterdam',
      showTimes: [show],
      currentDate: currentDate.format('YYYY-MM-DD'),
      currentDateTimezone: currentDate.format(),
    };

    return {
      id: poi.id,
      title: poi.label,
      description: poi.body,
      showTimes: showTimes,
      category: PoiCategory.SHOW,
      original: poi,
    };
  }

  transferAnimalToPoi(animal: BlijdorpAnimalInterface, locale?: string): Poi {
    return {
      category: PoiCategory.ANIMAL,
      id: animal.title.replace(' ', '-').toLowerCase(),
      original: animal,
      title: animal.title,
      website_url: 'https://diergaardeblijdorp.nl' + animal.link,
      description: animal.description,
      images: [animal.image.url],
      image_url: animal.image.url,
    };
  }
}
