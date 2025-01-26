import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi, PoiStatus } from '../../../_interfaces/poi.interface';
import { AtraccionesResponseAtraccioneInterface } from '../interfaces/atracciones-response.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { RideCategory } from '../../../_interfaces/ride-category.interface';
import { ParqueAtraccionesShowsResponseInterface } from '../interfaces/parque-atracciones-shows-response.interface';
import * as moment from 'moment-timezone';
import { ShowTime } from '../../../_interfaces/showtimes.interface';
import { ParqueReunidosNewShowItemInterface } from '../interfaces/parque-reunidos-new-show-interface';
import { EventCategory } from '../../../_interfaces/event.category';

@Injectable()
export class ParquesReunidosTransfer extends TransferService {
  transferRideToPoi(ride: AtraccionesResponseAtraccioneInterface, locale?: string): Poi {
    let lang: string;

    let fallBackLanguage = 'en';

    if (ride.translatableName.nl && ride.translatableName.nl !== 'Default') {
      lang = 'nl';
    } else if (ride.translatableName.en && ride.translatableName.en !== 'Default') {
      lang = 'en';
    } else if (ride.translatableName.es && ride.translatableName.es !== 'Default') {
      lang = 'es';
    } else if (ride.translatableName.de && ride.translatableName.de !== 'Default') {
      lang = 'de';
    } else if (ride.translatableName.it && ride.translatableName.it !== 'Default') {
      lang = 'it';
    } else if (ride.translatableName.fr && ride.translatableName.fr !== 'Default') {
      lang = 'fr';
    }

    const r: Poi = {
      category: PoiCategory.ATTRACTION,
      id: ride.id.toString(),
      original: ride,
      title: ride.translatableName[lang] ? ride.translatableName[lang] : ride.translatableName[fallBackLanguage],
    };

    if (ride.place && ride.place.point) {
      r.location = {
        lat: ride.place.point.latitude,
        lng: ride.place.point.longitude,
      };
    }

    if (ride.translatableSubTitle && ride.translatableSubTitle[lang]) {
      r.subTitle = ride.translatableSubTitle[lang];
    } else if (ride.translatableSubTitle && ride.translatableSubTitle[fallBackLanguage]) {
      r.subTitle = ride.translatableSubTitle[fallBackLanguage];
    }

    if (ride.translatableDescription && ride.translatableDescription[lang]) {
      r.description = ride.translatableDescription[lang];
    } else if (ride.translatableDescription && ride.translatableDescription[fallBackLanguage]) {
      r.description = ride.translatableDescription[fallBackLanguage];
    }

    if (ride.photographs && ride.photographs.length > 0) {
      r.previewImage = `https://s3-eu-west-1.amazonaws.com/stayapp.cms/${ride.photographs[0]}/${ride.photographs[0]}_appthumb`;
      r.image_url = `https://s3-eu-west-1.amazonaws.com/stayapp.cms/${ride.photographs[0]}/${ride.photographs[0]}_appthumb`;
      r.images = [];

      ride.photographs.forEach((photo) => {
        r.images.push(`https://s3-eu-west-1.amazonaws.com/stayapp.cms/${photo}/${photo}`);
      });
    }

    if (ride.category) {
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
          r.eventCategory = EventCategory.HALLOWEEN;
          break;
        // Movie park: Scare maze
        case 48231:
          r.category = PoiCategory.HALLOWEEN_WALKTROUGH;
          r.eventCategory = EventCategory.HALLOWEEN;
          break;
        // No disponibles
        case 29844:
        default:
          r.rideCategory = RideCategory.UNDEFINED;
          break;
      }
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

    if (ride.waitingTime) {
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
    const shows = showResponse.data.grouping[0].list.map((s) => this.transferShowToPoi(s));

    const tz = moment().tz('Europe/Madrid');
    showResponse.data.grouping[0].calendar.forEach((calenderRow) => {
      const show = shows.find((show) => show.id === calenderRow.service.toString());

      if (show) {
        const dateTime = moment(`${calenderRow.eventDay} ${calenderRow.hour}`, 'YYYY-MM-DD HH:mm:ss').tz('Europe/Madrid');

        if (dateTime.format('YYYY-MM-DD') !== tz.format('YYYY-MM-DD')) {
          return;
        }

        const start = moment(`${calenderRow.eventDay} ${calenderRow.endHour}`, 'YYYY-MM-DD HH:mm:ss');

        // TODO: Don't hard-code the timezone
        const showTime: ShowTime = {
          id: calenderRow.id.toString(),
          isPassed: moment().tz('Europe/Madrid').isAfter(dateTime),
          localFromDate: calenderRow.eventDay,
          localFromTime: calenderRow.hour,
          localToDate: calenderRow.eventDay,
          localToTime: calenderRow.endHour,
          timezoneFrom: start.tz('Europe/Madrid').format(),
          duration: start.diff(dateTime, 'minutes'),
        };

        show.showTimes.showTimes.push(showTime);
      }
    });

    return shows;
  }

  transferShowToPoi(show: any, locale?: string): Poi {
    const s: Poi = {
      ...this.transferRideToPoi(show),
      category: PoiCategory.SHOW,
    };

    s.id = this.stringToId(s.title);

    if (show.place && show.place.point) {
      s.location = {
        lat: show.place.point.latitude,
        lng: show.place.point.longitude,
      };
    }

    if (show.photographs && show.photographs.length > 0) {
      s.previewImage = `https://s3-eu-west-1.amazonaws.com/stayapp.cms/${show.photographs[0]}/${show.photographs[0]}_appthumb`;
      s.images = [];

      show.photographs.forEach((photo) => {
        s.images.push(`https://s3-eu-west-1.amazonaws.com/stayapp.cms/${photo}/${photo}`);
      });
    }

    return s;
  }

  transferShowsToPois(shows: ParqueReunidosNewShowItemInterface[], locale?: string): Poi[] {
    const uniqueShows = [];

    shows.forEach((show) => {
      if (!uniqueShows.find((s) => s.repetition === show.repetition || s.service === show.service)) {
        uniqueShows.push(show);
      }
    });

    let ss = uniqueShows.map(show => {
      return {
        repetition: show.repetition,
        service: show.service,
        show: this.transferShowToPoi(show),
      };
    });

    ss.forEach((show) => {
      const showTimes: ShowTime[] = [];

      // TODO: Don't hardcode timezone
      shows
        .filter((s) => s.repetition === show.repetition || show.service == s.service)
        .forEach((showEntry) => {
          const start = moment(`${showEntry.eventDay} ${showEntry.hour}`).tz('Europe/Paris', false);

          showTimes.push({
            timezoneFrom: start.format(),
            id: showEntry.id.toString(),
            localFromDate: showEntry.eventDay,
            localFromTime: showEntry.hour,
            localToDate: showEntry.eventDay,
            localToTime: showEntry.endHour,
            isPassed: start.isBefore(moment.tz('Europe/Paris')),
          });
        });

      show.show.showTimes = {
        currentDateTimezone: moment.tz('Europe/Paris').format(),
        timezone: 'Europe/Paris',
        showTimes: showTimes,
        currentDate: moment.tz('Europe/Paris').format('YYYY-MM-DD'),
      };
    });

    return ss.map((s) => s.show);
  }

  transferRestaurantsToPois(restaurants: any, locale?: string): Poi[] {
    return restaurants.map((r) => {
      const poi = this.transferRideToPoi(r);
      poi.category = PoiCategory.RESTAURANT;
      return poi;
    });
  }

  transferShopToPoi(shop: any, locale?: string): Poi {
    const poi = this.transferRideToPoi(shop, locale);
    poi.category = PoiCategory.SHOP;
    delete poi.rideCategory;
    return poi;
  }

  stringToId(string) {
    return string
      .normalize('NFKD') // split accented characters into their base characters and diacritical marks
      .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
      .trim() // trim leading or trailing whitespace
      .toLowerCase() // convert to lowercase
      .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .replace(/-+/g, '-'); // remove consecutive hyphens
  }
}
