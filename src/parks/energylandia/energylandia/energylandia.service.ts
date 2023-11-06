import { Injectable } from '@nestjs/common';
import { ThemeParkService } from '../../../_services/themepark/theme-park.service';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { Poi } from '../../../_interfaces/poi.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { EnergylandiaCalendarInterface } from '../interfaces/energylandia-calendar.interface';
import { EnergylandiaWaitTimeInterface } from '../interfaces/energylandia-wait-time.interface';
import * as moment from 'moment';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class EnergylandiaService extends ThemeParkService {
  constructor(private readonly httpService: HttpService) {
    super();
  }

  getInfo(): ThemePark {
    return {
      id: 'energylandia',
      name: 'Energylandia',
      image: 'https://www.pretparken.be/dynamic_pics/thumb_49fae35d671ebf883bd4d68e6f3728dc_1280_960_1.jpg',
      description: 'Energylandia is een attractiepark in Zator in het zuiden van Polen. Het park ligt ongeveer 50 kilometer af van Krakau en 400 kilometer van de hoofdstad Warschau. Met een oppervlakte van zo\'n 30 hectare is Energylandia het grootste pretpark van het land.',
      countryCode: 'pl',
      parkType: ParkType.THEMEPARK,
      timezone: 'Europe/Warsaw',
      location: {
        lat: 49.99959,
        lng: 19.40716,
      },
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: false,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: false,
      supportsRideWaitTimes: true,
      supportsRideWaitTimesHistory: true,
      supportsRides: true,
      supportsShopOpeningTimes: false,
      supportsShops: false,
      supportsShowTimes: true,
      supportsShows: true,
      supportsTranslations: false,
      supportsHalloween: false,
    };
  }

  async getShows(): Promise<Poi[]> {
    return this.httpService
      .get<EnergylandiaCalendarInterface>('https://energylandia.pl/wp-admin/admin-ajax.php?action=get_calendar_json')
      .toPromise()
      .then((response) => {
        const date = moment().format('YYYY-MM-DD');

        if (!response.data[date] || !response.data[date].show) {
          return [];
        }

        return response.data[date].show.map((show) => {
          const shows = show.time.split(',').map((showTime) => {
            const time = showTime.trim();

            return {
              from: moment(time, 'HH:mm').format(),
              fromTime: time,
              toTime: null,
              isPassed: moment(time, 'HH:mm').isBefore(),
            };
          });

          const poi: Poi = {
            id: show.id.toString(),
            category: PoiCategory.SHOW,
            original: show,
            title: show.title,
            website_url: show.link,
            showTimes: {
              currentDate: moment().format(),
              todayShowTimes: shows,
              futureShowTimes: shows.filter(s => !s.isPassed),
              pastShowTimes: shows.filter(s => s.isPassed),
              allShowTimes: shows,
            },
          };

          return poi;
        });
      });
  }

  async getRides(): Promise<Poi[]> {
    return this.getPois().then((rides) => rides.filter((r) => r.title));
  }

  async getPois(): Promise<Poi[]> {
    return this.httpService
      .get<EnergylandiaWaitTimeInterface[]>('http://91.246.213.54:53852/')
      .toPromise()
      .then((response) =>
        response.data.map((ride) => {
          const poi: Poi = {
            id: ride.ID_ATRAKCJI.toString(),
            category: PoiCategory.ATTRACTION,
            original: ride,
            title: ride.ATRAKCJA.split('-')[1],
            currentWaitTime: ride.CZAS_OCZEKIWANIA,
          };

          return poi;
        }));
  }

  // async getOpeningTimes(): Promise<ThemeParkOpeningTimes[]> {
  //   https://us-central1-cms-energylandia-app.cloudfunctions.net/activeRule
  // }
}
