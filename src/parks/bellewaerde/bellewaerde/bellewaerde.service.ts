import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import * as BellewaerdePoiData from '../data/bellewaerde-pois.json';
import { Poi } from '../../../_interfaces/poi.interface';
import * as Sentry from '@sentry/node';
import { BellewaerdeApiResponseItemInterface } from '../interfaces/bellewaerde-api-response.interface';
import * as moment from 'moment';
import { ShowTime } from '../../../_interfaces/showtimes.interface';
import { ThemeParkService } from '../../../_services/themepark/theme-park.service';
import { BellewaerdeRidesResponseInterface } from '../interfaces/bellewaerde-rides-response.interface';
import { BellewaerdeTransferService } from '../bellewaerde-transfer/bellewaerde-transfer.service';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';

@Injectable()
export class BellewaerdeService extends ThemeParkService {
  constructor(private readonly httpService: HttpService,
              private readonly belleWaerdeTransferService: BellewaerdeTransferService) {
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
      location: {
        lat: 50.846996,
        lng: 2.947948
      }
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: false,
      supportsRideWaitTimes: true,
      supportsRides: true,
      supportsShowTimes: false,
      supportsShows: true,
      supportsPoiLocations: false,
      supportsShops: false,
      supportsShopOpeningTimes: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsRideWaitTimesHistory: true,
      supportsAnimals: true,
    };
  }

  async getPois(): Promise<Poi[]> {
    const promises = [
      this.getRides(),
      this.getAnimals()
    ];

    return []
      .concat
      .apply([], await Promise.all(promises));
  }

  async getRides(): Promise<Poi[]> {
    const data = await this.getRideData();
    const waitTimes = await this.getWaitTimes();

    const pois = this.belleWaerdeTransferService.transferPoisToPois(data.markers);

    pois.forEach(poi => {
      const r = BellewaerdePoiData.find(p => p.name.toLowerCase() === poi.title.toLowerCase());
      if (r) {
        poi.id = `${r.code}`;
      }
    });

    pois.forEach(poi => {
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
              isPassed: timeStamp.isBefore(),
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

    return pois;
  }

  async getShows(): Promise<Poi[]> {
    const rides = await this.getPois();
    return rides.filter(r => r.category === PoiCategory.SHOW);
  }

  async getAnimals(): Promise<Poi[]> {
    const animals = await this.getAnimalData();
    return this.belleWaerdeTransferService.transferPoisToPois(animals.markers);
  }

  private async getRideData() {
    return this.httpService
      .get<BellewaerdeRidesResponseInterface>('https://www.bellewaerde.be/nl/entertainment_list/61/json')
      .toPromise()
      .then(value => {
        return value.data;
      })
      .catch(e => {
        Sentry.captureException(e);
        console.log(e);
        throw new InternalServerErrorException(e);
      });
  }

  private async getAnimalData() {
    return this.httpService
      .get<BellewaerdeRidesResponseInterface>('https://www.bellewaerde.be/nl/entertainment_list/109/json')
      .toPromise()
      .then(value => {
        return value.data;
      })
      .catch(e => {
        Sentry.captureException(e);
        console.log(e);
        throw new InternalServerErrorException(e);
      });
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
        console.log(e);
        throw new InternalServerErrorException(e);
      });
  }
}
