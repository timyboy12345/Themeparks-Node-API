import { HttpService, Injectable } from '@nestjs/common';
import { ThemeParkService } from '../../../../_services/themepark/theme-park.service';
import { ParkType, ThemePark } from '../../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../../_interfaces/park-supports.interface';
import { ConfigService } from '@nestjs/config';
import { Poi } from '../../../../_interfaces/poi.interface';

@Injectable()
export class SfOverTexasService extends ThemeParkService {
  private readonly _sixflagsApiUrl: string;
  private readonly _sixflagsApiToken: string;

  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService) {
    super();

    this._sixflagsApiUrl = this.configService.get('SIXFLAGS_API_URL');
    this._sixflagsApiToken = this.configService.get('SIXFLAGS_API_TOKEN');
  }

  getInfo(): ThemePark {
    return {
      id: 'over_texas',
      description: '',
      name: 'Six Flags Over Texas',
      countryCode: 'us',
      image: '',
      parkType: ParkType.THEMEPARK,
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsPoiLocations: true,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: false,
      supportsRideWaitTimes: false,
      supportsRides: false,
      supportsShopOpeningTimes: false,
      supportsShops: false,
      supportsShowTimes: false,
      supportsShows: false,
      supportsRideWaitTimesHistory: false,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: false,
      supportsAnimals: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    return super.getPois();
  }
}
