import { Injectable } from '@nestjs/common';
import { AioThemeparkService } from '../../_services/aio/aio-themepark.service';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import {
  AttractionsIoAppDetailsInterface,
} from '../../_interfaces/attractions-io/attractions-io-app-details.interface';
import { PoiCategory } from '../../_interfaces/poi-categories.enum';

@Injectable()
export class AltonTowersService extends AioThemeparkService {
  getInfo(): ThemePark {
    return {
      name: 'Alton Towers',
      parkType: ParkType.THEMEPARK,
      description: 'Alton Towers is een attractiepark in het graafschap Staffordshire in Groot-Brittannië. Alton Towers trekt jaarlijks ongeveer twee miljoen bezoekers, waarmee het na Legoland Windsor het meest bezochte attractiepark is in het Verenigd Koninkrijk.',
      countryCode: 'gb',
      image: 'https://i2-prod.staffordshire-live.co.uk/incoming/article5048290.ece/ALTERNATES/s1200b/1_JS213388284.jpg',
      location: {
        lat: 52.9877,
        lng: -1.8888,
      },
      id: 'alton-towers',
      timezone: 'Europe/London',
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsPois: true,
      supportsRideWaitTimesHistory: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsRideWaitTimes: false,
      supportsRestaurants: true,
      supportsShows: true,
      supportsRides: true,
      supportsShops: true,
      supportsShopOpeningTimes: false,
      supportsPoiLocations: true,
      supportsRestaurantOpeningTimes: false,
      supportsShowTimes: false,
      supportsAnimals: false,
      supportsTranslations: false,
      textType: 'UNDEFINED',
      supportsEvents: false,
    };
  }

  getApiKey(): string {
    return 'e6c2bbf8-da54-47a2-a5ed-8b7797137113';
  }

  getInstallationRequestBody(): string {
    return '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="app_version"\n' +
      '\n' +
      '5.5\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="apn_token"\n' +
      '\n' +
      'c2ea6b0bcaa3f4631c9487e01d9c3d1f83351449975df7f8eb84784b9af9ae8f\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="app_build"\n' +
      '\n' +
      '390\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc--\n' +
      '\n';
  }

  getAppDetails(): AttractionsIoAppDetailsInterface {
    return {
      latestUpdate: '2021-08-16T14:11:35+02:00',
      platform: 'iOS',
      platformVersion: '14.4',
      contentType: 'multipart/form-data; boundary=s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc',
      userAgent: 'Alton%20Towers/5.5 CFNetwork/1240.0.4 Darwin/20.6.0',
      appBuild: '390',
    };
  }

  getCategory(category: number): PoiCategory {
    switch (category) {
      case 498:
      case 504:
      case 506:
      case 507:
      case 749:
        return PoiCategory.ATTRACTION;
      case 499:
      case 804:
      case 805:
      case 806:
      case 807:
      case 808:
        return PoiCategory.RESTAURANT;
      case 500:
        return PoiCategory.SHOP;
      case 501:
        return PoiCategory.HOTEL;
      case 502:
      case 513:
      case 1109:
        return PoiCategory.GUEST_SERVICES;
      case 503:
        return PoiCategory.TOILETS;
      case 511:
        return PoiCategory.LOCKERS;
      case 509:
        return PoiCategory.FIRSTAID;
      case 510:
        return PoiCategory.ATM;
      case 514:
        return PoiCategory.SMOKING_AREA;
      case 508:
      case 523:
      case 810:
        return PoiCategory.SHOW;
      case 3683:
        return PoiCategory.WATER_FOUNTAIN;
      // Relax
      case 505:
      // Young Fun
      default:
        return PoiCategory.UNDEFINED;
    }
  }
}
