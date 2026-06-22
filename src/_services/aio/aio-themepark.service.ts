import { Injectable, InternalServerErrorException, NotImplementedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { PoiCategory } from '../../_interfaces/poi-categories.enum';
import {
  AttractionsIoAppDetailsInterface,
} from '../../_interfaces/attractions-io/attractions-io-app-details.interface';
import { AioTransferServiceService } from './transfer-service/aio-transfer-service.service';
import { ThroughPoisThemeParkService } from '../themepark/through-pois-theme-park.service';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { Poi } from '../../_interfaces/poi.interface';
import * as fs from 'fs';
import { HttpService } from '@nestjs/axios';
import * as Sentry from '@sentry/node';

const unzipper = require('unzipper');

@Injectable()
export class AioThemeparkService extends ThroughPoisThemeParkService {
  private readonly _attractionsIoApiUrl: string;

  private _tempToken: string;

  // TODO: Some AIO parks offer localizations
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
      textType: 'UNDEFINED',
      supportsEvents: false,
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

    console.debug(` - AIO ${this.getInfo().name}: Fetching Token`);

    const config: AxiosRequestConfig = { headers: headers };

    return await this.httpService
      .post(
        this._attractionsIoApiUrl + '/installation',
        this.getInstallationRequestBody(),
        config,
      )
      .toPromise()
      .then(value => {
        console.debug(` - AIO ${this.getInfo().name}: API Key is ${value.data.token}`);
        this._tempToken = value.data.token;
        return this._tempToken;
      })
      .catch((reason: AxiosError) => {
        console.error(reason.response.data);
        Sentry.captureException(reason);
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
      'Occasio-Data-Version': settings.latestUpdate,
      'User-Agent': settings.userAgent,
    };

    const config: AxiosRequestConfig = {
      headers: headers,
      params: {
        'version': settings.latestUpdate,
      },
      maxRedirects: 0,
    };

    console.debug(` - AIO ${this.getInfo().name}: Fetching Data Package URL for ${settings.latestUpdate}`);

    return new Promise((resolve, reject) => {
      const attemptFetch = (retry = false) => {
        this.httpService
          .get(
            this._attractionsIoApiUrl + '/data',
            config,
          )
          .toPromise()
          .then(() => {
            if (!retry) {
              console.error(' - SUCCESS BUT ACTUALLY AN ERROR. Retrying after 5 seconds...');
              setTimeout(() => attemptFetch(true), 5000);
            } else {
              Sentry.captureException(`Error while fetching ${this.getInfo().name} ZIP`)
              console.error(' - SUCCESS BUT ACTUALLY AN ERROR after retry');
              reject();
            }
          })
          .catch((reason: AxiosError) => {
            if (reason.response.status === 303) {
              const headers = reason.response.headers;
              resolve(headers.location);
              return;
            }

            console.error(' - FAILED');
            console.error(`${reason.response.status} / ${reason.response.statusText}`);
            console.error(reason.response.data);
            console.error(reason.response.headers);
            Sentry.captureException(reason);
            reject(reason);
          });
      };

      attemptFetch();
    });
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
            fs.mkdirSync(`${__dirname}/../../../storage`);
          }

          if (!fs.existsSync(`${__dirname}/../../../storage/aio`)) {
            fs.mkdirSync(`${__dirname}/../../../storage/aio`);
          }

          fs.writeFile(downloadLocation, value.data, function(err) {
            if (err) {
              Sentry.captureException(err);
              reject(err);
            } else {
              resolve(downloadLocation);
            }
          });
        })
        .catch(reason => {
          Sentry.captureException(reason);
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
    return 'en-GB';
  }

  private formatDuration(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60) % 60;
    const hours = Math.floor(seconds / 3600) % 24;
    const days = Math.floor(seconds / 86400);

    return `${days} days, ${hours} hours and ${minutes} minutes`;
  }

  async getPois(): Promise<Poi[]> {
    const inputPath = `${__dirname}/../../../storage/aio/${this.getInstallationDirectory()}.zip`;
    const outputPath = `${__dirname}/../../../storage/aio/${this.getInstallationDirectory()}-output/`;

    const settingsExists = fs.existsSync(`${outputPath}/records.json`);
    const zipIsOld = settingsExists ? (Date.now() - fs.statSync(inputPath).mtime.getTime()) > 30 * 24 * 60 * 60 * 1000 : true;

    if (settingsExists) {
      const milliSeconds = Date.now() - fs.statSync(inputPath).mtime.getTime();
      const formattedDuration = this.formatDuration(milliSeconds);

      console.log(` - AIO ${this.getInfo().name}: Zip is ${formattedDuration} old, downloading: ${zipIsOld}`);
    }

    if (!settingsExists || zipIsOld) {
      const url = await this.getDataUrl()
        .then((value) => {
          return value;
        })
        .catch(reason => {
          console.error(reason);
          Sentry.captureException(reason);
          throw reason;
        });

      await this.downloadZip(url, inputPath)
        .then(() => {
          console.log(`Zip file downloaded to ${inputPath}`);
        })
        .catch(reason => {
          Sentry.captureException(reason);
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
