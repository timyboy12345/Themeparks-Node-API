import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { PortaventuraBaseRideInterface } from '../interfaces/portaventura-base-ride.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import * as moment from 'moment-timezone';
import { RideCategory } from '../../../_interfaces/ride-category.interface';
import { ShowTime } from '../../../_interfaces/showtimes.interface';
import { PoiOpeningTime } from '../../../_interfaces/poi-openingtimes.interface';

@Injectable()
export class PortaVenturaTransferService extends TransferService {
  transferRideToPoi(poi: any, locale?: string): Poi {
    const ride = this.transferPoiToPoi(poi);
    ride.category = PoiCategory.ATTRACTION;
    return ride;
  }

  transferShowToPoi(poi: any, locale?: string): Poi {
    const show = this.transferPoiToPoi(poi);
    show.category = PoiCategory.SHOW;
    show.showTimes = {
      currentDate: moment().tz('Europe/Madrid').format('YYYY-MM-DD'),
      currentDateTimezone: moment().tz('Europe/Madrid').format(),
      timezone: 'Europe/Madrid',
      showTimes: show.openingTimes.map((ot) => {
        const start = moment(ot.open);
        const st: ShowTime = {
          localFromDate: start.format('YYYY-MM-DD'),
          localFromTime: start.format('HH:mm'),
          timezoneFrom: start.format(),
        };

        if (ot.close) {
          const end = moment(ot.close);
          st.localToDate = end.format('YYYY-MM-DD');
          st.localToTime = end.format('HH:mm');
          st.duration = start.diff(end, 'minutes');
        }

        return st;
      }),
    };
    show.openingTimes = undefined;

    return show;
  }

  transferRestaurantToPoi(poi: any, locale?: string): Poi {
    const restaurant = this.transferPoiToPoi(poi);
    restaurant.category = PoiCategory.RESTAURANT;
    return restaurant;
  }

  transferShopToPoi(poi: any, locale?: string): Poi {
    const shop = this.transferPoiToPoi(poi);
    shop.category = PoiCategory.SHOP;
    return shop;
  }

  transferPoiToPoi(data: PortaventuraBaseRideInterface, locale?: string): Poi {
    const poi: Poi = {
      category: PoiCategory.UNDEFINED,
      id: data.id,
      original: data,
      title: data.name,
      subTitle: data.tagLine,
      description: data.description,
      images: data.images,
      image_url: data.logo,
      previewImage: data.thumbnail,
      maxSize: data.maximumHeight > 0 ? data.maximumHeight * 100 : null,
      minSizeWithoutEscort: data.minimumHeight > 0 ? data.minimumHeight * 100 : null,
      minSizeWithEscort: data.adultMinimumHeight > 0 ? data.adultMinimumHeight * 100 : null,
      location: {
        lat: data.latitude,
        lng: data.longitude,
      },
      area: data.area,
      singleRider: data.tags.filter((t) => t.name === 'Single rider').length > 0,
      photoPoint: data.tags.filter((t) => t.name === 'Photo Ride').length > 0,
    };

    if (data.videoUrl) {
      poi.videos = [{
        platform: 'YOUTUBE',
        full_url: data.videoUrl,
      }];
    }

    if (data.schedule) {
      poi.openingTimes = [];

      data.schedule.forEach((s) => {
        const open = moment(s.open, 'HH:mm').tz('Europe/Madrid');
        const close = moment(s.close, 'HH:mm').tz('Europe/Madrid');

        const ot: PoiOpeningTime = {
          open: open.format(),
          openTime: open.format('HH:mm'),
          date: open.format('YYYY-MM-DD'),
        };

        if (s.close) {
          ot.close = close.format();
          ot.closeTime = close.format('HH:mm');
        }

        poi.openingTimes.push(ot);
      });
    }

    if (data.queue) {
      poi.currentWaitTime = data.queue;
    }

    if (data.express) {
      poi.fastpass = data.express;
    }

    if (data.tags.some((t) => t.name === 'Children' || t.name === 'Gentle')) {
      poi.rideCategory = RideCategory.KIDS;
    } else if (data.tags.some((t) => t.name === 'Thrill')) {
      poi.rideCategory = RideCategory.THRILL;
    } else if (data.tags.some((t) => t.name === 'Moderate')) {
      poi.rideCategory = RideCategory.FAMILY;
    }

    return poi;
  }
}
