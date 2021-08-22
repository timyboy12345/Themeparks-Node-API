import { HttpService, Injectable, NotImplementedException } from '@nestjs/common';
import { ThemeParkService } from '../themepark/theme-park.service';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { Poi } from '../../_interfaces/poi.interface';
import { AttractionsIoItemInterface } from '../../_interfaces/attractions-io/attractions-io-item.interface';
import { PoiCategory } from '../../_interfaces/poi-categories.enum';
import { AttractionsIoAppDetailsInterface } from '../../_interfaces/attractions-io/attractions-io-app-details.interface';

@Injectable()
export class AttractionsIoThemeParkService extends ThemeParkService {
  private readonly _attractionsIoApiUrl: string;

  private _tempToken: string;

  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService) {
    super();

    this._attractionsIoApiUrl = 'https://api.attractions.io/v1';
  }

  public getApiKey(): string {
    throw new NotImplementedException("Could not get API key");
  }

  public getInstallationRequestBody(): string {
    throw new NotImplementedException("Could not get installation request body");
  }

  private async getTempToken() {
    return this._tempToken ?? await this.getToken();
  }

  public getAppDetails(): AttractionsIoAppDetailsInterface {
    throw new NotImplementedException("Could not get app details");
  }

  protected async getToken(): Promise<string> {
    const settings = this.getAppDetails();

    const headers = {
      'Authorization': `Attractions-Io api-key="${this.getApiKey()}"`,
      'User-Agent': settings.userAgent,
      'Occasio-Platform-Version': settings.platformVersion,
      'Occasio-Platform': settings.platform,
      'Occasio-App-Build': settings.appBuild,
      'Content-Type': settings.contentType,
    };

    const config: AxiosRequestConfig = { headers: headers };

    return await this.httpService
      .post(
        this._attractionsIoApiUrl + '/installation',
        this.getInstallationRequestBody(),
        config,
      )
      .toPromise()
      .then(value => {
        this._tempToken = value.data.token;
        return this._tempToken;
      })
      .catch((reason: AxiosError) => {
        console.error(reason.response.data);
        throw reason;
      });
  }

  protected async getData() {
    const token = await this.getTempToken();
    const settings = this.getAppDetails();

    const headers = {
      'Authorization': `Attractions-Io api-key="${this.getApiKey()}", installation-token="${token}"`,
      'Date': settings.latestUpdate,
      'User-Agent': settings.userAgent
    };

    const config: AxiosRequestConfig = {
      headers: headers,
      params: {
        'version': settings.latestUpdate,
      },
    };

    return await this.httpService
      .get(
        this._attractionsIoApiUrl + '/data',
        config,
      )
      .toPromise()
      .then((value) => {
        console.log("SUCCESS");
        console.log(value);
        console.log(value.data);
      })
      .catch((reason: AxiosError) => {
        console.error("FAILED");
        console.log(`${reason.response.status} / ${reason.response.statusText}`);
        console.log(reason.response.data);
      });
  }

  public getFileItems(file: any, default_locale = ' en-GB'): Poi[] {
    return file.Item.map((item: AttractionsIoItemInterface) => {
      let category: PoiCategory = this.getCategory(item.Category);

      const poi: Poi = {
        id: item._id + '',
        title: item.Name[default_locale],
        localizedTitles: {
          en: item.Name['en-GB'],
          nl: item.Name['nl-NL'],
          de: item.Name['de-DE'],
        },
        description: item.Summary ? item.Summary['en-GB'] : undefined,
        category: category,
        original: item,
        minSize: item.MinimumHeightRequirement ? item.MinimumHeightRequirement * 100 : undefined,
        minSizeWithEscort: item.MinimumUnaccompaniedHeightRequirement ? item.MinimumUnaccompaniedHeightRequirement : undefined,
        maxSize: item.MaximumHeightRequirement ? item.MaximumHeightRequirement * 100 : undefined,
        minAge: item.MinimumAgeRequirement ?? undefined,
        maxAge: item.MaximumAgeRequirement ?? undefined,
      };

      if (item.Summary) {
        poi.localizedDescriptions = {
          en: item.Summary['en-GB'],
          nl: item.Summary['nl-NL'],
          de: item.Summary['de-DE'],
        };
      }

      if (item.Location) {
        const lat = parseFloat(item.Location.split(',')[0]);
        const lng = parseFloat(item.Location.split(',')[1]);

        poi.location = {
          lat: lat,
          lng: lng,
        };
      }

      return poi;
    });
  }

  public getCategory(category: number): PoiCategory {
    return PoiCategory.UNDEFINED;
  }
}
