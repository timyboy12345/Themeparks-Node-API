import { HttpService, Injectable, InternalServerErrorException, NotImplementedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { PoiCategory } from '../../_interfaces/poi-categories.enum';
import { AttractionsIoAppDetailsInterface } from '../../_interfaces/attractions-io/attractions-io-app-details.interface';
import { AioTransferServiceService } from './transfer-service/aio-transfer-service.service';
import { ThroughPoisThemeParkService } from '../themepark/through-pois-theme-park.service';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { Poi } from '../../_interfaces/poi.interface';
import * as fs from 'fs';

const unzipper = require('unzipper');

@Injectable()
export class AioThemeparkService extends ThroughPoisThemeParkService {
  private readonly _attractionsIoApiUrl: string;

  private _tempToken: string;

  constructor(protected readonly httpService: HttpService,
              protected readonly configService: ConfigService,
              private readonly transferService: AioTransferServiceService) {
    super();

    this._attractionsIoApiUrl = 'https://api.attractions.io/v1';
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
      supportsShowTimes: false,
      supportsRestaurantOpeningTimes: false,
      supportsPoiLocations: true,
      supportsShopOpeningTimes: false,
      supportsShops: true,
      supportsRides: true,
      supportsShows: true,
      supportsRestaurants: true,
      supportsRideWaitTimes: false,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsPois: true,
      supportsTranslations: false,
    };
  }

  public getInstallationDirectory(): string {
    return this.getInfo().id;
  }

  public getApiKey(): string {
    throw new NotImplementedException('Could not get API key');
  }

  public getInstallationRequestBody(): string {
    throw new NotImplementedException('Could not get installation request body');
  }

  private async getTempToken() {
    return this._tempToken ?? await this.getToken();
  }

  public getAppDetails(): AttractionsIoAppDetailsInterface {
    throw new NotImplementedException('Could not get app details');
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

  /**
   * Returns a redirect to the ZIP-file for the specific park
   * @protected
   */
  protected async getDataUrl(): Promise<any> {
    const token = await this.getTempToken();
    const settings = this.getAppDetails();

    const headers = {
      'Authorization': `Attractions-Io api-key="${this.getApiKey()}", installation-token="${token}"`,
      'Date': settings.latestUpdate,
      'User-Agent': settings.userAgent,
    };

    const config: AxiosRequestConfig = {
      headers: headers,
      params: {
        'version': settings.latestUpdate,
      },
      maxRedirects: 0,
    };

    return new Promise((resolve, reject) => {
    this.httpService
      .get(
        this._attractionsIoApiUrl + '/data',
        config,
      )
      .toPromise()
      .then(() => {
        // When the call is successful, a redirect status code was not given
        // This means something went wrong
        console.error('SUCCESS BUT ACTUALLY AN ERROR');
        reject();
      })
      .catch((reason: AxiosError) => {
        if (reason.response.status === 303) {
          const headers = reason.response.headers;
          resolve(headers.location);
          return;
        }

        console.error('FAILED');
        console.error(`${reason.response.status} / ${reason.response.statusText}`);
        console.error(reason.response.data);
        console.error(reason.response.headers);
        reject(reason);
      });
    })
  }

  /**
   * Download a zip folder from a specified URL
   * @param fileUrl
   * @param downloadLocation
   */
  protected async downloadZip(fileUrl: string, downloadLocation: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.httpService.request({
        url: fileUrl,
        responseType: 'arraybuffer',
      })
        .toPromise()
        .then(value => {
          if (!fs.existsSync(`${__dirname}/../../../storage`)) {
            fs.mkdirSync(`${__dirname}/../../../storage`)
          }

          if (!fs.existsSync(`${__dirname}/../../../storage/aio`)) {
            fs.mkdirSync(`${__dirname}/../../../storage/aio`)
          }

          fs.writeFile(downloadLocation, value.data, function(err) {
            if (err) {
              reject(err);
            } else {
              resolve(downloadLocation);
            }
          });
        })
        .catch(reason => {
          console.error(reason);
          reject(reason);
        });
    });
  }

  protected async parseZip(inputPath, outputPath): Promise<void> {
    return new Promise((resolve) => {
      fs.createReadStream(inputPath)
        .pipe(unzipper.Extract({ path: outputPath }))
        .on('close', () => {
          resolve();
        });
    });
  }

  public getCategory(category: number): PoiCategory {
    return PoiCategory.UNDEFINED;
  }

  public getDefaultLanguage(): string {
    return 'en-GB'
  }

  async getPois(): Promise<Poi[]> {
    const url = await this.getDataUrl()
      .then((value) => {
        return value;
      })
      .catch(reason => {
        console.error(reason);
      });

    const inputPath = `${__dirname}/../../../storage/aio/${this.getInstallationDirectory()}.zip`;
    const outputPath = `${__dirname}/../../../storage/aio/${this.getInstallationDirectory()}-output/`;

    const settingsExists = fs.existsSync(`${outputPath}/records.json`);

    if (!settingsExists) {
      await this.downloadZip(url, inputPath)
        .then(() => {
          console.log(`Zip file downloaded to ${inputPath}`);
        })
        .catch(reason => {
          console.error(reason);
          throw new InternalServerErrorException(reason);
        });

      await this.parseZip(inputPath, outputPath)
        .then(() => {
          console.log(`Files saved to ${outputPath}`);
        });
    }

    let rawData = fs.readFileSync(`${outputPath}/records.json`);
    let data = JSON.parse(rawData.toString());

    return this.transferService.transferDataObjectToPois(data, this.getCategory, this.getDefaultLanguage());
  }
}
