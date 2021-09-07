import { HttpService, Injectable, InternalServerErrorException, NotImplementedException } from '@nestjs/common';
import { Poi } from '../../../_interfaces/poi.interface';
import { encode } from 'js-base64';
import { ConfigService } from '@nestjs/config';
import { CedarfairBaseResponseInterface } from '../interfaces/cedarfair-base-response.interface';
import { CedarfairTransferService } from '../cedarfair-transfer/cedarfair-transfer.service';
import { ThroughPoisThemeParkService } from '../../../_services/themepark/through-pois-theme-park.service';
import * as Sentry from '@sentry/node';

@Injectable()
export class CedarfairBaseService extends ThroughPoisThemeParkService {
  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService,
              private readonly transferService: CedarfairTransferService) {
    super();
  }

  protected getParkId(): string {
    throw new NotImplementedException();
  }

  async getPois(): Promise<Poi[]> {
    return this.getData()
      .then(data => this.transferService.transferPoisToPois(data));
  }

  private async getData(): Promise<CedarfairBaseResponseInterface[]> {
    const id = this.getParkId();
    const baseUrl = this.configService.get('CEDAR_FAIR_API_URL');
    const url = `${baseUrl}/venue/${id}/poi/all`;

    const secretToken = this.configService.get('CEDAR_FAIR_API_TOKEN');
    const token = encode(secretToken);

    const headers = {
      'Authorization': `Basic ${token}`,
    };

    return this.httpService.get<CedarfairBaseResponseInterface[]>(url, { headers: headers })
      .toPromise()
      .then(value => value.data)
      .catch(reason => {
        console.error(reason);
        Sentry.captureException(reason);
        throw new InternalServerErrorException();
      });
  }
}
