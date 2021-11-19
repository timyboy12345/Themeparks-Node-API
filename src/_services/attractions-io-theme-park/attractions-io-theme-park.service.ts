import { HttpService, Injectable, InternalServerErrorException, NotImplementedException } from '@nestjs/common';
import { ThemeParkService } from '../themepark/theme-park.service';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { PoiCategory } from '../../_interfaces/poi-categories.enum';
import { AttractionsIoAppDetailsInterface } from '../../_interfaces/attractions-io/attractions-io-app-details.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';

const unzipper = require('unzipper');
import * as fs from 'fs';
import { Poi } from '../../_interfaces/poi.interface';

@Injectable()
export class AttractionsIoThemeParkService extends ThemeParkService {
  private readonly _attractionsIoApiUrl: string;

  private _tempToken: string;

  constructor(protected readonly httpService: HttpService,
              protected readonly configService: ConfigService) {
    super();

    this._attractionsIoApiUrl = 'https://api.attractions.io/v1';
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
      supportsShowTimes: false,
      supportsRestaurantOpeningTimes: false,
      supportsPoiLocations: false,
      supportsShopOpeningTimes: false,
      supportsShops: false,
      supportsRides: true,
      supportsShows: false,
      supportsRestaurants: false,
      supportsRideWaitTimes: false,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsPois: true,
    };
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

    return await this.httpService
      .get(
        this._attractionsIoApiUrl + '/data',
        config,
      )
      .toPromise()
      .then((value) => {
        // When the call is successful, a redirect status code was not given
        // This means something went wrong
        console.log('SUCCESS BUT ACTUALLY AN ERROR');
      })
      .catch((reason: AxiosError) => {
        if (reason.response.status === 303) {
          const headers = reason.response.headers;
          return headers.location;
        }

        console.error('FAILED');
        console.log(`${reason.response.status} / ${reason.response.statusText}`);
        console.log(reason.response.data);
        console.log(reason.response.headers);
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

  /**
   * Read the details for a specific park
   * @param location
   */
  protected readZip(location: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const chunks = [];

      fs.createReadStream(location)
        .pipe(unzipper.Parse())
        .on('entry', function(entry) {
          const fileName = entry.path;
          const type = entry.type; // 'Directory' or 'File'
          const size = entry.vars.uncompressedSize; // There is also compressedSize;

          if (fileName === 'records.json') {
            // entry.pipe(fs.createWriteStream(outputPath));
            entry.pipe(chunks);
          } else {
            entry.autodrain();
          }
        })
        .on('end', function() {
          resolve(Buffer.concat(chunks).toString('utf8'))
        });
    });
  }

  private streamToString (stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      stream.on('error', (err) => reject(err));
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    })
  }

  /**
   * Save details for a specific park
   * @param location
   * @param outputPath
   */
  protected saveDetails(location: string, outputPath: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {

    });
  }

  public getCategory(category: number): PoiCategory {
    return PoiCategory.UNDEFINED;
  }

  async getPois(): Promise<Poi[]> {
    const url = await this.getDataUrl();
    const zipLocation = await this.downloadZip(url, `${__dirname}/test.zip`)
      .then(value => {
        return value;
      })
      .catch(reason => {
        console.error(reason);
        throw new InternalServerErrorException(reason);
      });

    let jsonLocation;

    // await this.saveDetails(zipLocation, `${__dirname}/test-output.json`);

    await this.readZip(zipLocation)
      .then((location) => {
        console.log('File Unzipped');
        console.log(location);
        jsonLocation = location;
      })
      .catch(reason => {
        console.error(reason);
        throw new InternalServerErrorException(reason);
      });

    // fs.readFile(jsonLocation, (err, data) => {
    //   if (err) {
    //     console.error(err);
    //     throw new InternalServerErrorException(err);
    //   }
    //
    //   console.log(data);
    // });

    return [];
  }
}
