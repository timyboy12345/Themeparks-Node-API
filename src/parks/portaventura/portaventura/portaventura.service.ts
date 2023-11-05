import { Injectable } from '@nestjs/common';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ConfigService } from '@nestjs/config';
import { PortaVenturaTransferService } from '../portaventura-transfer/porta-ventura-transfer.service';
import { HttpService } from '@nestjs/axios';
import { PortaventuraServiceService } from '../portaventura-service/portaventura-service.service';
import { LocaleService } from '../../../_services/locale/locale.service';

@Injectable()
export class PortaventuraService extends PortaventuraServiceService {
  constructor(
    configService: ConfigService,
    httpService: HttpService,
    portaVenturaTransferService: PortaVenturaTransferService,
    localeService: LocaleService,
  ) {
    super(httpService, configService, portaVenturaTransferService, localeService);
  }

  getInfo(): ThemePark {
    return {
      id: 'portaventura',
      name: 'Portaventura',
      description: 'PortAventura World is een Spaans resort met een oppervlakte van 119 hectare gelegen in Salou en Vila-seca bestaand uit onder andere diverse hotels, twee attractieparken, een waterpark, een congrescentrum en een RV park.',
      countryCode: 'es',
      image: 'https://nl.letsgodigital.org/uploads/2017/11/pretpark-portaventura-salou.jpg',
      parkType: ParkType.THEMEPARK,
      location: {
        lat: 41.088257825687606,
        lng: 1.15730116599982,
      },
    };
  }

  getParkName(): string {
    return 'PortAventura Park';
  }
}
