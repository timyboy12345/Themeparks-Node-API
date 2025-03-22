import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { ConfigService } from '@nestjs/config';
import { Poi } from '../../_interfaces/poi.interface';
import { ParcAsterixTransferService } from './parc-asterix-transfer/parc-asterix-transfer.service';
import { HttpService } from '@nestjs/axios';
import { LocaleService } from '../../_services/locale/locale.service';
import * as Sentry from '@sentry/node';
import * as fs from 'fs';
import * as unzipper from 'unzipper';
import { ThroughPoisThemeParkService } from '../../_services/themepark/through-pois-theme-park.service';

@Injectable()
export class ParcAsterixService extends ThroughPoisThemeParkService {
  private readonly _parcAsterixApiUrl: string;

  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService,
              private readonly parcAsterixTransferService: ParcAsterixTransferService,
              private readonly localeService: LocaleService,
              private readonly logger: Logger) {
    super();

    this._parcAsterixApiUrl = this.configService.get('PARC_ASTERIX_API_URL');
  }

  getInfo(): ThemePark {
    return {
      id: 'parc_asterix',
      name: 'Parc Asterix',
      description: 'Parc Astérix is een Frans attractiepark in Plailly, ongeveer 35 km ten noorden van Parijs. Het is gebaseerd op de stripverhalen van Asterix en Obelix van Albert Uderzo en René Goscinny. Het park werd in 1989 geopend en is erg populair. Het complex omvat het pretpark en een themahotel: het "Hotel des Trois Hiboux".',
      image: 'https://www.parcasterix.fr/sites/default/files/styles/attraction_detail/public/images/attractions/haut/attraction-toutatis.jpg.webp?itok=i3Y2COMX',
      countryCode: 'fr',
      parkType: ParkType.THEMEPARK,
      location: {
        lat: 49.136041,
        lng: 2.572768,
      },
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: false,
      supportsRides: true,
      supportsShowTimes: false,
      supportsShows: true,
      supportsPoiLocations: true,
      supportsShops: true,
      supportsShopOpeningTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: false,
      supportsAnimals: false,
      supportsTranslations: false,
      textType: 'MARKDOWN',
      supportsEvents: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    const folder = `${process.cwd()}/storage/parc-asterix`;
    const file = 'parc-asterix.zip';

    const storageFolder = `${process.cwd()}/storage`;
    if (!fs.existsSync(`${process.cwd()}/storage`)) {
      fs.mkdirSync(`${process.cwd()}/storage`);
    }

    // TODO: Add a system that invalidates old information (fs.stat or fs.statSync?)
    const fileExists = fs.existsSync(`${folder}/unpackage/pax_en.sqlite`);
    if (!fileExists) {
      this.logger.debug(' - Downloading Files');

      // TODO: Unpackage happens before download is complete
      const download = await this.downloadZip(folder, file);
      const unpackage = await this.unpackageZip(folder, file);
    }

    switch (this.getLocale()) {
      case 'fr':
        return this.getPoisFromFile(`${folder}/unpackage/pax_fr.sqlite`);
      case 'nl':
        return this.getPoisFromFile(`${folder}/unpackage/pax_nl.sqlite`);
      case 'es':
        return this.getPoisFromFile(`${folder}/unpackage/pax_es.sqlite`);
      default:
        return this.getPoisFromFile(`${folder}/unpackage/pax_en.sqlite`);
    }
  }

  private async downloadZip(downloadFolder: string, fileName: string) {
    this.logger.debug(' - Staring download');

    if (!fs.existsSync(downloadFolder)) {
      fs.mkdirSync(downloadFolder);
    }

    const baseUrl = this._parcAsterixApiUrl;

    this.logger.debug(' -  Fetching ZIP url');

    const fileUrl = await this.httpService.get(`${baseUrl}`, {
      params: {
        'operationName': 'offlinePackageLast',
        'variables': {},
        'extensions': {
          persistedQuery: {
            version: 1,
            sha256Hash: '309702a5c744f3389a4cc971c589dfb351d4548701899f6335c17f8095d94982',
          },
        },
      },
    })
      .toPromise()
      .then((r) => {
        if (!r.data.data.offlinePackageLast) {
          Sentry.captureException('Failed to fetch Parc Asterix ZIP url');
          throw new InternalServerErrorException('Could not fetch Parc Asterix ZIP url: not present');
        }

        return r.data.data.offlinePackageLast.url;
      })
      .catch((e) => {
        console.error(e);
        Sentry.captureException(e);
        throw new InternalServerErrorException('Could not download Parc Asterix POI zip file');
      });

    this.logger.debug('  - Fetching file from ' + fileUrl);

    const logger = this.logger;

    return await this.httpService.request({
      url: fileUrl,
      responseType: 'arraybuffer',
    })
      .toPromise()
      .then(value => {
        return fs.writeFile(`${downloadFolder}/${fileName}`, value.data, function(err) {
          logger.debug('  - ZIP has been fetched');

          if (err) {
            logger.error(err);
            Sentry.captureException(err);
            return Promise.reject(err);
          } else {
            logger.debug(' - Returning resolve');
            return Promise.resolve();
          }
        });
      })
      .catch(reason => {
        Sentry.captureException(reason);
        console.error(reason);
        return Promise.reject(reason);
      });
  }

  private async unpackageZip(downloadFolder: string, fileName: string) {
    this.logger.debug(' - Unzipping zip');

    return new Promise((resolve) => {
      fs.createReadStream(`${downloadFolder}/${fileName}`)
        .pipe(unzipper.Extract({ path: `${downloadFolder}/unpackage` }))
        .on('close', () => {
          return Promise.resolve();
        })
        .on('error', (e) => {
          Sentry.captureException(e);
          console.error(e);
          return Promise.reject();
        })
        .on('end', () => {
          return Promise.reject();
        });
    });
  }

  private async getPoisFromFile(filePath: string) {
    const Database = require('better-sqlite3');
    let db = new Database(filePath, { fileMustExist: true });

    let pois = [];

    const rides: any[] = db.prepare('SELECT * FROM attractions').all();
    pois = pois.concat(this.parcAsterixTransferService.transferRidesToPois(rides));

    const restaurants: any[] = db.prepare('SELECT * FROM restaurants').all();
    pois = pois.concat(this.parcAsterixTransferService.transferRestaurantsToPois(restaurants));

    const stores: any[] = db.prepare('SELECT * FROM stores').all();
    pois = pois.concat(this.parcAsterixTransferService.transferShopsToPois(stores));

    // TODO: Fix hotels
    // const hotels: any[] = db.prepare('SELECT * FROM hotels').all();
    // pois = pois.concat(this.parcAsterixTransferService.transferHotelsToPois(hotels));

    db.close();

    return pois;
  }

  private getLocale(): string {
    switch (this.localeService.getLocale()) {
      case 'fr':
        return 'fr';
      case 'nl':
        return 'nl';
      case 'es':
        return 'es';
      default:
        return 'en';
    }
  }
}
