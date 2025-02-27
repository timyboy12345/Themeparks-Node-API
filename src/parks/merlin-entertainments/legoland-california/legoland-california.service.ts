import { Injectable } from '@nestjs/common';
import { AioThemeparkService } from '../../../_services/aio/aio-themepark.service';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import {
  AttractionsIoAppDetailsInterface,
} from '../../../_interfaces/attractions-io/attractions-io-app-details.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';

@Injectable()
export class LegolandCaliforniaService extends AioThemeparkService {
  getInfo(): ThemePark {
    return {
      id: 'legoland-california',
      name: 'Legoland California',
      company: Company.MERLIN_ENTERTAINMENTS,
      description: 'LegoLand California ligt op 30 minuten rijden van San Diego en is het eerste LegoLand park van de Verenigde Staten. Je vindt er meer dan 60 attracties, shows en restaurants',
      image: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_334,q_75,w_500/v1/clients/anaheimca/legoland_california_resort_costume_characters_59A46BDA_AD54_4396_91FD3C2EC8C33DC4_c057fcd5_0ad0_4717_930b1624ee7d5bad_0a112c8d-8c18-4c3b-a5e7-2b9a8df5f5d6.jpg',
      timezone: 'America/San_Fransisco',
      parkType: ParkType.THEMEPARK,
      countryCode: 'us',
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
    return 'cba14577-440a-4b85-bd27-423d7253710c';
  }

  getAppDetails(): AttractionsIoAppDetailsInterface {
    return {
      appBuild: '241',
      platformVersion: '18.0',
      platform: 'ios',
      contentType: 'multipart/form-data; boundary=s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc',
      latestUpdate: '2025-02-26T00:57:10+01:00',
      userAgent: 'LEGOLAND/241 CFNetwork/3826.400.120 Darwin/24.3.0',
    }
  }

  getCategory(category: number): PoiCategory {
    switch (category) {
      // Lego
      case 4743:
        return PoiCategory.UNDEFINED;
      case 4807:
        return PoiCategory.HOTEL;
      case 648:
        return PoiCategory.ATM;
      case 1009:
      // Meet and Greet
      case 1677:
        return PoiCategory.SHOW;
      case 969:
      // Ride
      case 977:
      // Build table
      case 975:
      case 973:
      case 979:
      case 646:
      // Miniland Sector
      case 974:
        return PoiCategory.ATTRACTION;
      case 3809:
        return PoiCategory.AQUARIUM;
      case 1011:
        return PoiCategory.RESTAURANT;
      // TO GO spots
      case 4768:
      case 1012:
        return PoiCategory.RESTAURANT;
      case 645:
      case 1016:
        return PoiCategory.SHOP;
      case 1022:
      case 1025:
      case 1020:
        return PoiCategory.GUEST_SERVICES;
      case 1021:
        return PoiCategory.LOCKERS;
      case 4808:
        return PoiCategory.POOL;
      case 1029:
        return PoiCategory.TOILETS;
      case 650:
      case 976:
      case 978:
        return PoiCategory.PLAYGROUND;
      case 1019:
        return PoiCategory.FIRSTAID;
      default:
        return PoiCategory.UNDEFINED;
    }
  }
}
