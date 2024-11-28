import { Injectable } from '@nestjs/common';
import { AioThemeparkService } from '../../../_services/aio/aio-themepark.service';
import { Company, ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import {
  AttractionsIoAppDetailsInterface,
} from '../../../_interfaces/attractions-io/attractions-io-app-details.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';

@Injectable()
export class HeidiParkService extends AioThemeparkService {
  getInfo(): ThemePark {
    return {
      id: 'heidi-park',
      name: 'Heidi Park',
      company: Company.MERLIN_ENTERTAINMENTS,
      description: 'Heide Park is het grootste pretpark van Noord-Duitsland, met achtbanen, waterattracties en vele restaurants en winkels is het geen wonder dat er meer dan een miljoen mensen op af komen elk jaar.',
      image: 'https://www.heide-park.de/media/kxtdaza2/herbst-bigloop.jpg',
      parkType: ParkType.THEMEPARK,
      countryCode: 'de',
      timezone: 'Europe/Amsterdam',
      location: {
        lat: 53.028056,
        lng: 9.869167,
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
      textType: "UNDEFINED",
    };
  }

  getInstallationRequestBody(): string {
    return '\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="user_identifier"\n' +
      '\n' +
      '7C8D89F1-F9C7-4921-B4E1-3BD8430B2A94\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="device_identifier"\n' +
      '\n' +
      '5A02493A-39AB-4CDA-828B-1EECC5CAB99A\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="app_build"\n' +
      '\n' +
      '302056\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="app_version"\n' +
      '\n' +
      '4.1.5\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc--\n' +
      '\n';
  }

  getApiKey(): string {
    return '3d67a479-3b8b-4cac-ab17-1218a1aec37e';
  }

  getAppDetails(): AttractionsIoAppDetailsInterface {
    return {
      appBuild: '302056',
      contentType: 'multipart/form-data; boundary=s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc',
      latestUpdate: '2024-10-08T09:17:15+02:00',
      platform: 'iOS',
      platformVersion: '18.0.1',
      userAgent: 'Heide%20Park/302056 CFNetwork/1568.100.1.2.1 Darwin/24.0.0',
    };
  }

  getCategory(category: number): PoiCategory {
    switch (category) {
      // For adrenaline junkies
      case 751:
      // Family Ride
      case 763:
      case 764:
      case 774:
      // For Families
      case 1029:
      // Thrill Rides
      case 773:
        return PoiCategory.ATTRACTION;
      // Vegetary
      case 765:
      // Vegan
      case 780:
      // Plant Based
      case 997:
        return PoiCategory.RESTAURANT;
      // To Go
      case 766:
        return PoiCategory.RESTAURANT;
      // Sweets & Snacks
      case 806:
        return PoiCategory.RESTAURANT;
      // Hearty meal
      case 807:
        return PoiCategory.RESTAURANT;

      // Attractions
      case 677:
        return PoiCategory.ATTRACTION;
      // Entertainment
      case 678:
        return PoiCategory.SHOW;
      // Dining
      case 679:
        return PoiCategory.RESTAURANT;
      // Shops
      case 680:
        return PoiCategory.SHOP;
      // Thrill Rides
      case 2159:
        return PoiCategory.ATTRACTION;
      // Family Rides
      case 2160:
        return PoiCategory.ATTRACTION;
      // Big 7
      case 2271:
        return PoiCategory.ATTRACTION;
      // Facilities
      case 2162:
        return PoiCategory.TOILETS;
      // Smoking Areas
      case 2163:
        return PoiCategory.SMOKING_AREA;
      // Services
      case 2165:
        return PoiCategory.GUEST_SERVICES;
      // Foto Service
      case 2171:
        return PoiCategory.PHOTO_SHOP;
      // Cash Point
      case 2172:
        return PoiCategory.ATM;
      // Lockers
      case 2174:
        return PoiCategory.LOCKERS;
      // First-aid station
      case 2175:
        return PoiCategory.FIRSTAID;
      // Playground
      case 2186:
        return PoiCategory.PLAYGROUND;
      // Short Breaks
      case 2188:
        return PoiCategory.HOTEL;
      // Parking
      case 2189:
        return PoiCategory.PARKING;
      // entrance and exit
      case 2234:
        return PoiCategory.ENTRANCE;
      // Service Center & Fundsachen
      case 2273:
        return PoiCategory.GUEST_SERVICES;
      default:
        return PoiCategory.UNDEFINED;
      // {
      //   "_id": 2170,
      //   "Name": {
      //     "de-DE": "Baby-Nahrung aufwärmen",
      //     "en-GB": "Übersetzen Baby food warming up"
      //   },
      //   "Icon": "699eef06-f8bc-52d3-a8e7-96b57bdca8ad",
      //   "Parent": 2165
      // },
      // {
      //   "_id": 2187,
      //   "Name": {
      //     "de-DE": "Meeting-Point",
      //     "en-GB": "Meeting-Point"
      //   },
      //   "Icon": "3285cd76-897c-5450-86d4-43245e88ee93",
      //   "Parent": 2165
      // },
      // {
      //   "_id": 2257,
      //   "Name": {
      //     "de-DE": "Thrill-Attraktionen",
      //     "en-GB": "Thrill-Attraktionen"
      //   },
      //   "Icon": "76ea700f-7093-50e8-9cbe-610e3f06c539",
      //   "Parent": 677
      // },
      // {
      //   "_id": 2258,
      //   "Name": {
      //     "de-DE": "Achterbahnen",
      //     "en-GB": "Rollercoasters"
      //   },
      //   "Icon": "d5ba9819-d3e1-5ec2-a1db-a8f8e8116b4a",
      //   "Parent": 677
      // },
      // {
      //   "_id": 2271,
      //   "Name": {
      //     "de-DE": "Big 7",
      //     "en-GB": "Big 7"
      //   },
      //   "Icon": "425921e7-af5e-5bdb-b20c-de1483c266ea",
      //   "Parent": 677
      // },
      // {
      //   "_id": 2272,
      //   "Name": {
      //     "de-DE": "Hipp-Wickelstation",
      //     "en-GB": "Hipp-Wickelstation"
      //   },
      //   "Icon": "75ec2af1-020d-5a59-bdc7-d06971d452ff",
      //   "Parent": 2165
      // },
      // {
      //   "_id": 2274,
      //   "Name": {
      //     "de-DE": "Umfrage-Terminal",
      //     "en-GB": "Guest-Ex"
      //   },
      //   "Icon": "69660bdc-2b8b-51e3-a8f4-fd746d22df00",
      //   "Parent": 2165
      // },
      // {
      //   "_id": 2275,
      //   "Name": {
      //     "de-DE": "Umfrage-Terminal",
      //     "en-GB": "Feedback-terminal"
      //   },
      //   "Icon": "97b12ce1-9565-5ba2-9a5f-53b3fe38a49d",
      //   "Parent": 2165
      // },
      // {
      //   "_id": 2949,
      //   "Name": {
      //     "de-DE": "Halloween",
      //     "en-GB": "Halloween"
      //   },
      //   "Icon": "ad6a23da-5395-5dc9-b572-7d059b33713f",
      //   "Parent": null
      // },
      // {
      //   "_id": 3849,
      //   "Name": {
      //     "de-DE": "Summer Vibes",
      //     "en-GB": "Summer Vibes"
      //   },
      //   "Icon": "d0429bf1-eb1d-56a1-8883-29110e3a6bff",
      //   "Parent": null
      // },
      // {
      //   "_id": 3850,
      //   "Name": {
      //     "de-DE": "Fotospots",
      //     "en-GB": "Fotospots"
      //   },
      //   "Icon": "3871d1fe-abd9-523c-8759-0be88f7e2bc8",
      //   "Parent": null
      // },
      // {
      //   "_id": 3883,
      //   "Name": {
      //     "de-DE": "Pride Festival 2024",
      //     "en-GB": "Pride Festival 2024"
      //   },
      //   "Icon": "9cd7a366-7fb0-564e-b695-254dd49a8b46",
      //   "Parent": null
      // },
      // {
      //   "_id": 3948,
      //   "Name": {
      //     "de-DE": "Oktoberfest",
      //     "en-GB": "Oktoberfest"
      //   },
      //   "Icon": "4f5c4e47-b601-5d79-9a7b-380251cbe8f8",
      //   "Parent": null
      // },
      // {
      //   "_id": 4881,
      //   "Name": {
      //     "de-DE": "Heide Park Festival",
      //     "en-GB": "Heide Park Festival"
      //   },
      //   "Icon": "718e3997-ac31-59c5-a386-933490db0fa8",
      //   "Parent": null
      // }

      //   {
      //     "_id": 781,
      //     "Name": {
      //       "de-DE": "Eingangsbereich",
      //       "en-GB": "Eingangsbereich"
      //     },
      //     "Icon": null
      //   },
      //   {
      //     "_id": 782,
      //     "Name": {
      //       "de-DE": "Transsilvanien",
      //       "en-GB": "Transsilvanien"
      //     },
      //     "Icon": null
      //   },
      //   {
      //     "_id": 783,
      //     "Name": {
      //       "de-DE": "Bucht der Totenkopfpiraten",
      //       "en-GB": "Bucht der Totenkopfpiraten"
      //     },
      //     "Icon": null
      //   },
      //   {
      //     "_id": 784,
      //     "Name": {
      //       "de-DE": "Exploria",
      //       "en-GB": "Exploria"
      //     },
      //     "Icon": null
      //   },
      //   {
      //     "_id": 785,
      //     "Name": {
      //       "de-DE": "Land der Vergessenen",
      //       "en-GB": "Land der Vergessenen"
      //     },
      //     "Icon": null
      //   },
      // ],
    }
  }
}
