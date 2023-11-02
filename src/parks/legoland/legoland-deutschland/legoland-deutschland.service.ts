import { Injectable } from '@nestjs/common';
import { AioThemeparkService } from '../../../_services/aio/aio-themepark.service';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { AttractionsIoAppDetailsInterface } from '../../../_interfaces/attractions-io/attractions-io-app-details.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';

@Injectable()
export class LegolandDeutschlandService extends AioThemeparkService {
  getInfo(): ThemePark {
    return {
      id: 'legoland_deutschland',
      name: 'LegoLand Deutschland',
      description: 'Legoland Duitsland (of: Legoland Deutschland) ligt in het Duitse plaatsje Günzburg in de deelstaat Beieren. De omvang van Legoland Duitsland en het grote attractie aanbod zorgen ervoor dat je na een dag zeker nog niet uitgekeken bent!',
      image: 'https://r-cf.bstatic.com/images/hotel/max1024x768/229/229051043.jpg',
      countryCode: 'de',
      parkType: ParkType.THEMEPARK,
      location: {
        lat: 48.42588595451182,
        lng: 10.308480797154878,
      },
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsPoiLocations: false,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: false,
      supportsRideWaitTimes: false,
      supportsRides: false,
      supportsShopOpeningTimes: false,
      supportsShops: false,
      supportsShowTimes: false,
      supportsShows: false,
      supportsRideWaitTimesHistory: false,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: false,
      supportsAnimals: false,
      supportsTranslations: false,
supportsHalloween: false,
    };
  }

  getInstallationRequestBody(): string {
    return '\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="apn_token"\n' +
      '\n' +
      'a68ffe216d14bc7073a1a2bb012765bd0ee88a2b2551099427129d0773d91a92\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="app_build"\n' +
      '\n' +
      '89\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="app_version"\n' +
      '\n' +
      '1.1.2\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc--\n' +
      '\n';
  }

  getApiKey(): string {
    return '84f9d04e-b059-4930-90a3-fa2fa4bb32fc';
  }

  getAppDetails(): AttractionsIoAppDetailsInterface {
    return {
      appBuild: '89',
      contentType: 'multipart/form-data; boundary=s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc',
      latestUpdate: '2021-03-11T13:12:09',
      platform: 'iOS',
      platformVersion: '14.4',
      userAgent: 'LEGOLAND/89 CFNetwork/1220.1 Darwin/20.3.0',
    };
  }

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
