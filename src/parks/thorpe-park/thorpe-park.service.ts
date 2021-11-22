import { Injectable } from '@nestjs/common';
import { AioThemeparkService } from '../../_services/aio/aio-themepark.service';
import { AttractionsIoAppDetailsInterface } from '../../_interfaces/attractions-io/attractions-io-app-details.interface';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { PoiCategory } from '../../_interfaces/poi-categories.enum';

@Injectable()
export class ThorpeParkService extends AioThemeparkService {
  getInfo(): ThemePark {
    return {
      id: 'thorpe-park',
      name: 'Thorpe Park',
      description: 'Thorpe Park is een attractiepark in het Verenigd Koninkrijk. Het park ligt in het Engelse Chertsey op een plek waar vroeger een groeve lag. Thorpe Park werd geopend in 1979 en is momenteel eigendom van de "Merlin Entertainments"-groep. In het park bevinden zich ongeveer 25 attracties',
      image: 'https://www.runnymedehotel.com/wp-content/uploads/2017/02/Thorpe-Park-Nemesis-Inferno.jpg',
      countryCode: 'gb',
      parkType: ParkType.THEMEPARK,
      timezone: 'Europe/London',
      location: {
        lat: 51.4050121037,
        lng: -0.5191569105
      }
    };
  }

  getInstallationRequestBody(): string {
    return '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="device_identifier"\n' +
      '\n' +
      '7169DA61-5F87-4741-AC24-48957EC1E382\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="user_identifier"\n' +
      '\n' +
      '2269DB47-6C8A-40F8-B305-9794B68376ED\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="app_build"\n' +
      '\n' +
      '379\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="app_version"\n' +
      '\n' +
      '2.4\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc--\n' +
      '\n';
  }

  getApiKey(): string {
    return 'a070eedc-db3a-4c69-b55a-b79336ce723f';
  }

  getAppDetails(): AttractionsIoAppDetailsInterface {
    return {
      appBuild: '379',
      platformVersion: '14.8',
      platform: 'iOS',
      userAgent: 'Thorpe%20Park/379 CFNetwork/1240.0.4 Darwin/20.6.0',
      contentType: 'multipart/form-data; boundary=s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc',
      latestUpdate: '2021-08-24T14:38:08+02:00',
    };
  }

