import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ParksService } from '../../_services/parks/parks.service';
import { WaitTimeService } from '../../database/wait-time/wait-time.service';
import * as moment from 'moment-timezone';
import { PushService } from '../../database/push/push.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/node';

@Injectable()
export class WaitTimeScheduleService {
  private readonly logger = new Logger(WaitTimeScheduleService.name);
  private _oneSignalAppId: string;
  private _oneSignalToken: string;

  constructor(private readonly parksService: ParksService,
              private readonly waitTimeService: WaitTimeService,
              private readonly pushService: PushService,
              private readonly httpService: HttpService,
              private readonly configService: ConfigService) {
    this._oneSignalAppId = configService.get('ONESIGNAL_APP_ID');
    this._oneSignalToken = configService.get('ONESIGNAL_PRIVATE_TOKEN');
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    this.logger.debug('Parks:');

    const waitData: { parkId: string, poiId: string, minutes: number }[] = [];

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

                  waitData.push({
                    parkId: park.getInfo().id,
                    poiId: ride.id,
                    minutes: ride.currentWaitTime,
                  });

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
        this.logger.debug(' - Started Push Message service');


        for (let i = waitData.length - 1; i >= 0; i--) {
          const parkId = waitData[i].parkId;
          const poiId = waitData[i].poiId;
          const minutes = waitData[i].minutes;

          const pushMessages = await this.pushService.getAllForParkAndPoi(parkId, poiId);

          if (pushMessages.length > 0) {
            this.logger.debug(`  - Found ${pushMessages.length} for ${parkId}/${poiId}`);

            const aliases = pushMessages.filter((p) => minutes.toString() <= p.minutes.toString());
            const userIds = aliases.map((p) => p.user.id);

            if (aliases.length > 0) {
              this.logger.debug(`   - Sending ${aliases.length} messages (${userIds.join(', ')})`);

              this.httpService.post('https://api.onesignal.com/notifications', {
                'target_channel': 'push',
                'include_aliases': {
                  'external_id': userIds,
                },
                'app_id': this._oneSignalAppId,
                'contents': {
                  'nl': `De wachttijd van ${poiId} is ${minutes} minuten`,
                  'en': `The waiting time of ${poiId} is ${minutes} mins`,
                },
                'headings': {
                  'nl': 'Wachttijd Update',
                  'en': 'Wait Time Update',
                },
                'name': 'wait-time-update',
                'url': 'https://themeparkplanner.com/planner',
              }, {
                headers: {
                  'Authorization': 'Bearer ' + this._oneSignalToken,
                },
              })
                .toPromise()
                .then((d) => {
                  this.logger.debug(`   - Send ${aliases.length} messages`);

                  // TODO: Maybe we should check errors better
                  // if (!d.data.errors) {
                  for (let j = aliases.length - 1; j >= 0; j--) {
                    this.pushService.delete(aliases[j].id, aliases[j].user);
                  }
                  // }

                  if (d.data.errors) {
                    Sentry.captureException(d.data.errors);
                  }
                })
                .catch((e) => {
                  this.logger.error('  - Error send Push Messages');
                  this.logger.error(e);
                });
            } else {
              this.logger.debug(`   - No aliases (${pushMessages.map((p) => p.minutes).join(', ')}) with sufficient wait time (${minutes})`);
            }
          }
        }

        this.logger.debug(' - Done with Push Messages')
      })
      .catch(reason => {
        this.logger.error(`Could not retrieve parks: ${reason}`);
      });
  }
}
