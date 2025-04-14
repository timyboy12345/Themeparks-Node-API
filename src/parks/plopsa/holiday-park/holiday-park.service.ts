import { Injectable } from '@nestjs/common';
import { PlopsaBaseService } from '../plopsa-base/plopsa-base.service';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class HolidayParkService extends PlopsaBaseService{
  getInfo(): ThemePark {
    return {
      id: 'holiday-park',
      name: 'Holiday Park',
      description: 'Holiday Park is een attractiepark gelegen in Haßloch in de Duitse deelstaat Rijnland-Palts. Het maakt sinds 2010 deel uit van de pretparken van de Plopsa-groep.',
      image: 'https://www.plopsa.com/sites/default/files/styles/io_600/public/images/2025-03/HPH_BigFMExpeditionGeforce_Hero.jpg.webp?itok=qmh0aJ4O',
      countryCode: 'de',
      parkType: ParkType.THEMEPARK,
      location: {
        lat: 49.318498726,
        lng: 8.290165506,
      },
    };
  }

  getParkSlug(): string {
    return 'holiday-park';
  }
}
