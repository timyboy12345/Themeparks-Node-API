import { Injectable } from '@nestjs/common';
import { AioThemeparkService } from '../../_services/aio/aio-themepark.service';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { AttractionsIoAppDetailsInterface } from '../../_interfaces/attractions-io/attractions-io-app-details.interface';
import { PoiCategory } from '../../_interfaces/poi-categories.enum';

@Injectable()
export class PaultonsParkService extends AioThemeparkService{
  getInfo(): ThemePark {
    return {
      id: 'paultons-park',
      name: 'Paultons Park',
      image: 'https://www.railwayhotelfordingbridge.com/wp-content/uploads/2020/08/p.jpeg',
      description: 'Paultons Park is een pretpark in het New Forest National Park, in de buurt van het dorp Ower, in Hampshire, Engeland, met meer dan 70 attracties en attracties. Het themagebied Peppa Pig World is gebaseerd op de animatieserie Peppa Pig voor kinderen. Het themagebied Lost Kingdom omvat 27 animatronic-dinosaurussen.',
      timezone: 'Europe/London',
      location: {
        lat: 50.9489,
        lng: -1.5524
      },
      countryCode: 'gb',
      parkType: ParkType.THEMEPARK,
    }
  }

  getApiKey(): string {
    return "11a7c342-a6fd-443f-91be-9fa31d6caa5d";
  }

  getInstallationRequestBody(): string {
    return "--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n" +
      "Content-Disposition: form-data; name=\"app_build\"\n" +
      "\n" +
      "186\n" +
      "--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n" +
      "Content-Disposition: form-data; name=\"app_version\"\n" +
      "\n" +
      "7.4\n" +
      "--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n" +
      "Content-Disposition: form-data; name=\"user_identifier\"\n" +
      "\n" +
      "15E9D100-1D51-46DE-B245-7A0A24FC04B3\n" +
      "--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n" +
      "Content-Disposition: form-data; name=\"device_identifier\"\n" +
      "\n" +
      "BC754A39-BA04-4EEE-8F09-83827E12463B\n" +
      "--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc--\n" +
      "\n"
  }

  getAppDetails(): AttractionsIoAppDetailsInterface {
    return {
      appBuild: '186',
      userAgent: 'Paultons%20Park/186 CFNetwork/1240.0.4 Darwin/20.6.0',
      contentType: 'multipart/form-data; boundary=s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc',
      platformVersion: '14.8',
      platform: 'iOS',
      latestUpdate: '2021-07-19T13:02:44+02:00'
    }
  }

  getCategory(category: number): PoiCategory {
    switch (category) {
      case 527:
        return PoiCategory.ATTRACTION;
      case 528:
      case 968:
        // Pre-order
        return PoiCategory.RESTAURANT;
      case 529:
        return PoiCategory.SHOP;
      case 530:
      case 546:
        return PoiCategory.GUEST_SERVICES;
      case 534:
        return PoiCategory.SHOW;
      case 535:
        return PoiCategory.ANIMAL;
      case 543:
        // Accessible Changing Facilities
      case 544:
        // Baby Care Centres
        return PoiCategory.TOILETS;
      case 545:
        return PoiCategory.FIRSTAID;
      case 549:
        return PoiCategory.SMOKING_AREA;
      case 550:
        return PoiCategory.TOILETS;
      case 551:
        return PoiCategory.LOCKERS;
      case 547:
        // People Dryers
      case 548:
        // Phone Chargers
      case 1237:
        // Hand Wash Stations
      default:
        return PoiCategory.UNDEFINED;
    }
  }
}
