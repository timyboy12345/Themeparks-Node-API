import { Injectable, NotImplementedException } from '@nestjs/common';
import { ThemePark } from '../../_interfaces/park.interface';
import { ThemeParkService } from '../themepark/theme-park.service';

@Injectable()
export class CompanyService {
  public async getParks(): Promise<ThemePark[]> {
    throw new NotImplementedException("Could not get all parks for this company");
  }

  public async getParkServices(): Promise<ThemeParkService[]> {
    throw new NotImplementedException("Could not get all park services for this company");
  }
}
