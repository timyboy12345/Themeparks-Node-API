import { Injectable } from '@nestjs/common';
import { AioThemeparkService } from '../../../_services/aio/aio-themepark.service';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import {
  AttractionsIoAppDetailsInterface,
} from '../../../_interfaces/attractions-io/attractions-io-app-details.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';

@Injectable()
export class LegolandWindsorResortService extends AioThemeparkService {
  getInfo(): ThemePark {
    return {
      id: 'legoland-windsor-resort',
      name: 'Legoland Windsor Resort',
      company: Company.MERLIN_ENTERTAINMENTS,
      description: 'Legoland Windsor is een kindergericht pretpark in Windsor in Engeland. Het park is gethematiseerd rond het speelgoed Lego. Het park opende in 1996 op de site van het vroegere Windsor Safari Park, als het tweede LEGO Group Legoland',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Entrance_to_Legoland_Windsor.jpg',
      timezone: 'Europe/London',
      parkType: ParkType.THEMEPARK,
      countryCode: 'gb',
    }
  }


  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
      supportsEvents: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: false,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsRides: true,
      supportsShopOpeningTimes: false,
      supportsShops: true,
      supportsShowTimes: false,
      supportsShows: true,
      supportsTranslations: false,
      textType: "UNDEFINED",
    };
  }

  getInstallationRequestBody(): string {
    return '\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="user_identifier"\n' +
      '\n' +
      '36396B8B-5DC0-43F8-B4D5-11F5B08596FC\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="app_build"\n' +
      '\n' +
      '241\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="device_identifier"\n' +
      '\n' +
      'F352C7B9-530A-4B8B-87F1-2C38E862EE42\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="app_version"\n' +
      '\n' +
      '8.4.14\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc--\n';
  }

  getApiKey(): string {
    return '7b56aa91-d4c6-4f8f-bac6-441a141a8e81';
  }

  getAppDetails(): AttractionsIoAppDetailsInterface {
    return {
      appBuild: '260',
      platformVersion: '18.0',
      platform: 'ios',
      contentType: 'multipart/form-data; boundary=s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc',
      latestUpdate: '2024-10-01T14:34:14+02:00',
      userAgent: 'LEGOLAND/241 CFNetwork/3826.400.120 Darwin/24.3.0',
    }
  }

  getCategory(category: number): PoiCategory {
    switch (category) {
      case 565:
        return PoiCategory.PARKING;
      case 833:
      case 834:
      case 835:
      case 1500:
        return PoiCategory.ATTRACTION;
      case 564:
        return PoiCategory.HOTEL;
      case 562:
        return PoiCategory.SHOW;
      // Mini Golf
      case 559:
        return PoiCategory.PARKING;
      case 573:
      case 574:
      case 882:
      case 563:
      case 878:
        return PoiCategory.GUEST_SERVICES;
      case 870:
        return PoiCategory.LOCKERS;
      case 560:
      case 867:
      case 868:
      case 561:
      case 864:
      case 865:
        return PoiCategory.RESTAURANT;
      case 840:
        return PoiCategory.PAID_ACTIVITY;
      case 879:
        return PoiCategory.PICNIC_AREA;
      case 869:
        return PoiCategory.TOILETS;
      default:
        return PoiCategory.UNDEFINED;
    }
  }
}
