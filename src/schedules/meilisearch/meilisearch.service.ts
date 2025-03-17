import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { MeiliSearch } from 'meilisearch';
import { ConfigService } from '@nestjs/config';
import { ParksService } from '../../_services/parks/parks.service';
import { Poi } from '../../_interfaces/poi.interface';
import { PoiCategory } from '../../_interfaces/poi-categories.enum';
import { ThemeParkService } from '../../_services/themepark/theme-park.service';
import * as Sentry from '@sentry/node';


@Injectable()
export class MeilisearchService {
  private readonly logger = new Logger(MeilisearchService.name);

  constructor(private configService: ConfigService,
              private parksService: ParksService) {
  }

  // @Cron(new Date(Date.now() + 10 * 1000))
  @Cron(CronExpression.EVERY_WEEK)
  private async importMeiliSearch() {
    this.logger.debug('Started importing POIs to MeiliSearch');

    const client = new MeiliSearch({
      host: this.configService.get('MEILISEARCH_URL'),
      apiKey: this.configService.get('MEILISEARCH_KEY'),
    });

    const parks = await this.parksService.getParks();
    this.logger.debug(` - Found ${parks.length} parks`);
    this.logger.debug(` - Deleting all data from MeiliSearch`);

    await client.index('pois').deleteAllDocuments()
      .catch((e) => {
        Sentry.captureException("MeiliSearch indexation failed");
        // Sentry.captureException(e);
        // this.logger.error(e);
        throw new Error('Stopped MeiliSearch execution due to error');
      });

    this.logger.debug(` -  Deleted all MeiliSearch data, waiting 30 seconds for process to finish`);

    setTimeout(() => this.importParks(client, parks), 1000 * 30);
  }

  private async importParks(client: MeiliSearch, parks: ThemeParkService[]) {
    this.logger.debug(' - Started import process');

    let pois = [];
    for (let i = 0; i < parks.length; i++) {
      this.logger.debug(` - Fetching rides for ${parks[i].getInfo().name}`);

      const ps = await parks[i].getPois()
        .catch((e) => {
          this.logger.error(e);
          Sentry.captureException(e);
          return [];
        });

      this.logger.debug(`  - Fetched ${ps.length} pois for ${parks[i].getInfo().name}`);

      pois = pois.concat(ps.map((p: Poi) => {
        return {
          id: parks[i].getInfo().id + '_' + p.id.toLowerCase().replace(/[^0-9a-z\-]/gi, ''),
          title: p.title,
          subTitle: p.subTitle,
          image: p.image_url,
          description: p.description,
          fullSlug: this.getSlug(parks[i], p),
          parkId: parks[i].getInfo().id,
          parkName: parks[i].getInfo().name,
          poiId: p.id,
          locale: 'en-US',
        };
      }));

      this.logger.debug('  - Added POIs to list');
    }

    this.logger.debug(` - Found ${pois.length} POIs`);

    await client.index('pois').addDocuments(pois)
      .then((res) => this.logger.debug(JSON.stringify(res)))
      .catch((e) => {
        Sentry.captureException(e);
        this.logger.error(e);
      });

    this.logger.debug(` - Successfully imported ${pois.length} POIs`);
  }

  private getSlug(park: any, poi: Poi) {
    switch (poi.category) {
      case PoiCategory.ATTRACTION:
        return `https://themeparkplanner.com/parks/${park.getInfo().id}/rides/${poi.id}`;
      case PoiCategory.SHOW:
        return `https://themeparkplanner.com/parks/${park.getInfo().id}/shows/${poi.id}`;
      case PoiCategory.RESTAURANT:
        return `https://themeparkplanner.com/parks/${park.getInfo().id}/restaurants/${poi.id}`;
      case PoiCategory.ANIMAL:
        return `https://themeparkplanner.com/parks/${park.getInfo().id}/animals/${poi.id}`;
      case PoiCategory.SHOP:
        return `https://themeparkplanner.com/parks/${park.getInfo().id}/shops/${poi.id}`;
      default:
        return null;
    }
  }
}
