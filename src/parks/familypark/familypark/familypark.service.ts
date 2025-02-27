import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ThroughPoisThemeParkService } from '../../../_services/themepark/through-pois-theme-park.service';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { Poi } from '../../../_interfaces/poi.interface';
import { HttpService } from '@nestjs/axios';
import { FamilyparkTransferService } from '../familypark-transfer/familypark-transfer.service';
import * as Sentry from '@sentry/node';
import { LocaleService } from '../../../_services/locale/locale.service';

@Injectable()
export class FamilyparkService extends ThroughPoisThemeParkService {
  constructor(private readonly http: HttpService,
              private readonly transfer: FamilyparkTransferService,
              private readonly locale: LocaleService) {
    super();
  }

  getInfo(): ThemePark {
    return {
      countryCode: 'at',
      description: 'Familypark is een van de grootste pretparken van Oostenrijk, met wel 60 attracties, vele restaurants en winkels.',
      id: 'familypark',
      image: 'https://www.compagniedesalpes.com/sites/default/files/styles/carousel_slide/public/brand/slides/2023-11/FP_Biberburg%28c%29Payer-Web_0.jpg?itok=izh5vpXr',
      name: 'Familypark',
      parkType: ParkType.THEMEPARK,
      location: {
        lat: 47.80178562084945,
        lng: 16.647465309692624,
      },
      company: Company.COMPAGNIE_DES_ALPES,
      timezone: 'Europe/Vaduz',
    };
  }

  // TODO: Familypark App does include restaurants and opening times
  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
      supportsEvents: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: true,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: false,
      supportsRideWaitTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsRides: true,
      supportsShopOpeningTimes: false,
      supportsShops: false,
      supportsShowTimes: false,
      supportsShows: false,
      supportsTranslations: false,
      textType: 'UNDEFINED',
    };
  }

  async getPois(): Promise<Poi[]> {
    const locale = this.locale.getLocale() === 'de' ? 'de' : 'en';

    return this.http.get(`https://leisure.intermaps.com/maps/familypark/data?category=2,3&objectType=271,272,273,274,275&lang=${locale}`)
      .toPromise()
      .then((res) => this.transfer.transferPoisToPois(res.data.features))
      .catch((e) => {
        Sentry.captureException(e);
        throw new InternalServerErrorException(e);
      })
  }
}
