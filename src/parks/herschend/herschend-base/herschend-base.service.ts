import { HttpService, Injectable, InternalServerErrorException, NotImplementedException } from '@nestjs/common';
import { ThemeParkService } from '../../../_services/themepark/theme-park.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { HerschendResponseItemInterface } from '../interfaces/herschend-response.interface';
import { HerschendTransferService } from '../herschend-transfer/herschend-transfer.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HerschendBaseService extends ThemeParkService{
  constructor(private readonly httpService: HttpService,
              private readonly herschendTransferService: HerschendTransferService,
              private readonly configService: ConfigService) {
    super();
  }

  protected getParkId(): number {
    throw new NotImplementedException();
  }

  async getRides(): Promise<Poi[]> {
    return this.request()
      .then(value => this.herschendTransferService.transferRidesToPois(value));
  }

  private async request(): Promise<HerschendResponseItemInterface[]> {
    const baseUrl = this.configService.get('HERSCHEND_API_URL');
    const url = `${baseUrl}/waitTimes/${this.getParkId()}`;

    return this.httpService.get(url)
      .toPromise()
      .then(value => value.data)
      .catch(reason => {
        console.error(reason);
        throw new InternalServerErrorException();
      });
  }
}
