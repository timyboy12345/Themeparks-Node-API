import { HttpService, Injectable } from '@nestjs/common';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { ThroughPoisThemeParkService } from '../../_services/themepark/through-pois-theme-park.service';
import { Poi } from '../../_interfaces/poi.interface';
import { BobbejaanlandApiResponseInterface } from './interfaces/bobbejaanland-api-response.interface';
import { PoiCategory } from '../../_interfaces/poi-categories.enum';
import { RideCategory } from '../../_interfaces/ride-category.interface';

@Injectable()
export class BobbejaanlandService extends ThroughPoisThemeParkService {
  constructor(private readonly httpService: HttpService) {
    super();
  }

  getInfo(): ThemePark {
    return {
      timezone: 'Europe/Amsterdam',
      name: 'Bobbejaanland',
      parkType: ParkType.THEMEPARK,
      image: 'https://www.bobbejaanland.be/content/dam/bjl/images/generals/KVDS-20190616-171430-NIKON%20D5-2.jpg',
      countryCode: 'be',
      description: 'Bobbejaanland is een pretpark in Lichtaart, gelegen tussen Herentals en Kasterlee in België, en is genoemd naar zijn oprichter Bobbejaan Schoepen. Het pretpark is gelegen in een moerassig gebied in de vallei van de Kleine Nete. Wikipedia',
      id: 'bobbejaanland',
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsRideWaitTimesHistory: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsRideWaitTimes: false,
      supportsRestaurants: true,
      supportsShows: false,
      supportsRides: true,
      supportsShops: true,
      supportsShopOpeningTimes: false,
      supportsPoiLocations: true,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsShowTimes: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    const url = 'https://www.bobbejaanland.be/content/bjl/be/het-park/ontdek/parkactiviteiten/attracties.searchservlet.json?type_primary=parques-reunidos%3Aattractions&type_secondary=&type=filters&lang=nl;';
    return this.httpService.get<BobbejaanlandApiResponseInterface>(url).toPromise().then(value => {
      return value.data.docs.map(poi => {
        const ride: Poi = {
          id: poi.id,
          title: poi.attractionName_s,
          category: PoiCategory.ATTRACTION,
          original: poi,
          description: poi.description_s,
          image_url: 'https://bobbejaanland.be' + poi.mainImage_s,
        };

        if (poi.intensity_level_s) {
          switch (poi.intensity_level_s) {
            case 'intense':
              ride.rideCategory = RideCategory.THRILL;
              break;
            case 'moderate':
              ride.rideCategory = RideCategory.FAMILY;
              break;
            default:
            case 'soft':
              ride.rideCategory = RideCategory.KIDS;
              break;
          }
        }

        if (parseFloat(poi.latitude_s) !== 4) {
          ride.location = {
            lat: parseFloat(poi.latitude_s),
            lng: parseFloat(poi.longitude_s),
          };
        }

        if (poi['theme-areas_ss'] && poi['theme-areas_ss'].length > 0) {
          ride.area = poi['theme-areas_ss'][0];
        }

        if (poi.minHeight_ss && poi.minHeight_ss.length > 0) {
          ride.minSize = parseInt(poi.minHeight_ss[0].split(' ')[0]);
        }

        if (poi.maxHeight_ss && poi.maxHeight_ss.length > 0) {
          ride.maxSize = parseInt(poi.maxHeight_ss[0].split(' ')[0]);
        }

        return ride;
      });
    });
  }
}
