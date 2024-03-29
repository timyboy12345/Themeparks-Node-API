import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { Poi } from '../../../_interfaces/poi.interface';
import { ThemeParkService } from '../../../_services/themepark/theme-park.service';
import { ConfigService } from '@nestjs/config';
import { BlijdorpTransferService } from '../blijdorp-transfer/blijdorp-transfer.service';
import * as moment from 'moment';
import * as Sentry from '@sentry/node';
import { BlijdorpShow } from '../interfaces/blijdorp-show.interface';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class BlijdorpService extends ThemeParkService {
  private readonly organiqBaseUrl: string;
  private readonly organiqToken: string;

  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService,
              private readonly transferService: BlijdorpTransferService) {
    super();

    this.organiqBaseUrl = this.configService.get('BLIJDORP_ORGANIQ_URL');
    this.organiqToken = this.configService.get('BLIJDORP_ORGANIQ_TOKEN');
  }

  getInfo(): ThemePark {
    return {
      id: 'blijdorp',
      countryCode: 'nl',
      name: 'Blijdorp',
      description: 'In de woonwijk Blijdorp is de dierentuin van Rotterdam gevestigd, met ijsberen, rode panda\'s en een onderwatertunnel van waaruit je haaien kunt observeren. In het naastgelegen Vroesenpark lopen paden langs rustige meren, en het nabijgelegen Telecommuseum beschikt over een curieuze collectie klassieke radio\'s, telefoons en faxmachines. In de omliggende straten vind je bakkerijen, pizzeria\'s en informele buurtcafés.',
      image: 'https://bollenstreek.nl/wp-content/uploads/2018/10/savanne-totaal-1-620x350.jpg',
      location: {
        lat: 51.9269605,
        lng: 4.4481325,
      },
      parkType: ParkType.ZOO,
      timezone: 'Europe/Amsterdam',
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: false,
      supportsPois: false,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: false,
      supportsRideWaitTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsRides: false,
      supportsShopOpeningTimes: false,
      supportsShops: false,
      supportsShowTimes: true,
      supportsShows: true,
      supportsTranslations: false,
supportsHalloween: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    return this.getShows();
  }

  // TODO: Fix this error
  async getShows(): Promise<Poi[]> {
    const date = moment().format('YYYY-MM-DD');
    const url = `${this.organiqBaseUrl}/api/events/${date}`;

    const headers = {
      Authorization: `Bearer ${this.organiqToken}`,
    };

    return this.httpService
      .get<BlijdorpShow[]>(url, {
        headers: headers,
      }).toPromise()
      .then((response) => {
        return this.transferService.transferShowsToPois(response.data);
      })
      .catch((exception) => {
        Sentry.captureException(exception);
        console.error(exception);
        throw new InternalServerErrorException(exception);
      });
  }
}
