import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { Poi } from '../../../_interfaces/poi.interface';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/node';
import { BeekseBergenTransferService } from '../beekse-bergen-transfer/beekse-bergen-transfer.service';
import { HttpService } from '@nestjs/axios';
import { ThroughPoisThemeParkService } from '../../../_services/themepark/through-pois-theme-park.service';
import { BeekseBergenLocationsResponseInterface } from '../interfaces/beekse-bergen-locations-response.interface';

@Injectable()
export class SafariparkService extends ThroughPoisThemeParkService {
  private readonly apiUrl;

  constructor(private readonly httpService: HttpService,
              private readonly transferService: BeekseBergenTransferService,
              private readonly configService: ConfigService) {
    super();

    this.apiUrl = this.configService.get('BEEKSE_BERGEN_API_URL');
  }

  getInfo(): ThemePark {
    return {
      id: 'safaripark-beekse-bergen',
      name: 'Safaripark Beekse Bergen',
      description: 'Safaripark Beekse Bergen is een dierenpark dat ligt tussen Tilburg en Hilvarenbeek in de gemeente Hilvarenbeek in de Nederlandse provincie Noord-Brabant. Het is qua oppervlakte het grootste dierenpark van de Benelux. Er worden ca. 100 diersoorten gehouden, variërend van kleine zoogdieren tot grote vogels.',
      image: 'https://d33b12c77av9bg.cloudfront.net/originals/safaripark-giraffen-gamedrive-savanne-beekse-bergen.jpg',
      location: {
        lat: 51.513191,
        lng: 5.112000,
      },
      timezone: 'Europe/Amsterdam',
      parkType: ParkType.ZOO,
      countryCode: 'nl',
      company: Company.LIBEMA,
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: true,
      supportsEvents: false,
      supportsOpeningTimes: true,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: false,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsRides: true,
      supportsShopOpeningTimes: false,
      supportsShops: false,
      supportsShowTimes: false,
      supportsShows: false,
      supportsTranslations: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    // TODO: Beekse Bergen seems to supports pagination, but does not seem to use it
    // let page = 1;
    // let lastPage = false;
    // let pois = [];

    const d = await this.fetchPage(1);

    return this.transferService.transferDataObjectToPois(d);
  }

  // TODO: Use other API endpoint to fetch more data
  async fetchPage(page: number): Promise<BeekseBergenLocationsResponseInterface> {
    // Beekse Bergen Resort ID: 5, Speelland: 6
    const url = 'https://xmp.xo10.io/api/locations?populate=*&filters%5Bresort%5D=5';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjE2MzQyLCJ0ZW5hbnQiOjEsImlhdCI6MTcxOTk5MzUzOCwiZXhwIjoxNzUxNTUxMTM4fQ.PHulhXTPfRURWXRfwvrrYfhKUCgYnTrYd_0-Ok-NGL4';

    return this.httpService.get<BeekseBergenLocationsResponseInterface>(url, {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    })
      .toPromise()
      .then(value => {
        return value.data;
      })
      .catch((exception) => {
        Sentry.captureException(exception);
        console.error(exception);
        throw new InternalServerErrorException(exception);
      });
  }
}
