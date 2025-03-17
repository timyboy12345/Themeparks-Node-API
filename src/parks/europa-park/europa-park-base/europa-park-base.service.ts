import { Injectable, InternalServerErrorException, NotImplementedException } from '@nestjs/common';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { ThroughPoisThemeParkService } from '../../../_services/themepark/through-pois-theme-park.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { HttpService } from '@nestjs/axios';
import { EuropaParkTransferService } from '../europa-park-transfer/europa-park-transfer.service';
import * as Sentry from '@sentry/node';
import * as moment from 'moment';
import { ThemeParkOpeningTimes } from '../../../_interfaces/park-openingtimes.interface';

@Injectable()
export class EuropaParkBaseService extends ThroughPoisThemeParkService {
  constructor(private readonly http: HttpService,
              private readonly transfer: EuropaParkTransferService) {
    super();
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
      supportsEvents: false,
      supportsOpeningTimes: true,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: true,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsRides: true,
      supportsShopOpeningTimes: false,
      supportsShops: true,
      supportsShowTimes: false,
      supportsShows: true,
      supportsTranslations: false,
      textType: 'HTML',
    };
  }

  public getParkName(): string {
    throw new NotImplementedException('getParkName is not defined');
  }

  private getToken(): Promise<string> {
    return Promise.resolve('eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk5OTQ5YmQ5LTY5MzEtNGFlNy1hYmU2LWY4MGI0OWYzYjcxMSJ9.eyJhdWQiOiI4NjQyYjIwNy1jMThiLTRlMDYtODYwZi1jNjhmMzdkODRiMjUiLCJhdXRoX3RpbWUiOjE3NDIyNDQ5NDEsImV4cCI6MTc0MjMzMTM0MSwiaWF0IjoxNzQyMjQ0OTQxLCJpc3MiOiJodHRwczovL2FjY291bnQubWFja29uZS5kZSIsImp0aSI6ImU3ZmIwMGY5LWJiNjMtNGQ1ZS1iMWQ2LWMyYzgyMGNkMGMyOCIsInNjb3BlcyI6WyJvcGVuaWQiLCJwcm9maWxlIiwiZW1haWwiLCJhZGRyZXNzIiwiY2lkYWFzOnJlZ2lzdGVyIiwib2ZmbGluZV9hY2Nlc3MiXSwic2lkIjoiYTVlMmY0NWEtNDI5Ny00YTdlLWE1MTMtMGYzMTZkYmMxMTA0Iiwic3ViIjoiQU5PTllNT1VTIiwidWFfaGFzaCI6ImU2NjgzZTQ4MDUwYzYxMTQwMzA5NDM5OTY3MGYyZGZlIn0.qus_XQ33v7iKD0XBTCZZGhiiF6yc_EFQXvK-na5S8-sJkn6zxV217nsbldqXaSFq_sxvr9j_6s18PeOcYOdrJhtdxiE3sZddJZiP6DTL9DVhQmDFo1ON9Z5vMI_tNPo2bs9x7WZxeeZOV0mr0qeWSuMLOnuPwe13hEWcS9njNbM');
  }

  private async request<T>(url: string): Promise<any> {
    const token = await this.getToken();

    return await this.http.get<T>(url, {
      params: {
        'status[]': 'live',
      },
      headers: {
        'JWTAuthorization': 'Bearer ' + token,
        'Accept-Language': 'nl',
      },
    })
      .toPromise()
      .then((r) => r.data)
      .catch((e) => {
        console.error(e);
        Sentry.captureException(e);
        throw new InternalServerErrorException('Could not fetch EuropaPark data');
      });
  }

  async getPois(): Promise<Poi[]> {
    const data = await this.request('https://tickets.mackinternational.de/api/v2/poi-group');
    return this.transfer.transferDataObjectToPois(data, this.getParkName());
  }

  async getOpeningTimes(): Promise<ThemeParkOpeningTimes[]> {
    const data = await this.request<any>(`https://tickets.mackinternational.de/api/v1/opentime/${this.getParkName()}/de`);
    const times = data.opentime;

    const dates = [];

    if (times.today && times.today.start) {
      dates.push({
        date: moment().format(),
        openingTimes: [{
          open: times.today.start,
          close: times.today.end,
          openTime: moment(times.today.start).format('HH:mm:ss'),
          closeTime: moment(times.today.end).format('HH:mm:ss'),
        }],
      });
    }

    if (times.tomorrow && times.tomorrow.start) {
      dates.push({
        date: moment().add(1, 'day').format(),
        openingTimes: [{
          open: times.tomorrow.start,
          close: times.tomorrow.end,
          openTime: moment(times.tomorrow.start).format('HH:mm:ss'),
          closeTime: moment(times.tomorrow.end).format('HH:mm:ss'),
        }],
      });
    }

    if (times.next && times.next.start) {
      dates.push({
        date: moment(times.next.date).format(),
        openingTimes: [{
          open: times.next.start,
          close: times.next.end,
          openTime: moment(times.next.start).format('HH:mm:ss'),
          closeTime: moment(times.next.end).format('HH:mm:ss'),
        }],
      });
    }

    return dates
  }
}
