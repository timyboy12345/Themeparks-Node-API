import { Injectable, InternalServerErrorException, NotImplementedException } from '@nestjs/common';
import { ThroughPoisThemeParkService } from '../../../_services/themepark/through-pois-theme-park.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';
import * as Sentry from '@sentry/node';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { PuyDeFouTransferService } from '../puy-de-fou-transfer/puy-de-fou-transfer.service';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';

@Injectable()
export class PuyDeFouGeneralService extends ThroughPoisThemeParkService {
  constructor(private httpService: HttpService,
              private transfer: PuyDeFouTransferService) {
    super();
  }

  // TODO: Check supports
  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
      supportsEvents: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: false,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsRides: false,
      supportsShopOpeningTimes: false,
      supportsShops: false,
      supportsShowTimes: false,
      supportsShows: true,
      supportsTranslations: false,
      textType: undefined,
    };
  }

  public getFileUrl(): string {
    throw new NotImplementedException('Could not find file URL for park');
  }

  public getInstallationDirectory(): string {
    return this.getInfo().id;
  }

  async getPois(): Promise<Poi[]> {
    const filePath = `${process.cwd()}/storage/puy-de-fou/${this.getInstallationDirectory()}.sqlite`;

    // TODO: Add a system that invalidates old information (fs.stat or fs.statSync?)
    const settingsExists = fs.existsSync(filePath);

    if (!settingsExists) {
      const url = this.getFileUrl();

      await this.downloadSqliteFile(url, filePath)
        .then(() => {
          console.log(`SQL file downloaded to ${filePath}`);
        })
        .catch(reason => {
          Sentry.captureException(reason);
          console.error(reason);
          throw new InternalServerErrorException("Could not download SQL file");
        });
    }

    const Database = require('better-sqlite3');
    let db = new Database(filePath, {fileMustExist: true});

    // TODO: Fix Language
    const lang = 'en_EN';
    const rows: any[] = db.prepare('SELECT * FROM VIEW_POI where language = ?').all(lang);
    const pois = this.transfer.transferPoisToPois(rows).filter((p) => p.category !== PoiCategory.UNDEFINED);

    const assets: any[] = db.prepare('SELECT * FROM VIEW_RELATED_ASSET where language = ?').all(lang);
    pois.forEach((poi) => {
      poi.images = assets.filter((s) => s.related_pid === poi.id).map((i) => i.uri)
    })

    db.close();

    return pois
  }

  /**
   * Download a zip folder from a specified URL
   * @param fileUrl
   * @param downloadLocation
   */
  protected async downloadSqliteFile(fileUrl: string, downloadLocation: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.httpService.request({
        url: fileUrl,
        responseType: 'arraybuffer',
      })
        .toPromise()
        .then(value => {
          if (!fs.existsSync(`${process.cwd()}/storage/puy-de-fou`)) {
            fs.mkdirSync(`${process.cwd()}/storage/puy-de-fou`);
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
}
