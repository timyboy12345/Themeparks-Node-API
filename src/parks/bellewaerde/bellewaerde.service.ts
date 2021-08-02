import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import * as BellewaerdePoiData from './data/bellewaerde-pois.json';
import { Poi } from '../../_interfaces/poi.interface';
import { PoiCategory } from '../../_interfaces/poi-categories.enum';
import { ThroughPoisThemeParkService } from '../../_services/themepark/through-pois-theme-park.service';
import * as Sentry from '@sentry/node';
import { BellewaerdeApiResponseItemInterface } from './interfaces/bellewaerde-api-response.interface';
import * as moment from 'moment';
import { ShowTime } from '../../_interfaces/showtimes.interface';

@Injectable()
export class BellewaerdeService extends ThroughPoisThemeParkService {
  constructor(private readonly httpService: HttpService) {
    super();
  }

  getInfo(): ThemePark {
    return {
      id: 'bellewaerde',
      name: 'Bellewaerde',
      description: 'Bellewaerde is een pret- en dierenpark bij Ieper, gelegen in de Belgische provincie West-Vlaanderen. Het park is in handen van het Franse Compagnie des Alpes, waar de Walibiparken ook deel van uitmaken. Bellewaerde telt 54 hectare grond en is vooral beroemd om zijn vele dieren en de aandacht voor thematisering.',
      image: 'https://www.bellewaerde.be/sites/default/files/home/2021-03/wakala-home_0.jpg',
      countryCode: 'be',
      parkType: ParkType.THEMEPARK,
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: true,
      supportsRides: true,
      supportsShowTimes: false,
      supportsShows: true,
      supportsPoiLocations: false,
      supportsShops: true,
      supportsShopOpeningTimes: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsRideWaitTimesHistory: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    const waitTimes = await this.getWaitTimes();

    const data: Poi[] = BellewaerdePoiData.map(poi => {
      let category: PoiCategory;

      switch (poi.type.toUpperCase()) {
        case 'ATTRACTIONS':
          category = PoiCategory.ATTRACTION;
          break;
        case 'RESTO':
          category = PoiCategory.RESTAURANT;
          break;
        case 'SHOPS':
          category = PoiCategory.SHOP;
          break;
        case 'POI':
          category = PoiCategory.SERVICE;
          break;
        case 'SHOW':
          category = PoiCategory.SHOW;
          break;
        case 'DIEREN':
          category = PoiCategory.ANIMAL;
          break;
        default:
          category = PoiCategory.UNDEFINED;
          break;
      }

      return {
        id: poi.code + '',
        title: poi.name,
        category: category,
        original: poi,
      };
    });

    data.forEach(poi => {
      const poiData = waitTimes.find(w => w.id === poi.id);

      if (poiData) {
        if (poiData.wait) {
          poi.currentWaitTime = parseInt(poiData.wait);
        }

        if (poiData.shows) {
          const shows: ShowTime[] = poiData.shows.map(show => {
            const hour = parseInt(show.start.split(':')[0]);
            const minutes = parseInt(show.start.split(':')[1]);
            const timeStamp = moment().set({ 'hour': hour, 'minutes': minutes });

            return {
              from: timeStamp.format(),
              fromTime: show.start,
              duration: parseInt(show.duration),
              isPassed: timeStamp.isBefore()
            };
          });

          poi.showTimes = {
            currentDate: moment().format(),
            todayShowTimes: shows,
            futureShowTimes: shows.filter(s => !s.isPassed),
            pastShowTimes: shows.filter(s => s.isPassed),
            allShowTimes: shows,
          };
        }
      }
    });

    return data;
  }

  private async getWaitTimes() {
    return this.httpService
      .get<BellewaerdeApiResponseItemInterface[]>('http://bellewaer.de/realtime/api/api-realtime.php')
      .toPromise()
      .then(value => {
        return value.data;
      })
      .catch(e => {
        Sentry.captureException(e);
        throw new InternalServerErrorException(e);
      });
  }
}
