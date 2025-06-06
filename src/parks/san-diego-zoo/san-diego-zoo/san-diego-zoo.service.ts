import { Injectable } from '@nestjs/common';
import { AioThemeparkService } from '../../../_services/aio/aio-themepark.service';
import {
  AttractionsIoAppDetailsInterface,
} from '../../../_interfaces/attractions-io/attractions-io-app-details.interface';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';

@Injectable()
export class SanDiegoZooService extends AioThemeparkService {
  getInfo(): ThemePark {
    return {
      id: 'san-diego-zoo',
      name: 'San Diego Zoo',
      countryCode: 'us',
      image: undefined,
      description: undefined,
      location: {
        lat: 0,
        lng: 0
      },
      parkType: ParkType.ZOO,
      timezone: 'America/Los_Angeles'
    }
  }

  getSupports(): ThemeParkSupports {
    const superSupports = super.getSupports();
    superSupports.supportsAnimals = true;
    return superSupports;
  }

  getInstallationRequestBody(): string {
    return "\n" +
      "--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n" +
      "Content-Disposition: form-data; name=\"user_identifier\"\n" +
      "\n" +
      "5A097C66-1395-4DF4-972D-12AF239B6051\n" +
      "--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n" +
      "Content-Disposition: form-data; name=\"device_identifier\"\n" +
      "\n" +
      "E386B179-170D-4DDA-BB9F-2B3C977BD59D\n" +
      "--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n" +
      "Content-Disposition: form-data; name=\"app_version\"\n" +
      "\n" +
      "1.1.27\n" +
      "--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n" +
      "Content-Disposition: form-data; name=\"app_build\"\n" +
      "\n" +
      "71\n" +
      "--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc--\n"
  }

  getApiKey(): string {
    return "b7c9895f-2486-544f-a623-a43340051f78"
  }

  getAppDetails(): AttractionsIoAppDetailsInterface {
    return {
      latestUpdate: "2025-04-10T21:01:44+02:00",
      platform: 'iOS',
      platformVersion: '14.8',
      contentType: 'multipart/form-data; boundary=s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc',
      userAgent: 'Safari%20Park/71 CFNetwork/3826.500.111.2.2 Darwin/24.4.0',
      appBuild: '71'
    }
  }

  getCategory(category: number): PoiCategory {
    switch (category) {
      case 1302:
      case 1367:
        // Birds of Prey
      case 1386:
        // Birds
      case 1387:
        // Reptiles
      case 1389:
        // Mammals
      case 1390:
        // Plants
      case 1432:
        // Gardens
        return PoiCategory.ANIMAL;
      case 1380:
        // Skyfari
        return PoiCategory.ATTRACTION;
      case 1366:
      case 1547:
        // Baby Care
      case 1550:
        // Rentals
        return PoiCategory.GUEST_SERVICES;
      case 1368:
      case 1725:
      case 1726:
      case 2005:
        return PoiCategory.TOILETS;
      case 1371:
        return PoiCategory.SHOP;
      case 1372:
      case 1542:
        // Full Service Dining
      case 1431:
        // Catering Venues
      case 1543:
        // Quick Service Restaurants
        return PoiCategory.RESTAURANT;
      case 1546:
        return PoiCategory.ATM;
      case 1548:
        return PoiCategory.FIRSTAID;
      case 1549:
        return PoiCategory.LOCKERS;
      case 1430:
        // Activities
      case 1755:
        // Theaters
        return PoiCategory.SHOW;
      case 1553: // Drinking Fountain
        return PoiCategory.WATER_FOUNTAIN;
      case 1369:
        // Upgraded Experiences
      case 1373:
        // Buses
      case 1379:
        // Elevators
      case 1494:
        // Mission: Spring Adventure
      default:
        return PoiCategory.UNDEFINED;
    }

    // {
    //   "_id": 1551,
    //   "Name": "Tours & Tickets",
    //   "Icon": "619ebe94-91d9-5297-9c00-e1ebe45975ef",
    //   "Parent": 1366
    // },
    // {
    //   "_id": 1552,
    //   "Name": "Cart Tours",
    //   "Icon": "9f426486-4696-5994-ad76-3bac7e026d45",
    //   "Parent": 1369
    // },
    // {
    //   "_id": 1553,
    //   "Name": "Water Fountains",
    //   "Icon": "785254f6-b8e4-57ae-9419-9d4298b13b25",
    //   "Parent": 1366
    // },
    // {
    //   "_id": 1619,
    //   "Name": "Service Animals",
    //   "Icon": "aa89eb13-8e7c-57de-b912-bab83a551ba4",
    //   "Parent": 1366
    // },
    // {
    //   "_id": 1753,
    //   "Name": "Kangaroo Bus",
    //   "Icon": "b4326970-5d07-51dc-baed-a8ebe679eee8",
    //   "Parent": 1373
    // },
    // {
    //   "_id": 1754,
    //   "Name": "Bus Tour",
    //   "Icon": "340fcd3b-e6e7-5bcd-bc9d-508a96b672ba",
    //   "Parent": 1373
    // },
    // {
    //   "_id": 1756,
    //   "Name": "Miniature Train",
    //   "Icon": "558944bb-a36b-5331-813f-eba3a0f661b5",
    //   "Parent": 1430
    // },
    // {
    //   "_id": 2052,
    //   "Name": "Accessibility Information",
    //   "Icon": "eb2d0411-64a3-5a37-891f-7a9d03311626",
    //   "Parent": null
    // },
    // {
    //   "_id": 2053,
    //   "Name": "Service Animals",
    //   "Icon": "b069ee3e-336e-54a3-bba5-708bc9eb292a",
    //   "Parent": 2052
    // },
    // {
    //   "_id": 2054,
    //   "Name": "Elevators",
    //   "Icon": "d6a7327b-131f-557c-8d01-d3c0bdafefc7",
    //   "Parent": 2052
    // },
    // {
    //   "_id": 2056,
    //   "Name": "Rentals",
    //   "Icon": "3cba5b5b-dfe2-55fa-9e60-50716a4da96c",
    //   "Parent": 2052
    // },
    // {
    //   "_id": 2057,
    //   "Name": "Quiet Areas",
    //   "Icon": "62d34bcf-ea79-509d-9ecd-1e786fdd7a35",
    //   "Parent": 2052
    // },
    // {
    //   "_id": 2058,
    //   "Name": "Headphone Zones",
    //   "Icon": "52807c5b-8904-548f-9fb0-4bed2523071b",
    //   "Parent": 2052
    // }
  }
}
