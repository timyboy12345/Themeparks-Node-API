import { Injectable } from '@nestjs/common';
import { CedarfairBaseService } from '../cedarfair-base/cedarfair-base.service';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class DorneyParkService extends CedarfairBaseService {
  protected getParkId(): string {
    return 'CF_DP';
  }

  getInfo(): ThemePark {
    return {
      parkType: ParkType.THEMEPARK,
      countryCode: 'us',
      timezone: '',
      id: 'dorney-park',
      name: 'Dorney Park',
      description: 'Dorney Park & ​​Wildwater Kingdom is een Amerikaans amusement- en waterpark dat eigendom is van en wordt beheerd door Cedar Fair en gelegen is tussen Allentown en Emmaus, Pennsylvania. Het park beschikt over zeven achtbanen, andere attracties voor volwassenen en kinderen, en een waterpark, Wildwater Kingdom.',
      image: 'https://media.glassdoor.com/l/c0/c7/bf/2d/wildwater-kingdom-and-amp-talon.jpg',
      company: Company.CEDAR_FAIR
    }
  }
}
