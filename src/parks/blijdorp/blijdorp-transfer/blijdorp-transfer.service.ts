import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { BlijdorpShow } from '../interfaces/blijdorp-show.interface';
import * as moment from 'moment-timezone';
import { ShowTime, ShowTimes } from '../../../_interfaces/showtimes.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';

@Injectable()
export class BlijdorpTransferService extends TransferService {
  transferShowToPoi(poi: BlijdorpShow): Poi {
    const start = moment(poi.start_time, 'HH:mm');
    const end = moment(poi.end_time, 'HH:mm');
    const duration = moment.duration(end.diff(start));

    const tz = moment().tz('Europe/Amsterdam');

    const showTime: ShowTime = {
      duration: duration.asMinutes(),
      from: poi.start_time === 'ALLDAY' ? tz.format('YYYY-MM-DD HH:mm:ss') : start.format('YYYY-MM-DD HH:mm:ss'),
      to: poi.start_time === 'ALLDAY' ? tz.add('1 hour').format('YYYY-MM-DD HH:mm:ss') : end.format('YYYY-MM-DD HH:mm:ss'),
      fromTime: poi.start_time === 'ALLDAY' ? null : poi.start_time,
      toTime: poi.start_time === 'ALLDAY' ? null : poi.end_time,
      isPassed: poi.start_time === 'ALLDAY' ? null : start.isBefore(tz),
    };

    const showTimeArray = [showTime];

    const showTimes: ShowTimes = {
      pastShowTimes: showTimeArray.filter(st => st.isPassed),
      todayShowTimes: showTimeArray,
      allShowTimes: showTimeArray,
      currentDate: moment().tz('Europe/Amsterdam').format(),
      futureShowTimes: showTimeArray.filter(st => !st.isPassed),
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
}
