import { HttpService, Injectable, NotImplementedException } from '@nestjs/common';
import { ThemePark } from '../../_interfaces/park.interface';
import { Poi } from '../../_interfaces/poi.interface';

@Injectable()
export class ThemeparkService {
  getInfo(): ThemePark {
    throw new NotImplementedException();
  }

  async getPois(): Promise<Poi[]> {
    throw new NotImplementedException();
  }

  async getRides(): Promise<Poi[]> {
    throw new NotImplementedException();
  }

  async getRide(id: string): Promise<Poi> {
    return await this.getPois()
      .then(value => {
        return value.find(poi => poi.id == id);
      });
  }
}
