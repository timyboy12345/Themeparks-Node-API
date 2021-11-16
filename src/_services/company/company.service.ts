import { Injectable, NotImplementedException } from '@nestjs/common';
import { ThemePark } from '../../_interfaces/park.interface';
import { ThemeParkService } from '../themepark/theme-park.service';

@Injectable()
export class CompanyService {
  /**
   * Return an array with the info of each park
   */
  public async getParks(): Promise<ThemePark[]> {
    return this.getParkServices()
      .then(value => value.map(s => s.getFullInfo()));
  }

  /**
   * Return a list of all parks associated with this company
   */
  public async getParkServices(): Promise<ThemeParkService[]> {
    throw new NotImplementedException('Could not get all park services for this company');
  }
}
