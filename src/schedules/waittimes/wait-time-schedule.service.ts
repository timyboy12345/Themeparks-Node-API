import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ParksService } from '../../_services/parks/parks.service';
import { WaitTimeService } from '../../database/wait-time/wait-time.service';
import * as moment from 'moment-timezone';

@Injectable()
export class WaitTimeScheduleService {
  private readonly logger = new Logger(WaitTimeScheduleService.name);

  constructor(private readonly parksService: ParksService,
              private readonly waitTimeService: WaitTimeService) {
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    this.logger.debug('Parks:');

    this.parksService.getParks()
      .then(async (parks) => {
        for (let i = 0; i < parks.length; i++) {
          const park = parks[i];

          if (park.getSupports().supportsRideWaitTimesHistory) {
            this.logger.debug(` - ${park.getInfo().name} supports wait times`);

            let date;

            if (park.getInfo().timezone) {
              date = moment().tz(park.getInfo().timezone).format('YYYY-MM-DD HH:mm:ss')
            } else {
              date = moment().format('YYYY-MM-DD HH:mm:ss');
            }

            await park.getRides()
              .then(async (rides) => {
                for (let r = 0; r < rides.length; r++) {
                  const ride = rides[r];

                  await this.waitTimeService.insert({
                    ride_id: ride.id,
                    wait: ride.currentWaitTime,
                    status: ride.currentWaitTime ? 'open' : 'closed',
                    park_id: park.getInfo().id,
                    date: date,
                  })
                    .catch(reason => {
                      this.logger.error(`Could not insert waitTime for ${ride.title}: ${reason}`);
                    });
                }

                this.logger.debug(`   - Inserted ${rides.length} rides for ${park.getInfo().name}`);
              })
              .catch(reason => {
                this.logger.error(`Could not retrieve rides for ${park.getInfo().name} (${park.getInfo().id}): ${reason}`);
              });
          }
        }

        this.logger.debug(` - Done importing wait times`);
      })
      .catch(reason => {
        this.logger.error(`Could not retrieve parks: ${reason}`);
      });
  }
}
