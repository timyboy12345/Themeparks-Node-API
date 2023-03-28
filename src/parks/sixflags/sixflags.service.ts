import { Injectable } from '@nestjs/common';
import { ThemeParkService } from '../../_services/themepark/theme-park.service';
import { CompanyService } from '../../_services/company/company.service';
import { Company, ParkType, ThemePark } from '../../_interfaces/park.interface';
import { ConfigService } from '@nestjs/config';
import { SixflagsThemeparksResponseInterface } from './interfaces/sixflags-themeparks-response.interface';
import { SixFlagsGeneralParkService } from './parks/six-flags-general-park/six-flags-general-park.service';
import { SixflagsTransferService } from './sixflags-transfer/sixflags-transfer.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SixflagsService extends CompanyService {
  private readonly _sixflagsApiUrl: string;
  private readonly _sixflagsApiToken: string;

  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService,
              private readonly sixflagsTransferService: SixflagsTransferService) {
    super();

    this._sixflagsApiUrl = this.configService.get('SIXFLAGS_API_URL');
    this._sixflagsApiToken = this.configService.get('SIXFLAGS_API_TOKEN');
  }

  async getParkServices(): Promise<ThemeParkService[]> {
    return (await this.getParksResponse()).parks.map(park => {
      let countryCode: string;

      switch (park.country) {
        case 'Canada':
          countryCode = 'ca';
          break;
        case 'United States':
        default:
          countryCode = 'us';
          break;
      }

      const id = `sixflags_${park.parkId}`;
      const image = park.image && park.image[0] && park.image[0].length > 0 ? park.image[0][1] : '';

      let parkType: ParkType = park.isWaterPark ? ParkType.WATER_PARK : ParkType.THEMEPARK;

      const parkInfo: ThemePark = {
        countryCode: countryCode,
        description: `${park.address}, ${park.city}, ${park.state}`,
        id: id,
        image: image,
        name: park.name,
        parkType: parkType,
        company: Company.SIXFLAGS
      };

      if (park.renderLocation) {
        parkInfo.location = {
          lat: park.renderLocation.latitude,
          lng: park.renderLocation.longitude
        }
      }

      if (park.image) {
        const key = Object.keys(park.image)[0];
        parkInfo.image = park.image[key];
      }

      const s = new SixFlagsGeneralParkService(this.configService, this.httpService, this.sixflagsTransferService);
      s.setInfo(parkInfo);
      s.setParkId(park.parkId + '');
      return s;
    });
  }

  private async getParksResponse(): Promise<SixflagsThemeparksResponseInterface> {
    const url = this._sixflagsApiUrl + '/park';
    return (await this.httpService.get<SixflagsThemeparksResponseInterface>(url).toPromise()).data;
  }
}
