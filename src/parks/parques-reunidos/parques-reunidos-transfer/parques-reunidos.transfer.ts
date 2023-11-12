import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi, PoiStatus } from '../../../_interfaces/poi.interface';
import { AtraccionesResponseAtraccioneInterface } from '../interfaces/atracciones-response.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { RideCategory } from '../../../_interfaces/ride-category.interface';
import { ParqueAtraccionesShowsResponseInterface } from '../interfaces/parque-atracciones-shows-response.interface';
import * as moment from 'moment-timezone';
import { ShowTime } from '../../../_interfaces/showtimes.interface';

@Injectable()
export class ParquesReunidosTransfer extends TransferService {
  transferRideToPoi(ride: AtraccionesResponseAtraccioneInterface, locale?: string): Poi {
    let lang: string;

    if (ride.translatableName.en) {
      lang = 'en';
    } else if (ride.translatableName.es) {
      lang = 'es';
    } else if (ride.translatableName.de) {
      lang = 'de';
    }

    const r: Poi = {
      category: PoiCategory.ATTRACTION,
      id: ride.id.toString(),
      original: ride,
      title: ride.translatableName[lang],
    };

    if (ride.place && ride.place.point) {
      r.location = {
        lat: ride.place.point.latitude,
        lng: ride.place.point.longitude,
      };
    }

    if (ride.translatableSubTitle && ride.translatableSubTitle[lang]) {
      r.subTitle = ride.translatableSubTitle[lang];
    }

    if (ride.translatableDescription && ride.translatableDescription[lang]) {
      r.description = ride.translatableDescription[lang];
    }

    if (ride.photographs && ride.photographs.length > 0) {
      r.previewImage = `https://s3-eu-west-1.amazonaws.com/stayapp.cms/${ride.photographs[0]}/${ride.photographs[0]}_appthumb`;
      r.image_url = `https://s3-eu-west-1.amazonaws.com/stayapp.cms/${ride.photographs[0]}/${ride.photographs[0]}_appthumb`;
      r.images = [];

      ride.photographs.forEach((photo) => {
        r.images.push(`https://s3-eu-west-1.amazonaws.com/stayapp.cms/${photo}/${photo}`);
      });
    }

    switch (ride.category) {
      // Suaves (zacht)
      case 7878:
        r.rideCategory = RideCategory.KIDS;
        break;
      // Moderadas (gematigd)
      case 7879:
        r.rideCategory = RideCategory.FAMILY;
        break;
      // Intensas
      case 7880:
        r.rideCategory = RideCategory.THRILL;
        break;
      // Nickelodeon Land
      case 7881:
        break;
      // Casa del Terror
      case 36921:
        r.category = PoiCategory.HALLOWEEN_EVENT;
        break;
      // Movie park: Scare maze
      case 48231:
        r.category = PoiCategory.HALLOWEEN_WALKTROUGH;
        break;
      // No disponibles
      case 29844:
      default:
        r.rideCategory = RideCategory.UNDEFINED;
        break;
    }

    if (ride.textList) {
      const lengthData = ride.textList.find((tl) => tl.icon === 248919);

      if (lengthData) {
        const accompaniedRegex = /Acompañados: menores de ([0-9]+) cm/;
        const accompaniedMatches = lengthData.description[lang].match(accompaniedRegex);

        const minRegex = /Mínimo: ([0-9]+) cm/;
        const minMatches = lengthData.description[lang].match(minRegex);

        if (minMatches && minMatches.length > 0) {
          if (accompaniedMatches && accompaniedMatches.length > 0) {
            r.minSizeWithEscort = Number.parseFloat(minMatches[1]);
            r.minSizeWithoutEscort = Number.parseFloat(accompaniedMatches[1]);
          } else {
            r.minSizeWithoutEscort = Number.parseFloat(minMatches[1]);
          }
        }

        const maxRegex = /Máximo: ([0-9]+) cm/;
        const maxMatches = lengthData.description[lang].match(maxRegex);

        if (maxMatches && maxMatches.length > 0) {
          r.maxSize = Number.parseFloat(maxMatches[1]);
        }
      }
    }

    if (ride.waitingTime)  {
      if (ride.waitingTime >= 0) {
        r.state = PoiStatus.OPEN;
        r.currentWaitTime = ride.waitingTime;
      }

      if (ride.waitingTime === -3) {
        r.state = PoiStatus.CLOSED;
      }
    }

    return r;
  }

