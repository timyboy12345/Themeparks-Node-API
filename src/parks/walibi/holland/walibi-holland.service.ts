import { Injectable } from '@nestjs/common';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import {
  CompagnieDesAlpesBaseService,
} from '../../compagnie-des-alpes/compagnie-des-alpes-base/compagnie-des-alpes-base.service';
import { ThemeParkEvent } from '../../../_interfaces/park-event.interface';
import { EventCategory } from '../../../_interfaces/event.category';

@Injectable()
export class WalibiHollandService extends CompagnieDesAlpesBaseService {
  getInfo(): ThemePark {
    return {
      id: 'walibi-holland',
      name: 'Walibi Holland',
      description: 'Walibi Holland is een attractiepark, gelegen in Biddinghuizen in de Nederlandse provincie Flevoland. Voorheen heette dit park Walibi World, daarvoor Six Flags Holland, daarvoor Walibi Flevo, terwijl het park startte als Flevohof.',
      countryCode: 'nl',
      image: 'https://www.walibi.nl/adobe/dynamicmedia/deliver/dm-aid--49191dcc-8407-43ab-8177-012eac58440f/attractie-untamed-12.jpg?preferwebp=true&quality=85',
      parkType: ParkType.THEMEPARK,
      location: {
        lat: 52.44020062282858,
        lng: 5.76276265766736,
      },
    };
  }

  getParkCode(): string {
    return 'who';
  }

  getBaseUrl(): string {
    return 'https://www.walibi.nl';
  }

  getRealTimeURL(): string {
    return 'https://www.walibi.nl/api/who/waitingtimes.v1.json';
  }

  getLocaleCode(l: string): string {
    switch (l) {
      // case 'fr':
      //   return 'fr';
      default:
        return 'nl';
    }
  }

  getApiKey(): string {
    return 'e0fe3a8d975b-who';
  }

  supportsLiveWaitTimes(): boolean {
    return true;
  }

  supportsShows(): boolean {
    return true;
  }

  supportsEvents(): boolean {
    return true;
  }

  async getEvents(): Promise<ThemeParkEvent[]> {
    const pois = await this
      .getPois()
      .then((r) => r.filter((p) => p.eventCategory !== undefined));

    return [{
      name: 'Halloween Fright Nights',
      image: 'https://www.looopings.nl/img/foto/24/0201langhfn1.jpg',
      subTitle: 'Cheers to Fears',
      slug: 'halloween-fright-nights',
      type: EventCategory.HALLOWEEN,
      pois: pois,
    }, {
      name: 'Halloween Spooky Days',
      image: 'https://www.walibi.nl/adobe/dynamicmedia/deliver/dm-aid--e1890ec9-2862-4316-ba42-6183f2c784a9/kv-hsd-met-pay-off-horizontaal.jpg?preferwebp=true&quality=85',
      // subTitle: 'Cheers to Fears',
      type: EventCategory.HALLOWEEN,
      slug: 'halloween-spooky-days',
      pois: pois,
    }];
  }
}
