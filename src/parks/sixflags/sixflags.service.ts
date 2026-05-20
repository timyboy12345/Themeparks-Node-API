import { Inject, Injectable } from '@nestjs/common';
import { ThemeParkService } from '../../_services/themepark/theme-park.service';
import { CompanyService } from '../../_services/company/company.service';
import { Company, ParkType, ThemePark } from '../../_interfaces/park.interface';
import { ConfigService } from '@nestjs/config';
import { SixFlagsGeneralParkService } from './parks/six-flags-general-park/six-flags-general-park.service';
import { SixflagsTransferService } from './sixflags-transfer/sixflags-transfer.service';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { SixflagsCedarParkInterface } from './interfaces/sixflags-cedar-park.interface';

@Injectable()
export class SixflagsService extends CompanyService {
  private readonly _sixflagsParksUrl: string;
  private readonly _sixflagsBaseUrl: string;

  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService,
              private readonly sixflagsTransferService: SixflagsTransferService,
              @Inject(CACHE_MANAGER) private readonly cache: Cache) {
    super();

    this._sixflagsParksUrl = this.configService.get('SIX_FLAGS_CEDAR_PARKS_API_URL');
    this._sixflagsBaseUrl = this.configService.get('SIX_FLAGS_CEDAR_BASE_API_URL');
  }

  async getParkServices(): Promise<ThemeParkService[]> {
    const k = `sixflags_parks`;

    let parks: SixflagsCedarParkInterface[] = await this.cache.get(k);

    if (parks === undefined) {
      parks = await this.getParksResponse();

      // Save POI data for 24 hours, as this requests takes incredibly long
      await this.cache.set(k, parks, 1000 * 60 * 60 * 24);
    }

    return parks
      .filter((p) => p.hideFromParkSelector ? !p.hideFromParkSelector : true)
      .map((park) => {
        let countryCode: string;

        switch (park.state) {
          case 'Saudi Arabia':
            countryCode = 'sa';
            break;
          case 'Québec':
            countryCode = 'ca';
            break;
          default:
            countryCode = 'us';
            break;
        }

        const id = `sixflags-entertainment-${park.slug}`;
        const image = park.image && park.image[0] && park.image[0].length > 0 ? park.image[0][1] : '';

        let parkType: ParkType = park.parkType.includes('water-park') ? ParkType.WATER_PARK : ParkType.THEMEPARK;

        const parkInfo: ThemePark = {
          countryCode: countryCode,
          description: `${park.city}, ${park.state}`,
          id: id,
          image: image,
          name: park.parkName,
          parkType: parkType,
          company: Company.SIXFLAGS_ENTERTAINMENT,
        };

        if (park.location) {
          parkInfo.location = {
            lat: park.location.latitude,
            lng: park.location.longitude,
          };
        }

        if (park.image) {
          parkInfo.image = park.image;
        }

        const s = new SixFlagsGeneralParkService(this.configService, this.httpService, this.sixflagsTransferService);
        s.setInfo(parkInfo);
        s.setParkId(park.parkId + '');
        return s;
      });
  }


  private async getParksResponse(): Promise<SixflagsCedarParkInterface[]> {
    const url = this._sixflagsParksUrl + '/content/all-parks';
    return (await this.httpService.get<SixflagsCedarParkInterface[]>(url).toPromise()).data;
  }
}
