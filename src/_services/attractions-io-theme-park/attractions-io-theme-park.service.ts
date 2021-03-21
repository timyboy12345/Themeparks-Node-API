import { HttpService, Injectable } from '@nestjs/common';
import { ThemeParkService } from '../themepark/theme-park.service';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { Poi } from '../../_interfaces/poi.interface';
import { AttractionsIoItemInterface } from '../../_interfaces/attractions-io/attractions-io-item.interface';
import { PoiCategory } from '../../_interfaces/poi-categories.enum';

@Injectable()
export class AttractionsIoThemeParkService extends ThemeParkService {
  private readonly _attractionsIoApiUrl: string;
  private readonly _attractionsIoApiInstallationBody: string;

  private _tempToken: string;

  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService) {
    super();

    this._attractionsIoApiUrl = 'https://api.attractions.io/v1';
    this._attractionsIoApiInstallationBody = '\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="device_identifier"\n' +
      '\n' +
      '6FE3A85A-B6EF-4D19-A199-15EE46386BB6\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="user_identifier"\n' +
      '\n' +
      'D1982D4C-FF0C-4FE8-BDA3-2DE392E54544\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="app_version"\n' +
      '\n' +
      '1.2\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="app_build"\n' +
      '\n' +
      '23\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc--\n' +
      '\n';
  }

  private async getTempToken() {
    return this._tempToken ?? await this.getToken();
  }

  protected async getToken(): Promise<string> {
    const headers = {
      'Authorization': 'Attractions-Io api-key="3acb983d-a451-4700-b607-aac8ab1bedee"',
      'User-Agent': 'Avonturenpark/23 CFNetwork/1220.1 Darwin/20.3.0',
      'Occasio-Platform-Version': '14.4',
      'Occasio-Platform': 'iOS',
      'Occasio-App-Build': '23',
      'Content-Type': 'multipart/form-data; boundary=s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc',
    };

    const config: AxiosRequestConfig = { headers: headers };

    return await this.httpService
      .post(
        this._attractionsIoApiUrl + '/installation',
        this._attractionsIoApiInstallationBody,
        config,
      )
      .toPromise()
      .then(value => {
        this._tempToken = value.data.token;
        return this._tempToken;
      });
  }

  protected async getData() {
    const token = await this.getToken();

    const headers = {
      'Authorization': 'Attractions-Io api-key="3acb983d-a451-4700-b607-aac8ab1bedee", installation-token="' + token + '"',
      'User-Agent': 'Avonturenpark/23 CFNetwork/1220.1 Darwin/20.3.0',
      'Occasio-Platform-Version': '14.4',
      'Occasio-Platform': 'iOS',
      'Occasio-App-Build': '23',
      'Content-Type': 'multipart/form-data; boundary=s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc',
      'Date': '2021-03-15',
    };

    const config: AxiosRequestConfig = {
      headers: headers,
      params: {
        'version': '2021-03-05T20:10:46%2B01:00',
      },
    };

    return await this.httpService
      .post(
        this._attractionsIoApiUrl + '/data',
        null,
        config,
      )
      .toPromise()
      .then((value) => {
        console.log(value);
        console.log(value.data);
      })
      .catch((reason: AxiosError) => {
        console.log(reason.response.data);
        console.log(reason.config.headers);
      });
  }

  public getFileItems(file: any): Poi[] {
    return file.Item.map((item: AttractionsIoItemInterface) => {
      let category: PoiCategory = this.getCategory(item.Category);

      const poi: Poi = {
        id: item._id + '',
        title: item.Name['en-GB'],
        description: item.Summary ? item.Summary['en-GB'] : undefined,
        category: category,
        original: item,
        minSize: item.MinimumHeightRequirement ? item.MinimumHeightRequirement * 100 : undefined,
        minSizeEscort: item.MinimumUnaccompaniedHeightRequirement ? item.MinimumUnaccompaniedHeightRequirement : undefined,
        maxSize: item.MaximumHeightRequirement ? item.MaximumHeightRequirement * 100 : undefined,
        minAge: item.MinimumAgeRequirement ?? undefined,
        maxAge: item.MaximumAgeRequirement ?? undefined,
      };

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
