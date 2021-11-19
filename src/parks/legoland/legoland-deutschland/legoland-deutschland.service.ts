import { Injectable } from '@nestjs/common';
import { AttractionsIoThemeParkService } from '../../../_services/attractions-io-theme-park/attractions-io-theme-park.service';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { Poi } from '../../../_interfaces/poi.interface';
import { AttractionsIoAppDetailsInterface } from '../../../_interfaces/attractions-io/attractions-io-app-details.interface';

@Injectable()
export class LegolandDeutschlandService extends AttractionsIoThemeParkService {
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

  async getPois(): Promise<Poi[]> {
    await this.getDataUrl().then(value => {
      console.log(value);
    });

    return [];
  }
}
