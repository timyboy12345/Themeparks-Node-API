import { Injectable } from '@nestjs/common';
import { AioThemeparkService } from '../../_services/aio/aio-themepark.service';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import {
  AttractionsIoAppDetailsInterface,
} from '../../_interfaces/attractions-io/attractions-io-app-details.interface';
import { PoiCategory } from '../../_interfaces/poi-categories.enum';

@Injectable()
export class DjursSommerlandService extends AioThemeparkService {
  getInfo(): ThemePark {
    return {
      id: 'djurs-sommerland',
      parkType: ParkType.THEMEPARK,
      description: 'Djurs Sommerland is een attractiepark in Nimtofte, Midden-Jutland. Het park werd in 1981 opgericht en is, zoals de naam het al zegt, vooral open in de zomer',
      timezone: 'Europe/Copenhagen',
      name: 'Djurs Sommerland',
      countryCode: 'dk',
      image: 'https://djurssommerland.dk/media/4514/sos_34.png',
      location: {
        lat: 56.425240373232505,
        lng: 10.550931939401305,
      },
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
    return 'e64b1f4d-2cfa-4ed3-8a99-3bb38c11fa98';
  }

  getInstallationRequestBody(): string {
    return '\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="device_identifier"\n' +
      '\n' +
      '1D58DAC7-0C64-4329-B18C-6D6E09F23E0A\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="app_version"\n' +
      '\n' +
      '2.3.19\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="user_identifier"\n' +
      '\n' +
      'C2152931-A6BA-4ED4-8C99-77606D249FB7\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="app_build"\n' +
      '\n' +
      '89\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc--\n';
  }

  getAppDetails(): AttractionsIoAppDetailsInterface {
    return {
      latestUpdate: '2024-11-07T14:37:50+01:00',
      appBuild: '89',
      userAgent: 'Djurs%20Sommerland/89 CFNetwork/3826.400.120 Darwin/24.3.0',
      contentType: 'multipart/form-data; boundary=s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc',
      platform: 'ios',
      platformVersion: '18.0',
    };
  }

  // TODO: Add Categories

  getCategory(category: number): PoiCategory {
    switch (category) {
      case 1130:
        return PoiCategory.ATTRACTION;
      case 1138:
      case 1139:
      case 1140:
      case 1153:
      case 1154:
        return PoiCategory.RESTAURANT;
      case 1142:
      case 1158:
        return PoiCategory.SHOP;
      case 1143:
      case 1155:
        return PoiCategory.TOILETS;
      case 1144:
      case 1164:
        return PoiCategory.GUEST_SERVICES;
      case 1159:
        return PoiCategory.PHOTO_SHOP;
      case 1161:
        return PoiCategory.SMOKING_AREA;
      case 1165:
        return PoiCategory.ATM;
      case 1166:
        return PoiCategory.DEFIBRILLATOR;
      case 1168:
        return PoiCategory.LOST_AND_FOUND;
      case 1170:
        return PoiCategory.FIRSTAID;
      case 4937:
        return PoiCategory.HALLOWEEN_EVENT;
      default:
        return PoiCategory.UNDEFINED;
    }
  }
}
