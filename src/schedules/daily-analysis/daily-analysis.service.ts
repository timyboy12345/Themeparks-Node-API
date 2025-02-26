import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ParksService } from '../../_services/parks/parks.service';
import { WaitTimeService } from '../../database/wait-time/wait-time.service';

const { Storage } = require('@google-cloud/storage');
import * as moment from 'moment';
import * as Sentry from '@sentry/node';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DailyAnalysisService {
  private readonly logger = new Logger(DailyAnalysisService.name);
  private storage: Storage;

  constructor(private readonly parksService: ParksService,
              private readonly waitTimeService: WaitTimeService,
              private readonly configService: ConfigService) {
    this.storage = new Storage({
      keyFilename: 'google-cloud-key.json',
    });
  }

  // @Cron(new Date(Date.now() + 10 * 1000))
  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async handleCron() {
    this.logger.debug('Started analyzing and saving wait times');

    const allParks = await this.parksService.getParks();
    const filteredParks = allParks.filter((p) => p.getSupports().supportsRideWaitTimesHistory);

    this.logger.debug(` - Found ${filteredParks.length} parks that can be analyzed`);

    const bucketName = 'themeparks-data.arendz.nl';

    for (let i = filteredParks.length - 1; i >= 0; i--) {
      const park = filteredParks[i];
      const date = moment().subtract(1, 'day');

      const folder = this.configService.get('ENVIRONMENT') === 'production' ? 'history' : 'history-dev';
      const file = this.storage.bucket(bucketName).file(`${folder}/daily/${park.getInfo().id}/${date.format('YYYY-MM-DD')}.json`);

      const start = date.clone().startOf('day');
      const end = date.clone().endOf('day');

      this.logger.debug(` - Fetching for ${park.getInfo().name} for ${start.format()} to ${end.format()}`);

      const data = await this.waitTimeService.findByParkIdAndDateRange(park.getInfo().id, start.format(), end.format())
        .catch((e) => {
          Sentry.captureException(e);
          console.error(e);
          return;
        });

      if (data) {
        const parsed = {};

        data.forEach((wt) => {
          if (!(wt.ride_id in parsed)) {
            parsed[wt.ride_id] = [];
          }

          parsed[wt.ride_id].push({
            status: wt.status,
            wait: wt.wait,
            date: wt.date,
          });
        });

        await file.save(JSON.stringify(parsed), {
          resumable: false, // This is important!
          contentType: 'application/json',
        });

        this.logger.debug(`  - Saved to ${file.cloudStorageURI.href}`);
      }
    }
  }

  // @Cron(new Date(Date.now() + 10 * 1000))
  @Cron('0 1 * * 1') // At 01:00 AM, Every Monday
  async handleWeeklyCron() {
    this.logger.debug('Started analyzing and saving wait times for last month');

    const allParks = await this.parksService.getParks();
    const filteredParks = allParks.filter((p) => p.getSupports().supportsRideWaitTimesHistory);

    this.logger.debug(` - Found ${filteredParks.length} parks that can be analyzed`);

    const bucketName = 'themeparks-data.arendz.nl';

    for (let i = filteredParks.length - 1; i >= 0; i--) {
      const park = filteredParks[i];
      const date = moment().subtract(1, 'week');

      const folder = this.configService.get('ENVIRONMENT') === 'production' ? 'history' : 'history-dev';
      const file = this.storage.bucket(bucketName).file(`${folder}/weekly/${park.getInfo().id}/${date.clone().startOf('isoWeek').format('YYYY-MM-DD')}.json`);

      const start = date.clone().subtract('4', 'week').startOf('isoWeek');
      const end = date.clone().endOf('isoWeek');

      this.logger.debug(` - Fetching for ${park.getInfo().name} for ${start.format()} to ${end.format()}`);

      const data = await this.waitTimeService.findByParkIdAndWeekRange(park.getInfo().id, start.format(), end.format())
        .catch((e) => {
          Sentry.captureException(e);
          console.error(e);
          return;
        });

      if (data) {
        const parsed = {};
        const averaged = {};

        data.forEach((wt: any) => {
          if (!(wt.ride_id in parsed)) {
            parsed[wt.ride_id] = [];
            averaged[wt.ride_id] = {};
          }

          parsed[wt.ride_id].push({
            average: parseInt(wt.average),
            hour: wt.hour,
            max: wt.max,
            min: wt.min,
            day: wt.day,
          });

          if (!averaged[wt.ride_id][wt.hour]) {
            averaged[wt.ride_id][wt.hour] = {
              max: 0,
              min: 0,
              hour: wt.hour,
              average: 0,
              count: 0,
            };
          }

          averaged[wt.ride_id][wt.hour].average += parseInt(wt.average);
          averaged[wt.ride_id][wt.hour].min += parseInt(wt.min);
          averaged[wt.ride_id][wt.hour].max += parseInt(wt.max);
          averaged[wt.ride_id][wt.hour].count += 1;
        });

        const avgs = {};
        for (const rideId of Object.keys(averaged)) {
          avgs[rideId] = [];

          for (const hour of Object.keys(averaged[rideId])) {
            const count = averaged[rideId][hour].count;

            avgs[rideId].push({
              hour: hour,
              max: averaged[rideId][hour].max / count,
              min: averaged[rideId][hour].min / count,
              average: averaged[rideId][hour].average / count,
              count: count,
            });
          }
        }

        await file.save(JSON.stringify({
          meta: {
            created: Date().toString(),
            start: start.format(),
            end: end.format(),
          }, byDay: parsed, averaged: avgs,
        }), {
          resumable: false, // This is important!
          contentType: 'application/json',
        });

        this.logger.debug(`  - Saved to ${file.cloudStorageURI.href}`);
      }
    }
  }
}
