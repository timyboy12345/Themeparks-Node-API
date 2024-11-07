import { Injectable } from '@nestjs/common';
import { ParquesReunidosParkService } from '../parques-reunidos-park.service';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkEvent } from '../../../_interfaces/park-event.interface';
import { EventCategory } from '../../../_interfaces/event.category';

@Injectable()
export class MovieParkService extends ParquesReunidosParkService {
  getInfo(): ThemePark {
    return {
      countryCode: 'de',
      description: 'Movie Park Germany is een attractiepark gelegen nabij de Duitse plaats Bottrop. In het park draait alles om de filmwereld. Veel attracties en themagebieden zijn hier ook naar gethematiseerd.',
      id: 'movie-park-germany',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Eingangspforte_moviepark.png/1200px-Eingangspforte_moviepark.png',
      location: { lat: 51.6205885, lng: 6.9722368 },
      name: 'Movie Park Germany',
      parkType: ParkType.THEMEPARK,
      timezone: 'Europe/Berlin',
    };
  }

  getStayEstablishment() {
    return 'mBv6';
  }

  getShowCategoryID(): string {
    return '19022';
  }

  getShowType(): 'new' | 'old' | 'unsupported' {
    return 'new';
  }

  supportsRestaurants(): boolean {
    return true;
  }

  halloweenCategories(): (string | number)[] {
    // 2023 and 2024 respectively
    return [48231, 62161];
  }

  saveWaitTimes(): boolean {
    return true;
  }

  async getEvents(): Promise<ThemeParkEvent[]> {
    return [{
      name: 'Halloween Horror Festival',
      slug: 'halloween-horror-festival',
      type: EventCategory.HALLOWEEN,
    }];
  }
}