  public transferShowsResponseToPois(showResponse: ParqueAtraccionesShowsResponseInterface): Poi[] {
    const shows = this.transferShowsToPois(showResponse.data.grouping[0].list);

    const tz = moment().tz('Europe/Madrid');
    showResponse.data.grouping[0].calendar.forEach((calenderRow) => {
      const show = shows.find((show) => show.id === calenderRow.service.toString());

      if (show) {
        const dateTime = moment(`${calenderRow.eventDay} ${calenderRow.hour}`, 'YYYY-MM-DD HH:mm:ss').tz('Europe/Madrid');

        if (dateTime.format('YYYY-MM-DD') !== tz.format('YYYY-MM-DD')) {
          return;
        }

        const showTime: ShowTime = {
          id: calenderRow.id.toString(),
          isPassed: moment().tz('Europe/Madrid').isAfter(dateTime),
          fromTime: calenderRow.hour,
          toTime: calenderRow.endHour,
          duration: moment(`${calenderRow.eventDay} ${calenderRow.endHour}`, 'YYYY-MM-DD HH:mm:ss').diff(dateTime, 'minutes'),
          from: `${calenderRow.eventDay} ${calenderRow.endHour}`,
        };

        show.showTimes.todayShowTimes.push(showTime);
        show.showTimes.allShowTimes.push(showTime);

        showTime.isPassed
          ? show.showTimes.pastShowTimes.push(showTime)
          : show.showTimes.futureShowTimes.push(showTime);
      }
    });

    return shows;
  }

  transferShowToPoi(show: any, locale?: string): Poi {
    const r: Poi = {
      category: PoiCategory.SHOW,
      id: show.id.toString(),
      original: show,
      title: show.translatableName.es,
      showTimes: {
        currentDate: moment().tz('Europe/Madrid').format('YYYY-MM-DD'),
        futureShowTimes: [],
        allShowTimes: [],
        pastShowTimes: [],
        todayShowTimes: [],
      },
    };

    if (show.place && show.place.point) {
      r.location = {
        lat: show.place.point.latitude,
        lng: show.place.point.longitude,
      };
    }

    if (show.photographs && show.photographs.length > 0) {
      r.previewImage = `https://s3-eu-west-1.amazonaws.com/stayapp.cms/${show.photographs[0]}/${show.photographs[0]}_appthumb`;
      r.images = [];

      show.photographs.forEach((photo) => {
        r.images.push(`https://s3-eu-west-1.amazonaws.com/stayapp.cms/${photo}/${photo}`);
      });
    }

    return r;
  }

  transferShowsToPois(shows: any, locale?: string): Poi[] {
    const uniqueShows = [];

    shows.forEach((show) => {
      if (!uniqueShows.find((s) => s.repetition === show.repetition)) {
        uniqueShows.push(show);
      }
    })

    return uniqueShows.map(show => this.transferRepetitionShowToPoi(show, locale));
  }

  transferRepetitionShowToPoi(show, locale) {
    let lang;

    if (show.translatableName.es) {
      lang = 'es';
    } else if (show.translatableName.de) {
      lang = 'de';
    }

    const c: Poi = {
      category: PoiCategory.SHOW, id: show.repetition, original: show, title: show.translatableName[lang]
    }

    return c;
  }

  transferRestaurantsToPois(restaurants: any, locale?: string): Poi[] {
    return restaurants.map((r) => {
      const poi = this.transferRideToPoi(r);
      poi.category = PoiCategory.RESTAURANT;
      return poi;
    });
  }

  transferShopToPoi(shop: any, locale?: string): Poi {
    const poi =  this.transferRideToPoi(shop, locale)
    poi.category = PoiCategory.SHOP;
    delete poi.rideCategory;
    return poi;
  }
}
