import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ParksService } from '../../_services/parks/parks.service';
import { WaitTimeService } from '../../database/wait-time/wait-time.service';

@Injectable()
export class WaitTimeScheduleService {
  private readonly logger = new Logger(WaitTimeScheduleService.name);

  constructor(private readonly parksService: ParksService,
              private readonly waitTimeService: WaitTimeService) {
  }

  @Cron(CronExpression.EVERY_MINUTE)
  handleCron() {
    this.logger.debug('Parks:');

    this.parksService.getParks()
      .then((parks) => {
        parks.forEach(park => {
          if (park.getSupports().supportsRideWaitTimes) {
            this.logger.debug(` - ${park.getInfo().name} supports wait times`);

            park.getRides()
              .then((rides) => {
                rides.forEach((ride) => {
                  this.waitTimeService.insert({
                    ride_id: ride.id,
                    wait: ride.currentWaitTime,
                    status: ride.currentWaitTime ? 'open' : 'closed',
                    park_id: park.getInfo().id,
                  });
                });
              })
              .catch(reason => {
                this.logger.error(`Could not retrieve rides: ${reason}`);
              });
          }
        });
      })
      .catch(reason => {
        this.logger.error(`Could not retrieve parks: ${reason}`)
      });
  }
}
