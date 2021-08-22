import { Injectable } from '@nestjs/common';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { Poi } from '../../_interfaces/poi.interface';
import * as DippieDoeRidesData from './data/dippiedoe-rides.json';
import { PoiCategory } from '../../_interfaces/poi-categories.enum';
import { DippieDoeRide } from './interfaces/dippie-doe-ride.interface';
import { ThroughPoisThemeParkService } from '../../_services/themepark/through-pois-theme-park.service';

@Injectable()
export class DippieDoeService extends ThroughPoisThemeParkService {
  getInfo(): ThemePark {
    return {
      id: 'dippiedoe',
      name: 'DippieDoe',
      description: 'DippieDoe is een pretpark gelegen bij recreatiegebied Aquabest, Best, Noord-Brabant, Nederland. De attracties in het park staan zowel binnen als buiten. Het park richt zich vooral op families met kinderen tot 12 jaar. Attractiepark DippieDoe is het attractiepark in Brabant voor kinderen t/m 12 jaar!',
      image: 'https://media.insiders.nl/vib/files/image/dolle-dobber_1770787802.jpeg',
      countryCode: 'nl',
      parkType: ParkType.THEMEPARK,
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsPoiLocations: true,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: false,
      supportsRideWaitTimes: false,
      supportsRides: true,
      supportsShowTimes: false,
      supportsShows: false,
      supportsShops: false,
      supportsShopOpeningTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: false,
      supportsAnimals: true,
    };
  }

  async getPois(): Promise<Poi[]> {
    return DippieDoeRidesData.map((ride: DippieDoeRide) => {
      const r: Poi = {
        id: ride.id,
        title: ride.title,
        description: ride.description,
        category: PoiCategory.ATTRACTION,
        image_url: ride.image_url,
        images: [ride.image_url],
        original: ride,
        area: ride.area,
        minAge: ride.minAge,
        maxAge: ride.maxAge,
        minSize: ride.minLengthAlone || ride.minLength,
        maxSize: ride.maxLength,
        minSizeWithEscort: ride.minLength,
        location: {
          lat: ride.lat,
          lng: ride.lng,
        },
      };

      return r;
    });
  }
}
