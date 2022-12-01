import { Injectable } from '@nestjs/common';
import { AioThemeparkService } from '../../_services/aio/aio-themepark.service';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { AttractionsIoAppDetailsInterface } from '../../_interfaces/attractions-io/attractions-io-app-details.interface';
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
        lng: -1.8888
      },
      id: 'alton-towers',
      timezone: 'Europe/London'
    }
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
      supportsTranslations: false
    }
  }

  getApiKey(): string {
    return "e6c2bbf8-da54-47a2-a5ed-8b7797137113";
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
      '\n'
  }

  getAppDetails(): AttractionsIoAppDetailsInterface {
    return {
      latestUpdate: '2021-08-16T14:11:35+02:00',
      platform: 'iOS',
      platformVersion: '14.4',
      contentType: 'multipart/form-data; boundary=s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc',
      userAgent: 'Alton%20Towers/5.5 CFNetwork/1240.0.4 Darwin/20.6.0',
      appBuild: '390'
    }
  }

  getCategory(category: number): PoiCategory {
    switch (category) {
      case 498:
        return PoiCategory.ATTRACTION;
      case 499:
      case 804:
      case 805:
      case 806:
      case 807:
        return PoiCategory.RESTAURANT;
      case 500:
        return PoiCategory.SHOP;
      case 501:
        return PoiCategory.HOTEL;
      case 502:
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
      case 523:
        return PoiCategory.SHOW;
      case 504:
        // Relax
      case 505:
        // Young Fun
      default:
        return PoiCategory.UNDEFINED;
    }
    // {
    //   "_id": 505,
    //   "Name": "Young Fun",
    //   "Icon": null,
    //   "Parent": 498
    // },
    // {
    //   "_id": 506,
    //   "Name": "Laughs & Frights",
    //   "Icon": null,
    //   "Parent": 498
    // },
    // {
    //   "_id": 507,
    //   "Name": "Thrills",
    //   "Icon": null,
    //   "Parent": 498
    // },
    // {
    //   "_id": 508,
    //   "Name": "CBeebies Land",
    //   "Icon": null,
    //   "Parent": 498
    // },
    // {
    //   "_id": 512,
    //   "Name": "Buggy Parks",
    //   "Icon": null,
    //   "Parent": 502
    // },
    // {
    //   "_id": 513,
    //   "Name": "Sales and Information",
    //   "Icon": null,
    //   "Parent": 502
    // },
    // {
    //   "_id": 749,
    //   "Name": "Young Fun & Imagination",
    //   "Icon": "1f13ab63-420d-5b29-8feb-fe670cfb6c9b",
    //   "Parent": 498
    // },
    // {
    //   "_id": 808,
    //   "Name": "Hotels",
    //   "Icon": "fc71b6b1-bca2-549b-ad41-30e71ceba836",
    //   "Parent": 499
    // },
    // {
    //   "_id": 809,
    //   "Name": "Family",
    //   "Icon": "99ee0df7-2e97-5bdc-a5ef-b0a82d90b1c4",
    //   "Parent": 523
    // },
    // {
    //   "_id": 810,
    //   "Name": "Kids",
    //   "Icon": "80f03de9-ccf1-5b42-bde4-8eaf87d64775",
    //   "Parent": 523
    // },
    // {
    //   "_id": 1109,
    //   "Name": "Resort Activities",
    //   "Icon": "92ff5b89-b476-50f6-89d2-82515fa69834",
    //   "Parent": null
    // },
    // {
    //   "_id": 1223,
    //   "Name": "Heritage",
    //   "Icon": "ce15cd9c-37f6-583a-a960-7a6dd2ff94e4",
    //   "Parent": null
    // },
    // {
    //   "_id": 1238,
    //   "Name": "Coca-Cola Freestyle",
    //   "Icon": "23968c02-c2ff-530e-a538-cd22f978b763",
    //   "Parent": 499
    // },
    // {
    //   "_id": 1322,
    //   "Name": "Scare Maze",
    //   "Icon": "d345889b-7ef0-55cd-a980-12ce99de655b",
    //   "Parent": 498
    // },
    // {
    //   "_id": 1323,
    //   "Name": "Scarefest",
    //   "Icon": "ea3947e4-b3c7-5f30-9ad0-85408f4546e9",
    //   "Parent": 523
    // },
    // {
    //   "_id": 1416,
    //   "Name": "Festive",
    //   "Icon": "bb2becaa-203a-5c5a-a55a-1ff4ba263b67",
    //   "Parent": 498
    // },
    // {
    //   "_id": 1417,
    //   "Name": "Festive",
    //   "Icon": "d1969243-72f4-5f6f-8bc5-49279b0d8417",
    //   "Parent": 523
    // },
    // {
    //   "_id": 1422,
    //   "Name": "Festive",
    //   "Icon": "99372bd1-4bfd-5034-bbe8-6502bd7b78d6",
    //   "Parent": 499
    // },
    // {
    //   "_id": 1623,
    //   "Name": "Mobile Order",
    //   "Icon": "c84134db-5b2a-5863-97fc-9ef79c4d2bc5",
    //   "Parent": 499
    // },
    // {
    //   "_id": 1751,
    //   "Name": "Mobile Order",
    //   "Icon": "70b39bb0-7e6c-5cfa-a0c8-b611c9c5c7df",
    //   "Parent": 499
    // },
    // {
    //   "_id": 2037,
    //   "Name": "Scarefest",
    //   "Icon": "3d97f4f7-b0a6-5eff-aa24-653c427b3451",
    //   "Parent": null
    // }
  }
}
