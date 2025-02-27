import { Injectable } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PoiStatus } from '../../_interfaces/poi.interface';

@Injectable()
export class NotificationsService {
  private _oneSignalAppId: string;
  private _oneSignalToken: string;

  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService) {
    this._oneSignalAppId = configService.get('ONESIGNAL_APP_ID');
    this._oneSignalToken = configService.get('ONESIGNAL_PRIVATE_TOKEN');
  }

  public sendWaitTimeNotification(userIds: string[], poiTitle: string, minutes: number) {
    return this.sendNotification(userIds, {
      'nl': 'Wachttijd Update',
      'en': 'Wait Time Update',
    }, {
      'nl': `De wachttijd van ${poiTitle} is ${minutes} minuten`,
      'en': `The waiting time of ${poiTitle} is ${minutes} mins`,
    });
  }

  public sendStatusUpdateNotification(userIds: string[], poiTitle: string, status: PoiStatus, pushMinutes: number, poiMinutes?: number) {
    switch (status) {
      case PoiStatus.OPEN:
        return this.sendNotification(userIds, {
          en: `${poiTitle} is open again!`,
          nl: `${poiTitle} is weer open!`,
        }, {
          en: poiMinutes ? `The ride opened with a wait of ${poiMinutes} minute wait` : 'We don\'t know what the current wait is though, we will update you once we do.',
          nl: poiMinutes ? `De attractie is geopend met een wachtrij van ${poiMinutes} minuten` : 'We weten momenteel niet wacht de wachttijd is, we sturen een bericht als dat wel zo is.',
        })
      case PoiStatus.DOWN:
        return this.sendNotification(userIds, {
          en: `${poiTitle} just went down`,
          nl: `${poiTitle} is zojuist kapot gegaan`,
        }, {
          en: 'We will notify you once the ride goes up again.',
          nl: 'We zullen je een bericht sturen als de attractie weer is opgestart.',
        });
      case PoiStatus.CLOSED:
        return this.sendNotification(userIds, {
          en: `${poiTitle} is momentarily closed`,
          nl: `${poiTitle} is momenteel gesloten`,
        }, {
          en: 'We will notify you once it opens.',
          nl: 'We zullen je een bericht sturen als hij weer open gaat.',
        });
      default:
        return this.sendNotification(userIds, {
          en: `The status of ${poiTitle} is unknown`,
          nl: `${poiTitle} is zojuist kapot gegaan`,
        }, {
          en: 'Click here what to see what you can do next. We\'ll update you once we know more.',
          nl: 'Klik hier om er meer over te lezen, we sturen je een bericht zodra we meer weten.',
        });
    }
  }

  private async sendNotification(userIds: string[], headings: object, messages: object) {
    return await this.httpService.post('https://api.onesignal.com/notifications', {
      'target_channel': 'push',
      'include_aliases': {
        'external_id': userIds,
      },
      'app_id': this._oneSignalAppId,
      'contents': messages,
      'headings': headings,
      'name': 'wait-time-update',
      'url': 'https://themeparkplanner.com/planner',
    }, {
      headers: {
        'Authorization': 'Bearer ' + this._oneSignalToken,
      },
    })
      .toPromise()
      .then((d) => {
        if (d.data.errors) {
          Sentry.captureException(d.data.errors);
        }

        return d.data;
      })
      .catch((e) => {
        throw e;
      });
  }
}
