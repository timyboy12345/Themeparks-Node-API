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
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Legoland_Billund_%286751086171%29.jpg/800px-Legoland_Billund_%286751086171%29.jpg',
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
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc--\n'
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
        return PoiCategory.ATTRACTION;
      case 589:
      case 1039:
      case 1040:
      case 1041:
        return PoiCategory.RESTAURANT;
      case 590:
        return PoiCategory.SHOP;
      case 607:
        return PoiCategory.SHOW;
      case 608:
        return PoiCategory.GUEST_SERVICES;
      case 610:
        return PoiCategory.TOILETS;
      case 687:
        return PoiCategory.MEET_AND_GREET;
      case 1030:
        return PoiCategory.PLAYGROUND;
      case 2082:
        return PoiCategory.SMOKING_AREA;
      case 1031:
      // Discover & Wonder
      case 1033:
        // Create
        return PoiCategory.UNDEFINED;
      // {
      //   "_id": 1034,
      //   "Name": {
      //   "en-GB": "Refreshing",
      //     "de-DE": "Abkühlen"
      // },
      //   "Icon": "4b70c315-9f3e-5ede-a5c3-32d473133c3d",
      //   "Parent": 587
      // },
      // {
      //   "_id": 1035,
      //   "Name": {
      //   "en-GB": "Above the clouds",
      //     "de-DE": "Hoch hinaus"
      // },
      //   "Icon": "9ade07d7-12b8-5ee0-96b4-9a41fe4c3e49",
      //   "Parent": 588
      // },
      // {
      //   "_id": 1036,
      //   "Name": {
      //   "en-GB": "Thrilling ",
      //     "de-DE": "Rasanter Fahrspaß"
      // },
      //   "Icon": "b1bfe74d-4e88-576c-9466-9e3c5bd11638",
      //   "Parent": 588
      // },
      // {
      //   "_id": 1037,
      //   "Name": {
      //   "en-GB": "Splashy",
      //     "de-DE": "Wasserspaß"
      // },
      //   "Icon": "7748d219-81db-5a62-b776-54bbee19dfd8",
      //   "Parent": 588
      // },
      // {
      //   "_id": 1038,
      //   "Name": {
      //   "en-GB": "Fun",
      //     "de-DE": "Fahrspaß"
      // },
      //   "Icon": "167c08cb-4da9-51ab-ae6a-9fb65073281e",
      //   "Parent": 588
      // },
      // {
      //   "_id": 1042,
      //   "Name": {
      //   "en-GB": "Cinema",
      //     "de-DE": "Kino"
      // },
      //   "Icon": "e44d8ffb-14fc-5c45-9c22-faca10edc5fa",
      //   "Parent": 607
      // },
      // {
      //   "_id": 1673,
      //   "Name": {
      //   "de-DE": "LEGO® MYTHICA",
      //     "en-GB": "LEGO® MYTHICA"
      // },
      //   "Icon": "b1d1231e-45a4-58f0-a7d0-8e80a892c48d",
      //   "Parent": null
      // }
    }
  }
}
