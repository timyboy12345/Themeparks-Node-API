import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AttractionsIoThemeParkService } from './attractions-io-theme-park.service';
import { Poi } from '../../_interfaces/poi.interface';
import { TranslatedAttractionsIoItemInterface } from '../../_interfaces/attractions-io/translated-attractions-io-item.interface';
import { PoiCategory } from '../../_interfaces/poi-categories.enum';
import * as fs from 'fs';

@Injectable()
export class LocalizedAttractionsIoThemeParkService extends AttractionsIoThemeParkService {
  async getPois(): Promise<Poi[]> {
    return new Promise(async (resolve, reject) => {
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
      //   resolve(this.transform(data));
      // });
    });
  }

  public transform(file: any, default_locale = ' en-GB'): Poi[] {
    return file.Item.map((item: TranslatedAttractionsIoItemInterface) => {
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
}
