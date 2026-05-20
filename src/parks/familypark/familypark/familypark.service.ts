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

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
      supportsEvents: false,
      supportsOpeningTimes: false,
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
      supportsShows: false,
      supportsTranslations: true,
      textType: 'HTML',
    };
  }

  async getPois(): Promise<Poi[]> {
    const locale = this.locale.getLocale() === 'de' ? 'de' : 'en';
    const url = `https://aem.familypark.at/api/fmp/${locale}/mobileapptabs.v1.json`

    return this.http.get(url, {
      headers: {
        'User-Agent': 'Familypark/2121 CFNetwork/3860.500.112 Darwin/25.4.0',
        'x-api-key': 'r6uko7sdv4dq-btw',
        'host': 'aem.familypark.at',
        'accept': '*/*',
        'accept-language': 'nl-NL,nl;q=0.9',
      },
    })
      .toPromise()
      .then((res) => this.transfer.transferDataObjectToPois(res.data))
      .catch((e) => {
        Sentry.captureException(e);
        console.error(e)
        throw new InternalServerErrorException(e);
      });
  }
}
