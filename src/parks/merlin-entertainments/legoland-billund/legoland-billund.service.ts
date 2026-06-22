import { Injectable } from '@nestjs/common';
import { AioThemeparkService } from '../../../_services/aio/aio-themepark.service';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import {
  AttractionsIoAppDetailsInterface,
} from '../../../_interfaces/attractions-io/attractions-io-app-details.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';

@Injectable()
export class LegolandBillundService extends AioThemeparkService {
  getInfo(): ThemePark {
    return {
      id: 'legoland-billund',
      name: 'LegoLand Billund',
      description: 'Achtbanen en familieritten in pretpark met themagebieden en miniatuurwereld gemaakt van Lego.',
      image: 'https://www.legoland.dk/media/rksjmvkc/148-legoland__k1a3129_final_1920x1080.jpg?format=jpg',
      countryCode: 'dk',
      parkType: ParkType.THEMEPARK,
      company: Company.MERLIN_ENTERTAINMENTS,
      location: {
        lat: 55.73496589479054,
        lng: 9.127245839239404,
      },
    };
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
      textType: 'UNDEFINED',
    };
  }

  getInstallationRequestBody(): string {
    return '\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="app_version"\n' +
      '\n' +
      '2.4.28\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="device_identifier"\n' +
      '\n' +
      'F352C7B9-530A-4B8B-87F1-2C38E862EE42\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="user_identifier"\n' +
      '\n' +
      'AE48BD52-7F13-4BA7-8BF6-784C925949A0\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="app_build"\n' +
      '\n' +
      '222\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc--\n';
  }

  getApiKey(): string {
    return 'b55dfc11-e3ae-4f79-a9ee-73a3ee5ca5e4';
  }

  getAppDetails(): AttractionsIoAppDetailsInterface {
    return {
      appBuild: '222',
      contentType: 'multipart/form-data; boundary=s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc',
      latestUpdate: '2025-02-17T08:18:54+01:00',
      platform: 'iOS',
      platformVersion: '18.3.1',
      userAgent: 'LEGOLAND/222 CFNetwork/3826.400.120 Darwin/24.3.0',
    };
  }

  // TODO: Fix these categories once LegoLand Billund Works
  getCategory(category: number): PoiCategory {
    switch (category) {
      case 587:
      case 588:
      case 858:
      case 863:
      case 859:
      case 862:
      case 860:
        return PoiCategory.ATTRACTION;
      case 589:
      case 620:
      case 817:
      case 886:
      case 915:
      case 1039:
      case 1040:
      case 1041:
      case 3075:
      case 887:
        return PoiCategory.RESTAURANT;
      case 590:
      case 818:
        return PoiCategory.SHOP;
      case 607:
        return PoiCategory.SHOW;
      case 654:
        return PoiCategory.HOTEL;
      case 608:
      case 823:
      case 5720:
        return PoiCategory.GUEST_SERVICES;
      case 610:
        return PoiCategory.TOILETS;
      case 687:
      case 885:
        return PoiCategory.MEET_AND_GREET;
      case 1030:
      case 802:
        return PoiCategory.PLAYGROUND;
      case 2082:
        return PoiCategory.SMOKING_AREA;
      case 621:
      case 884:
        return PoiCategory.SHOW;
      case 3852:
        return PoiCategory.WATER_FOUNTAIN;
      case 1031:
      // Discover & Wonder
      case 1033:
      default:
        // Create
        return PoiCategory.UNDEFINED;
    }
  }
}
