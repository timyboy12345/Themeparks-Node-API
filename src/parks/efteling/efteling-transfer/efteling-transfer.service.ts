import { Injectable } from '@nestjs/common';
import { Poi, PoiStatus } from '../../../_interfaces/poi.interface';
import { EftelingPoi } from '../interfaces/efteling-poi.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { RideCategory } from '../../../_interfaces/ride-category.interface';
import { TransferService } from '../../../_services/transfer/transfer.service';
import * as moment from 'moment-timezone';
import { ShowTime, ShowTimes } from '../../../_interfaces/showtimes.interface';
import {
  EftelingOpeningTimesAttraction,
  EftelingOpeningTimesAttractionShowTimes,
  EftelingOpeningTimesResponse,
} from '../interfaces/efteling-openingstimes-response.interface';
import { ThemeParkOpeningTimes } from '../../../_interfaces/park-openingtimes.interface';

@Injectable()
export class EftelingTransferService extends TransferService {
  transferPoiToPoi(eftelingPoi: EftelingPoi): Poi {
    let c: PoiCategory = PoiCategory.UNDEFINED;
    let s: PoiStatus = PoiStatus.UNDEFINED;

    switch (eftelingPoi.fields.category) {
      case 'attraction':
        c = PoiCategory.ATTRACTION;
        break;
      case 'game':
        c = PoiCategory.GAME;
        break;
      case 'facilities-generic':
        c = PoiCategory.SERVICE;
        break;
      case 'facilities-toilets':
        c = PoiCategory.TOILETS;
        break;
      case 'merchandise':
        c = PoiCategory.SHOP;
        break;
      case 'photo-shop':
        c = PoiCategory.PHOTO_SHOP;
        break;
      case 'restaurant':
        c = PoiCategory.RESTAURANT;
        break;
      case 'show':
        c = PoiCategory.SHOW;
        break;
      case 'fairytale':
        c = PoiCategory.UNDEFINED;
        break;
      case 'fotopunt':
        c = PoiCategory.PHOTO_SHOP;
        break;
      default:
        break;
    }

    const lat = parseFloat(eftelingPoi.fields.latlon.split(',')[0]);
    const lng = parseFloat(eftelingPoi.fields.latlon.split(',')[1]);

    // Get the URL where the images are located
    const imgUrl = 'https://efteling.com';

    const images = [];
    for (let i = 1; i <= 5; i++) {
      const img = eftelingPoi.fields['image_detailview' + i];
      if (img) {
        images.push(imgUrl + img);
      }
    }

    // Select a high quality image from images, otherwise get fallback low quality image
    const image = images.length > 0 ? images[0] : `${imgUrl}${eftelingPoi.fields.image}`;

    let id = eftelingPoi.id
      .replace('-nl', '')
      .replace('-de', '')
      .replace('-en', '')
      .replace('-fr', '');

    const poi: Poi = {
      id: id,
      category: c,
      title: eftelingPoi.fields.name,
      subTitle: eftelingPoi.fields.subtitle,
      description: eftelingPoi.fields.detail_text,
      original: eftelingPoi,
      image_url: image,
      area: eftelingPoi.fields.empire,
      images: images,
      state: s,
    };

    if (lat !== 0 && lng !== 0) {
      poi.location = {
        lat: lat,
        lng: lng,
      };
    }

    if (eftelingPoi.fields.menu_card_pdf) {
      poi.menuUrl = eftelingPoi.fields.menu_card_pdf;
    }

    if (c === PoiCategory.ATTRACTION) {
      if (eftelingPoi.fields.targetgroups) {
        if (eftelingPoi.fields.targetgroups.includes('whole-family')) {
          poi.rideCategory = RideCategory.FAMILY;
        } else if (eftelingPoi.fields.targetgroups.includes('youngest-ones')) {
          poi.rideCategory = RideCategory.KIDS;
        } else if (eftelingPoi.fields.targetgroups.includes('thrillseekers')) {
          poi.rideCategory = RideCategory.THRILL;
        } else {
          poi.rideCategory = RideCategory.UNDEFINED;
        }
      }

      if (eftelingPoi.fields.properties && eftelingPoi.fields.properties.length > 0) {
        eftelingPoi.fields.properties.forEach(property => {
          if (property.includes('minimum')) {
            poi.minSizeWithEscort = null;
            poi.minSizeWithoutEscort = parseInt(property.split('minimum')[1]);
          }

          if (property.includes('childrentwelveyears2')) {
            poi.maxAge = 12;
          }

          if (property.includes('undersupervision')) {
            // If a dash is included, there is a minimum length, otherwise supervision is needed from 0-x
            if (property.includes('-')) {
              poi.minSizeWithEscort = parseInt(property.split('undersupervision')[0].split('-')[0]);
              poi.minSizeWithoutEscort = parseInt(property.split('undersupervision')[0].split('-')[1]);
            } else {
              poi.minSizeWithEscort = 0;
              poi.minSizeWithoutEscort = parseInt(property.split('undersupervision')[0]);
            }
          }
        });
      }
    }

    return poi;
  }

  transferShowTimesToShowTimes(showTimes: EftelingOpeningTimesAttraction): ShowTimes {
    const shows = showTimes.PastShowTimes.concat(showTimes.ShowTimes);

    return {
      showTimes: shows.map(this.transferShowTimeToShowTime),
      currentDate: moment().format(),
      currentDateTimezone: moment().tz('Europe/Amsterdam').format(),
      timezone: 'Europe/Amsterdam',
    };
  }

  transferShowTimeToShowTime(showTime: EftelingOpeningTimesAttractionShowTimes): ShowTime {
    const start = moment(showTime.StartDateTime).tz('Europe/Amsterdam');
    const end = moment(showTime.EndDateTime).tz('Europe/Amsterdam');
    const currently = moment().tz('Europe/Amsterdam');

    return {
      localFromDate: start.format('YYYY-MM-DD'),
      localFromTime: start.format('HH:mm'),
      duration: end.diff(start, 'minutes'),
      isPassed: currently.isAfter(start),
      localToDate: end.format('YYYY-MM-DD'),
      localToTime: end.format('HH:mm'),
      edition: showTime.Edition,
      timezoneFrom: start.format(),
      timezoneTo: end.format(),
    };
  }

  transferOpeningTimesToOpeningTimes(openingTimes: EftelingOpeningTimesResponse): ThemeParkOpeningTimes[] {
    return openingTimes.OpeningHours.map((date) => {
      const day = moment.parseZone(date.Date);

      return {
        date: day.format(),
        openingTimes: date.OpeningHours.map(ot => {
          return {
            open: ot.Open,
            openTime: ot.Open,
            close: ot.Close,
            closeTime: ot.Close,
          };
        }),
      };
    });
  }
}
