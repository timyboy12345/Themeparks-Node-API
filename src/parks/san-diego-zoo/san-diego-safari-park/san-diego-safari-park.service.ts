import { Injectable } from '@nestjs/common';
import { AioThemeparkService } from '../../../_services/aio/aio-themepark.service';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import {
  AttractionsIoAppDetailsInterface,
} from '../../../_interfaces/attractions-io/attractions-io-app-details.interface';

@Injectable()
export class SanDiegoSafariParkService extends AioThemeparkService {
  getInfo(): ThemePark {
    return {
      id: 'san-diego-zoo-safari-park',
      name: 'San Diego Zoo Safari Park',
      countryCode: 'us',
      image: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/ed/ff/00.jpg',
      description: 'De San Diego Zoo is een dierentuin in San Diego in het zuiden van de Amerikaanse staat Californië. Er verblijven zo\'n 4000 dieren van meer dan 800 verschillende diersoorten. De San Diego Zoo stond bekend om zijn reuzenpanda’s vanaf 1996. In april 2019 zijn de panda’s terug naar China gegaan.',
      location: {
        lat: 32.735317,
        lng: -117.149048,
      },
      parkType: ParkType.ZOO,
      timezone: 'America/Los_Angeles',
    };
  }

  getSupports(): ThemeParkSupports {
    const superSupports = super.getSupports();
    superSupports.supportsAnimals = true;
    return superSupports;
  }

  getInstallationRequestBody(): string {
    return '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="user_identifier"\n' +
      '\n' +
      '33D6D8E2-83B8-4F6C-A201-0E90E5ADB4C5\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="device_identifier"\n' +
      '\n' +
      'B016B80D-B206-4078-8E79-1BD14A93E856\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="app_version"\n' +
      '\n' +
      '3.1\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="app_build"\n' +
      '\n' +
      '132\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc--\n' +
      '\n';
  }

  getApiKey(): string {
    return 'dba0df18-ab39-5a1c-9a4a-fc1dc2b0cc84';
  }

  getAppDetails(): AttractionsIoAppDetailsInterface {
    return {
      latestUpdate: '2021-09-20T04:24:51+02:00',
      platform: 'iOS',
      platformVersion: '14.8',
      contentType: 'multipart/form-data; boundary=s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc',
      userAgent: 'San%20Diego%20Zoo/132 CFNetwork/1240.0.4 Darwin/20.6.0',
      appBuild: '132',
    };
  }

  getCategory(category: number): PoiCategory {
    switch (category) {
      case 1374: // Safaris
      case 1375: // Wildlife
      case 1554: // Balloon Safari
      case 5133: // Safari Excursions
      case 5199: // Africa Tram
      case 1762: // Ultimate Safari
      case 1562: // Wildlife Safari
        return PoiCategory.ATTRACTION;
      case 1442:
        return PoiCategory.EVENT_LOCATION;
      case 5201: // Quiet Area
        return PoiCategory.GUEST_SERVICES;
      case 1415:
        return PoiCategory.GARDEN;
      case 1412: // Mammals
      case 1411: // Birds
        return PoiCategory.ANIMAL;
      case 1376: // Guest Services
        return PoiCategory.GUEST_SERVICES;
      case 1377: // Shopping
        return PoiCategory.SHOP;
      case 1378: // Dining
        return PoiCategory.RESTAURANT;
      case 1382: // Activities
        return PoiCategory.ATTRACTION;
      case 1409: // Restrooms
        return PoiCategory.TOILETS;
      case 1424: // ATMs
        return PoiCategory.ATM;
      case 1566: // First Aid
        return PoiCategory.FIRSTAID;
      case 1567: // Lockers
        return PoiCategory.LOCKERS;
      case 1568: // Baby Care
        return PoiCategory.GUEST_SERVICES;
      case 1571: // Play Areas
        return PoiCategory.PLAYGROUND;
      case 1573: // Entertainment
        return PoiCategory.SHOW;
      case 1743: // Restrooms
      case 5200: // Family Restrooms
      case 2046: // Family Restrooms
        return PoiCategory.TOILETS;
      case 5054: // Quick Bites
        return PoiCategory.RESTAURANT;
      case 5056: // Casual Dining
        return PoiCategory.RESTAURANT;
      case 5058: // Beverages
        return PoiCategory.RESTAURANT;
      case 5059: // Restaurant Dining
        return PoiCategory.RESTAURANT;
      case 1570:
        return PoiCategory.WATER_FOUNTAIN;
      default:
        return PoiCategory.UNDEFINED;
    }
  }

  getDefaultLanguage(): string {
    return 'en-US';
  }
}
