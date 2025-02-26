import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ParksService } from '../../_services/parks/parks.service';
import { WaitTimeService } from '../../database/wait-time/wait-time.service';
import * as moment from 'moment-timezone';
import { PushService } from '../../database/push/push.service';
import { NotificationsService } from '../../_services/notifications/notifications.service';
import { PoiStatus } from '../../_interfaces/poi.interface';
import * as Sentry from '@sentry/node';

@Injectable()
export class WaitTimeScheduleService {
  private readonly logger = new Logger(WaitTimeScheduleService.name);

  constructor(private readonly parksService: ParksService,
              private readonly waitTimeService: WaitTimeService,
              private readonly pushService: PushService,
              private readonly notificationsService: NotificationsService) {
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    this.logger.debug('Parks:');

    const rideWaitData: {
      minutes: number,
      parkId: string,
      poiId: string,
      poiStatus: PoiStatus,
      poiTitle: string
    }[] = [];

    this.parksService.getParks()
      .then(async (parks) => {
        for (let i = 0; i < parks.length; i++) {
          const park = parks[i];

          if (park.getSupports().supportsRideWaitTimesHistory) {
            this.logger.debug(` - ${park.getInfo().name} supports wait times`);

            let date;

            if (park.getInfo().timezone) {
              date = moment().tz(park.getInfo().timezone).format('YYYY-MM-DD HH:mm:ss');
            } else {
              date = moment().format('YYYY-MM-DD HH:mm:ss');
            }

            await park.getRides()
              .then(async (rides) => {
                for (let r = 0; r < rides.length; r++) {
                  const ride = rides[r];

                  rideWaitData.push({
                    parkId: park.getInfo().id,
                    poiId: ride.id,
                    minutes: ride.currentWaitTime,
                    poiTitle: ride.title,
                    poiStatus: ride.state,
                  });

                  const state = ride.state ? ride.state.toLowerCase() : (ride.currentWaitTime ? 'open' : 'closed')

                  await this.waitTimeService.insert({
                    ride_id: ride.id,
                    wait: ride.currentWaitTime,
                    status: state,
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
        this.logger.debug(' - Started Push Message service');

        await this.sendPushMessages(rideWaitData);
      })
      .catch(reason => {
        this.logger.error(`Could not retrieve parks: ${reason}`);
        console.error(reason)
        Sentry.captureException(reason);
      });
  }

  public async sendPushMessages(rideWaitData: any): Promise<void> {
    for (let i = rideWaitData.length - 1; i >= 0; i--) {
      const parkId = rideWaitData[i].parkId;
      const poiId = rideWaitData[i].poiId;
      const poiTitle = rideWaitData[i].poiTitle;
      const minutes = rideWaitData[i].minutes;
      const state = rideWaitData[i].poiStatus;

      const pushMessages = await this.pushService.getAllForParkAndPoi(parkId, poiId);

      if (pushMessages.length === 0) {
        continue;
      }

      this.logger.debug(`  - Found ${pushMessages.length} for ${parkId}/${poiId} (${minutes} minutes / ${state})`);

      for (let m = pushMessages.length - 1; m >= 0; m--) {
        const message = pushMessages[m];

        // TODO: Should this also check if `state === PoiStatus.OPEN`?
        // TODO: This system sends a secondary message five minutes after a closed ride opens again, is this desirable?
        if (state === PoiStatus.OPEN) {
          // If the ride was previously down for this user, send a custom message
          // specifying the ride is open once again
          if (message.lastStatus && message.lastStatus !== PoiStatus.OPEN) {
            this.logger.debug(`   - Sending status to open message to ${message.user.id}`);

            await this.notificationsService.sendStatusUpdateNotification([message.user.id], poiTitle, state, message.minutes, minutes)
              .then((d) => {
                this.pushService.update(message.id, {
                  statusSince: new Date(),
                  lastStatus: state,
                  minutes: message.minutes,
                  downUp: message.downUp,
                });
              })
              .catch((e) => {
                this.logger.error('  - Error sending Push Messages');
                this.logger.error(e);
              });
          } else if (minutes !== undefined && message.minutes >= minutes) {
            this.logger.debug(`   - Sending wait time message to ${message.user.id}`);

            await this.notificationsService.sendWaitTimeNotification([message.user.id], poiTitle, minutes)
              .then((d) => {
                this.logger.debug(`   - Send 1 message`);

                // TODO: Maybe we should check errors better
                this.pushService.delete(message.id, message.user);
              })
              .catch((e) => {
                this.logger.error('  - Error sending Push Messages');
                this.logger.error(e);
              });
          }
        } else if ((state === PoiStatus.CLOSED || state === PoiStatus.DOWN) && message.lastStatus !== state) {
          this.logger.debug(`   - Sending ${state} message to ${message.user.id}`);

          await this.notificationsService.sendStatusUpdateNotification([message.user.id], poiTitle, state, message.minutes, minutes)
            .then((d) => {
              this.logger.debug(`   - Send 1 messages`);

              this.pushService.update(message.id, {
                statusSince: new Date(),
                lastStatus: state,
                minutes: message.minutes,
                downUp: message.downUp,
              });
            })
            .catch((e) => {
              this.logger.error('  - Error sending Push Messages');
              this.logger.error(e);
            });
        } else {
          this.logger.debug(`   - No cases found for ${message.id} (${message.minutes} / ${message.downUp} / ${message.lastStatus} - ${message.statusSince})`);
        }
      }
    }

    this.logger.debug(' - Done with Push Messages');
  }
}
