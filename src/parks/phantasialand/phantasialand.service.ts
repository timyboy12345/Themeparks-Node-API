import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import * as Sentry from '@sentry/node';
import { ConfigService } from '@nestjs/config';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { Poi } from '../../_interfaces/poi.interface';
import { PhantasialandTransferService } from './phantasialand-transfer/phantasialand-transfer.service';
import { ThroughPoisThemeParkService } from '../../_services/themepark/through-pois-theme-park.service';
import { PhantasialandWaitTimeItem } from './interfaces/phantasialand-wait-time-item.interface';
import * as moment from 'moment';
import { ShowTime } from '../../_interfaces/showtimes.interface';

@Injectable()
export class PhantasialandService extends ThroughPoisThemeParkService {
  private readonly _phantasialandApiUrl: string;
  private readonly _phantasialandApiEmail: string;
  private readonly _phantasialandApiPassword: string;

  constructor(private readonly configService: ConfigService,
              private readonly httpService: HttpService,
              private readonly phantasialandTransferService: PhantasialandTransferService) {
    super();

    this._phantasialandApiUrl = this.configService.get('PHANTASIALAND_API_URL');
    this._phantasialandApiEmail = this.configService.get('PHANTASIALAND_API_EMAIL');
    this._phantasialandApiPassword = this.configService.get('PHANTASIALAND_API_PASSWORD');
  }

  getInfo(): ThemePark {
    return {
      id: 'phantasialand',
      name: 'Phantasialand',
      description: 'Phantasialand is een attractiepark in het Duitse Brühl ten zuidwesten van Keulen. Het attractiepark is begonnen als sprookjespark en inmiddels uitgegroeid tot een van de best bezochte attractieparken van Europa.',
      countryCode: 'de',
      image: 'https://static.phlcdn.de/files/uploads/themenpark/images/sommer/berlin/ga_keyvisual_berlin.jpg',
      parkType: ParkType.THEMEPARK,
      location: {
        lat: 50.798954,
        lng: 6.879314,
      },
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: true,
      supportsRides: true,
      supportsShowTimes: true,
      supportsShows: true,
      supportsPoiLocations: true,
      supportsShops: true,
      supportsShopOpeningTimes: false,
      supportsRideWaitTimesHistory: true,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: false,
      supportsAnimals: false,
      supportsTranslations: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    let pois: Poi[];
    const poisRequest = this
      .request<any[]>('pois?filter[where][seasons][like]=%25SUMMER%25&compact=true')
      .then((axiosRidesData) => {
        pois = this.phantasialandTransferService.transferPoisToPois(axiosRidesData.data);
      });

    let times: PhantasialandWaitTimeItem[] = [];
    const waitTimesRequest = this.getWaitTimes().then(waitTimes => times = waitTimes.data);

    return Promise.all([poisRequest, waitTimesRequest])
      .then(() => {
        return pois.map((poi) => {
          const waitTimeData = times.find((t) => t.poiId == poi.id);

          if (waitTimeData) {
            if (waitTimeData.waitTime) {
              poi.currentWaitTime = waitTimeData.waitTime;
            }

            if (waitTimeData.showTimes) {
              const showTimes: ShowTime[] = [];

              waitTimeData.showTimes.map((showTime) => {
                const start = moment(showTime);
                showTimes.push({
                  from: start.format(),
                  fromTime: start.format('HH:mm'),
                  to: null,
                  toTime: null,
                  id: null,
                  isPassed: moment(start).isBefore(),
                });
              });

              const d = new Date();

              poi.showTimes = {
                currentDate: moment().format(),
                duration: null,
                allShowTimes: showTimes,
                futureShowTimes: showTimes.filter(s => moment(s.from).isSame(d, 'day') && !s.isPassed),
                pastShowTimes: showTimes.filter(s => moment(s.from).isSame(d, 'day') && s.isPassed),
                todayShowTimes: showTimes.filter(s => moment(s.from).isSame(d, 'day')),
                otherDateShowTimes: showTimes.filter(s => !moment(s.from).isSame(d, 'day')),
              };
            }
          }

          return poi;
        });
      })
      .catch((reason) => {
        Sentry.captureException(reason);
        console.log(reason);
        throw new InternalServerErrorException(reason);
      });
  }

  private getToken() {
    const fullUrl = this._phantasialandApiUrl + '/app-users/login';

    return this
      .httpService
      .post<{
        id: string,
        ttl: number,
        created: string,
        userId: number
      }>(fullUrl, {
        'email': this._phantasialandApiEmail,
        'password': this._phantasialandApiPassword,
        'ttl': 31556926, // One year
      })
      .toPromise()
      .then(value => {
        return value;
      })
      .catch(reason => {
        Sentry.captureException(reason);
        console.log(reason);
        throw new InternalServerErrorException();
      });
  }

  private async request<T>(url: String) {
    const fullUrl = this._phantasialandApiUrl + '/' + url;

    return this
      .httpService
      .get<T>(fullUrl)
      .toPromise()
      .then(value => {
        return value;
      })
      .catch(reason => {
        Sentry.captureException(reason);
        console.log(reason);
        throw new InternalServerErrorException();
      });
  }

  private getRandomLatLng(): { longitude: number, latitude: number } {
    return {
      longitude: 6.878342628 + (Math.random() * (6.882447 - 6.877412)),
      latitude: 50.800659529 + (Math.random() * (50.798957 - 50.800298)),
    };
  }

  private async getWaitTimes() {
    const latLng = this.getRandomLatLng();
    const loc = `${latLng.latitude.toFixed(14)},${latLng.longitude.toFixed(14)}`;

    const tokenResponse = await this.getToken();
    const token = tokenResponse.data.id;

    const fullUrl = `${this._phantasialandApiUrl}/signage-snapshots?loc=${loc}&access_token=${token}`;

    return this
      .httpService
      .get<PhantasialandWaitTimeItem[]>(fullUrl)
      .toPromise()
      .then(value => {
        return value;
      })
      .catch(reason => {
        Sentry.captureException(reason);
        console.log(reason);
        throw new InternalServerErrorException();
      });
  }
}
