import { Injectable } from '@nestjs/common';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { PortaventuraBaseServiceService } from '../portaventura-base-service/portaventura-base-service.service';

@Injectable()
export class FerrariLandService extends PortaventuraBaseServiceService {
  getInfo(): ThemePark {
    return {
      id: 'ferrariland',
      name: 'Ferrari Land',
      description: 'Ferrari Land is een Spaans themapark gelegen in het resort PortAventura World in Salou. Het is gewijd aan Ferrari en Italië. Met een oppervlakte van 60.000 m² Ferrari Land ligt naast PortAventura Park, een pretpark uit 1995',
      countryCode: 'es',
      image: 'https://nl.letsgodigital.org/uploads/2018/03/pretpark-ferrari-land.jpg',
      parkType: ParkType.THEMEPARK,
      location: {
        lat: 41.084718452772584,
        lng: 1.1520460265615593,
      },
    };
  }

  getParkName() {
    return 'Ferrari Land';
  }
}
