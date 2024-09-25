import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { Poi } from '../../../_interfaces/poi.interface';
import { ThemeParkService } from '../../../_services/themepark/theme-park.service';
import { ConfigService } from '@nestjs/config';
import { BlijdorpTransferService } from '../blijdorp-transfer/blijdorp-transfer.service';
import * as moment from 'moment';
import * as Sentry from '@sentry/node';
import { HttpService } from '@nestjs/axios';
import {
  BlijdorpAnimalInterface,
  BlijdorpAnimalsResponseInterface,
} from '../interfaces/blijdorp-animals-response.interface';
import { LocaleService } from '../../../_services/locale/locale.service';

@Injectable()
export class BlijdorpService extends ThemeParkService {
  private readonly organiqBaseUrl: string;
  private readonly organiqToken: string;

  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService,
              private readonly transferService: BlijdorpTransferService,
              private readonly localeService: LocaleService) {
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
      supportsAnimals: true,
      supportsHalloween: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: false,
      supportsPois: true,
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
    };
  }

  async getPois(): Promise<Poi[]> {
    const promises = [
      this.getAnimals(),
      this.getShows(),
    ];

    return []
      .concat
      .apply([], await Promise.all(promises));
  }

  async getAnimals(): Promise<Poi[]> {
    const url = 'https://diergaardeblijdorp.nl/api/animals-plants-overview';

    let lang: string;
    if (this.localeService.getLocale() == 'nl') {
      lang = 'nl-NL';
    } else {
      lang = 'en-GB';
    }

    let page = 1;
    let tries = 0;
    let animals: BlijdorpAnimalInterface[] = [];

    while (page > 0 && tries < 100) {
      tries++;

      await this.httpService
        .post<BlijdorpAnimalsResponseInterface>(url, {
          'lang': lang,
          'type': 'animal',
          'page': page,
        }).toPromise()
        .then((response) => {
          animals = animals.concat(response.data.items);

          if (response.data.nextPage) {
            page++;
          } else {
            page = -1;
          }
        })
        .catch((exception) => {
          Sentry.captureException(exception);
          console.error(exception);
          throw new InternalServerErrorException(exception);
        });
    }

    return this.transferService.transferAnimalsToPois(animals);
  }

  async getShows(): Promise<Poi[]> {
    const variables = {
      'where': {
        'date_time': {
          'start_date_start_time_before': moment().endOf('day').format(),
          'end_date_end_time_after': moment().startOf('day').format(),
          'wednesday': true,
        },
      }, 'lang': 'nl-NL',
    };

    const url = 'https://blijdorp.prismic.io/graphql?query=query%20allSchedule(%24sortBy%3A%20SortSchedule_cty%2C%20%24where%3A%20WhereSchedule_ct%2C%20%24first%3A%20Int%2C%20%24after%3A%20String%2C%20%24lang%3A%20String)%20%7B%0A%20%20allSchedule_cts(%0A%20%20%20%20where%3A%20%24where%0A%20%20%20%20first%3A%20%24first%0A%20%20%20%20after%3A%20%24after%0A%20%20%20%20sortBy%3A%20%24sortBy%0A%20%20%20%20lang%3A%20%24lang%0A%20%20)%20%7B%0A%20%20%20%20pageInfo%20%7B%0A%20%20%20%20%20%20...PageInfo%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20...Schedule%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20cursor%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20totalCount%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D%0A%0Afragment%20PageInfo%20on%20PageInfo%20%7B%0A%20%20hasNextPage%0A%20%20hasPreviousPage%0A%20%20startCursor%0A%20%20endCursor%0A%20%20__typename%0A%7D%0A%0Afragment%20Schedule%20on%20Schedule_ct%20%7B%0A%20%20type%0A%20%20title%0A%20%20main_image%0A%20%20description%0A%20%20pin_on_map%20%7B%0A%20%20%20%20_linkType%0A%20%20%20%20...%20on%20Pins_ct%20%7B%0A%20%20%20%20%20%20title%0A%20%20%20%20%20%20_meta%20%7B%0A%20%20%20%20%20%20%20%20...Meta%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%20%20connected_route%20%7B%0A%20%20%20%20...%20on%20Route_ct%20%7B%0A%20%20%20%20%20%20_meta%20%7B%0A%20%20%20%20%20%20%20%20uid%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20title%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%20%20animal_or_plant%20%7B%0A%20%20%20%20...%20on%20Animal_plant_detail%20%7B%0A%20%20%20%20%20%20_meta%20%7B%0A%20%20%20%20%20%20%20%20uid%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%20%20link%20%7B%0A%20%20%20%20...%20on%20Landing_page%20%7B%0A%20%20%20%20%20%20_meta%20%7B%0A%20%20%20%20%20%20%20%20uid%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%20%20date_time%20%7B%0A%20%20%20%20...ScheduleDateTime%0A%20%20%20%20__typename%0A%20%20%7D%0A%20%20_meta%20%7B%0A%20%20%20%20...Meta%0A%20%20%20%20__typename%0A%20%20%7D%0A%20%20__typename%0A%7D%0A%0Afragment%20Meta%20on%20Meta%20%7B%0A%20%20id%0A%20%20uid%0A%20%20type%0A%20%20tags%0A%20%20lang%0A%20%20alternateLanguages%20%7B%0A%20%20%20%20id%0A%20%20%20%20uid%0A%20%20%20%20type%0A%20%20%20%20lang%0A%20%20%20%20__typename%0A%20%20%7D%0A%20%20firstPublicationDate%0A%20%20lastPublicationDate%0A%20%20__typename%0A%7D%0A%0Afragment%20ScheduleDateTime%20on%20Schedule_ctDate_time%20%7B%0A%20%20title%0A%20%20start_date_start_time%0A%20%20end_date_end_time%0A%20%20monday%0A%20%20tuesday%0A%20%20wednesday%0A%20%20thursday%0A%20%20friday%0A%20%20saturday%0A%20%20sunday%0A%20%20__typename%0A%7D&operationName=allSchedule&variables=' + encodeURIComponent(JSON.stringify(variables));

    const headers = {
      'prismic-ref': 'ZvKvHhIAAB8ApMvW',
    };

    return this.httpService
      .get<any>(url, {
        headers: headers,
      }).toPromise()
      .then((response) => {
        return this.transferService.transferShowsToPois(response.data.data.allSchedule_cts.edges);
      })
      .catch((exception) => {
        Sentry.captureException(exception);
        console.error(exception);
        throw new InternalServerErrorException(exception);
      });
  }
}
