import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BellewaerdeTransferService } from '../bellewaerde-transfer/bellewaerde-transfer.service';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { Poi } from '../../../_interfaces/poi.interface';
import { BellewaerdeRidesResponseInterface } from '../interfaces/bellewaerde-rides-response.interface';
import * as Sentry from '@sentry/node';
import { ThemeParkService } from '../../../_services/themepark/theme-park.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class BellewaerdeAquaparkService extends ThemeParkService {
  constructor(private readonly httpService: HttpService,
              private readonly belleWaerdeTransferService: BellewaerdeTransferService) {
    super();
  }

  getInfo(): ThemePark {
    return {
      id: 'bellewaerde-aquapark',
      name: 'Bellewaerde Aquapark',
      description: 'Quality time met het hele gezin. Dat vind je terug in Bellewaerde Aquapark. Echte avonturiers voelen zich thuis in de glijbanen. De levensgenieters ontspannen in de wellness. Groot en klein leeft zich uit in de speelzones. En iedereen geniet samen in Aquaventure, dé glijbaan voor het hele gezin. Kom het zelf het hele jaar door beleven!',
      image: 'https://aquapark.bellewaerde.be/sites/default/files/2019-07/aquaventure_0.jpg',
      countryCode: 'be',
      parkType: ParkType.WATER_PARK,
      location: {
        lat: 50.84687077818655,
        lng: 2.9486033747962352
      }
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: false,
      supportsRideWaitTimes: false,
      supportsRides: true,
      supportsShowTimes: false,
      supportsShows: false,
      supportsPoiLocations: false,
      supportsShops: false,
      supportsShopOpeningTimes: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsRideWaitTimesHistory: false,
      supportsAnimals: false,
      supportsTranslations: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    const promises = [
      this.getRides()
    ];

    return []
      .concat
      .apply([], await Promise.all(promises));
  }

  async getRides(): Promise<Poi[]> {
    const data = await this.getSlideData();

    return this.belleWaerdeTransferService.transferPoisToPois(data.markers);
  }

  private async getSlideData() {
    return this.httpService
      .get<BellewaerdeRidesResponseInterface>('https://aquapark.bellewaerde.be/nl/entertainment_list/128/json')
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
