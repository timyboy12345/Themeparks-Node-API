import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ThemeParkService } from '../../_services/themepark/theme-park.service';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { AttraktionerResponseInterface } from './interfaces/attraktioner-response.interface';
import { Poi } from '../../_interfaces/poi.interface';
import * as Sentry from '@sentry/node';
import { GronaLundTransferService } from './grona-lund-transfer/grona-lund-transfer.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GronaLundService extends ThemeParkService {
  constructor(private readonly httpService: HttpService,
              private readonly transferService: GronaLundTransferService,
              private readonly configService: ConfigService) {
    super();
  }

  getInfo(): ThemePark {
    return {
      id: 'grona-lund',
      name: 'Grona Lund',
      countryCode: 'se',
      description: 'Tivoli Gröna Lund is een attractiepark in de Zweedse hoofdstad Stockholm. Het park is gelegen op het schiereiland Djurgården en opende voor het eerst de poorten in 1883. In 2003 vierde het park dat het 120 jaar oud was met onder andere een nieuwe achtbaan.',
      image: 'https://www.nordicchoicehotels.com/globalassets/global/campaign-images/nch-global-campaigns/nojespark/view-night-grona-lund.jpg?t=ScaleDownToFill%7C985x549',
      parkType: ParkType.THEMEPARK
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
      supportsShowTimes: false,
      supportsRestaurantOpeningTimes: false,
      supportsPois: true,
      supportsPoiLocations: false,
      supportsShopOpeningTimes: false,
      supportsShops: false,
      supportsRides: true,
      supportsShows: false,
      supportsRestaurants: false,
      supportsRideWaitTimes: false,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: false,
      supportsRideWaitTimesHistory: false
    };
  }

  async getPois(): Promise<Poi[]> {
    const data: any = await this.getData();
    return this.transferService.transferRidesToPois(data.result.data.contentfulContentPage.blocks[0].blocks[0].lists[0].listObjects);
  }

  async getData(): Promise<AttraktionerResponseInterface> {
    const baseURL = this.configService.get('GRONA_LUND_API_URL');
    const url = `${baseURL}/page-data/attraktioner/page-data.json`

    return this.httpService.get<AttraktionerResponseInterface>(url)
      .toPromise()
      .then(value => {
        return value.data;
      })
      .catch(reason => {
        Sentry.captureException(reason);
        console.log(reason);
        throw new InternalServerErrorException(reason);
      });
  }
}