  getCategory(category: number): PoiCategory {
    switch (category) {
      case 459:
      case 919:
      case 920:
      case 921:
        return PoiCategory.ATTRACTION;
      case 460:
      case 925:
      case 926:
      case 927:
      case 928:
        return PoiCategory.RESTAURANT;
      case 461:
        return PoiCategory.HALLOWEEN_EVENT;
      case 463:
        return PoiCategory.TOILETS;
      case 464:
        return PoiCategory.LOCKERS;
      case 531:
      case 930:
        return PoiCategory.FIRSTAID;
      case 532:
      case 931:
      case 932:
        return PoiCategory.GUEST_SERVICES;
      case 661:
        return PoiCategory.SHOP;
      case 918:
        return PoiCategory.SLIDE;
      case 934:
      case 1634:
        return PoiCategory.SMOKING_AREA;
      case 1064:
        return PoiCategory.BAR;
      case 1638:
        return PoiCategory.HOTEL;
      case 522:
      // Accessibility
      case 533:
      // Education
      case 660:
      // Facilities
      case 1635:
      // Coco-Cola freestyle
      case 1639:
      // "Info" (Hotel reception)
      default:
        return PoiCategory.UNDEFINED;
    }
    //   {
    //     "_id": 1640,
    //     "Name": "Toilets",
    //     "Icon": "f5199e68-dd5b-5121-b095-d0786195c94d",
    //     "Parent": 1638
    //   },
    //   {
    //     "_id": 1641,
    //     "Name": "Seating",
    //     "Icon": "1d1fd16e-bd29-59db-bf5a-a756d096e14f",
    //     "Parent": 1638
    //   },
    //   {
    //     "_id": 1642,
    //     "Name": "Dining",
    //     "Icon": "7a0a2f5e-c291-5abe-b869-f98a1a601fe8",
    //     "Parent": 1638
    //   },
    //   {
    //     "_id": 1643,
    //     "Name": "Shop",
    //     "Icon": "b0075a3a-6638-5876-bd7e-ab6a8e896ab8",
    //     "Parent": 1638
    //   },
    //   {
    //     "_id": 1644,
    //     "Name": "Drinks",
    //     "Icon": "a40e4b32-b263-5463-b646-c174c23683d2",
    //     "Parent": 1638
    //   },
    //   {
    //     "_id": 1645,
    //     "Name": "Smoking Area",
    //     "Icon": "88fa1189-6a94-5959-b727-5204f4acdc08",
    //     "Parent": 1638
    //   },
    //   {
    //     "_id": 1646,
    //     "Name": "Extras",
    //     "Icon": "d12fdb3b-9f51-5ffe-8264-5b1e73bfad8a",
    //     "Parent": null
    //   },
    //   {
    //     "_id": 1648,
    //     "Name": "Garden",
    //     "Icon": "e7b05e46-dda9-50af-a9e5-e37f8860fc62",
    //     "Parent": 1646
    //   },
    //   {
    //     "_id": 1649,
    //     "Name": "Misc",
    //     "Icon": "00814067-046c-5749-94d7-24bfac8082b9",
    //     "Parent": 660
    //   },
    //   {
    //     "_id": 1651,
    //     "Name": "Parking",
    //     "Icon": "b0332a88-f14d-51be-ba59-f78cd3559bcb",
    //     "Parent": 660
    //   },
    //   {
    //     "_id": 1652,
    //     "Name": "Parking",
    //     "Icon": "c2978029-6a18-55b5-810f-e4949ac40608",
    //     "Parent": 522
    //   },
    //   {
    //     "_id": 1653,
    //     "Name": "Parking",
    //     "Icon": "a8ee9ecb-d3eb-502d-a4d7-3b71f72c3f9b",
    //     "Parent": 1638
    //   },
    //   {
    //     "_id": 1655,
    //     "Name": "Picnic",
    //     "Icon": "135d80b9-0ad8-54d1-a51e-dd538627dc95",
    //     "Parent": 660
    //   },
    //   {
    //     "_id": 1657,
    //     "Name": "Intense Thrills",
    //     "Icon": "08482861-dabc-564d-a64f-212a5a6b3190",
    //     "Parent": 459
    //   },
    //   {
    //     "_id": 1658,
    //     "Name": "Coasters",
    //     "Icon": "a0d4bebc-ab01-5d90-b683-d84166aceda9",
    //     "Parent": 459
    //   },
    //   {
    //     "_id": 1659,
    //     "Name": "Intense Thrills - Coasters",
    //     "Icon": "5ee58724-8209-50d5-826d-7746c36d2753",
    //     "Parent": 459
    //   },
    //   {
    //     "_id": 1661,
    //     "Name": "Exhilarating Fun - Water Rides",
    //     "Icon": "4370ac19-74ad-5185-983f-e347c17e00c5",
    //     "Parent": 459
    //   },
    //   {
    //     "_id": 1664,
    //     "Name": "Water",
    //     "Icon": "8eb2187e-18de-5874-990c-6a099fb2a8ec",
    //     "Parent": 660
    //   },
    //   {
    //     "_id": 1668,
    //     "Name": "Picnic Area",
    //     "Icon": "3e7d45c4-c55b-5a9f-a09b-1d32219f6cbb",
    //     "Parent": 660
    //   },
    //   {
    //     "_id": 1669,
    //     "Name": "Food & Drink",
    //     "Icon": "933bb7b7-b7e7-5b32-874a-7821bd2c52ec",
    //     "Parent": 459
    //   },
    //   {
    //     "_id": 1681,
    //     "Name": "🧇 test",
    //     "Icon": "f5cd71b3-07f5-50bb-8963-5791886766de",
    //     "Parent": null
    //   },
    //   {
    //     "_id": 1702,
    //     "Name": "Drinks & Snacks",
    //     "Icon": "cff9bdd8-d08c-5ac4-8a5a-fa0f601bd9b3",
    //     "Parent": 460
    //   },
    //   {
    //     "_id": 1777,
    //     "Name": "Toilets",
    //     "Icon": "14e2ac92-b61d-5c25-b6a3-f7f00951e654",
    //     "Parent": 660
    //   },
    //   {
    //     "_id": 1786,
    //     "Name": "Intense Thrills",
    //     "Icon": "c226840d-5348-5f12-ba9c-df5500be2722",
    //     "Parent": 459
    //   },
    //   {
    //     "_id": 1787,
    //     "Name": "Exhilarating Fun",
    //     "Icon": "a3ccc1d8-b974-52dd-a589-059b3fb79f31",
    //     "Parent": 459
    //   },
    //   {
    //     "_id": 1788,
    //     "Name": "Little Thrills",
    //     "Icon": "f03c8e73-7a8f-588f-aa3c-0fd3f06f9f25",
    //     "Parent": 459
    //   },
    //   {
    //     "_id": 1802,
    //     "Name": "Test",
    //     "Icon": "da94deac-93c8-5c14-ae4a-6d22e3cd252e",
    //     "Parent": null
    //   },
    //   {
    //     "_id": 1917,
    //     "Name": "Food",
    //     "Icon": "a27fd66d-2d4f-54c1-b7d1-b206151b8ed3",
    //     "Parent": 461
    //   },
    //   {
    //     "_id": 1918,
    //     "Name": "Live Music",
    //     "Icon": "73760149-2bc3-5759-b85d-10ea0e97ce29",
    //     "Parent": 461
    //   },
    //   {
    //     "_id": 1919,
    //     "Name": "Show",
    //     "Icon": "48544c69-6248-5aa1-8c6c-fc076122b290",
    //     "Parent": 461
    //   },
    //   {
    //     "_id": 1920,
    //     "Name": "Drinks",
    //     "Icon": "4d09034f-e10c-5bd7-b151-df04cec22756",
    //     "Parent": 461
    //   },
    //   {
    //     "_id": 2016,
    //     "Name": "Events",
    //     "Icon": "7621a95b-756a-5563-9d01-b5d0797f0948",
    //     "Parent": null
    //   },
    //   {
    //     "_id": 2019,
    //     "Name": "FRIGHT NIGHTS",
    //     "Icon": "7f99eba8-a829-52ea-989c-dee4b2a515fb",
    //     "Parent": 461
    //   },
    //   {
    //     "_id": 2042,
    //     "Name": "LEGACY Hint Hunt Clues",
    //     "Icon": "b604a0aa-433d-5b64-b6de-e45dd6116223",
    //     "Parent": null
    //   },
    //   {
    //     "_id": 2051,
    //     "Name": "Sweet Snacks",
    //     "Icon": "5ee25cde-86bd-5aae-8e9d-9a857fed87b8",
    //     "Parent": null
    //   }
  }
}
