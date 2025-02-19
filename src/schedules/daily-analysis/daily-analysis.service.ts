import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ParksService } from '../../_services/parks/parks.service';
import { WaitTimeService } from '../../database/wait-time/wait-time.service';
const {Storage} = require('@google-cloud/storage');
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
      keyFilename: 'google-cloud-key.json'
    });
  }

  @Cron(new Date(Date.now() + 10 * 1000))
  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async handleCron() {
    this.logger.debug('Started analyzing and saving wait times')

    const allParks = await this.parksService.getParks();
    const filteredParks = allParks.filter((p) => p.getSupports().supportsRideWaitTimesHistory);

    this.logger.debug(` - Found ${filteredParks.length} parks that can be analyzed`)

    const bucketName = 'themeparks-data.arendz.nl';

    for (let i = filteredParks.length - 1; i >= 0; i--) {
      const park = filteredParks[i];
      const date = moment().subtract(1, 'day');

      const folder = this.configService.get('ENVIRONMENT') === 'production' ? 'history' : 'history-dev';
      const file = this.storage.bucket(bucketName).file(`${folder}/daily/${park.getInfo().id}/${date.format('YYYY-MM-DD')}.json`);

      const start = date.startOf('day');
      const end = date.endOf('day');

      this.logger.debug(` - Fetching for ${park.getInfo().name} for ${start.format()} to ${end.format()}`)

      const data = await this.waitTimeService.findByParkIdAndDateRange('efteling', start.format(), end.format())
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
          })
        })

        await file.save(JSON.stringify(parsed), {
          resumable: false, // This is important!
          contentType: "application/json"
        })

        this.logger.debug(`  - Saved to ${file.cloudStorageURI.href}`);
      }
    }
  }
}
