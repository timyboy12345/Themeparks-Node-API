import { Injectable } from '@nestjs/common';
import { AioThemeparkService } from '../../_services/aio/aio-themepark.service';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { PoiCategory } from '../../_interfaces/poi-categories.enum';
import { AttractionsIoAppDetailsInterface } from '../../_interfaces/attractions-io/attractions-io-app-details.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';

@Injectable()
export class ChessingtonResortService extends AioThemeparkService {
  getInfo(): ThemePark {
    return {
      id: 'chessington-resort',
      name: 'Chessington world of Adventures',
      description: 'Chessington World of Adventures is een attractiepark, dierentuin en een hotelcomplex dat ligt in Centraal-Londen, Engeland. Het park werd onder de naam Chessington Zoo geopend in 1931. Naast de dierentuin werd door The Tussauds Group een pretpark gebouwd.',
      image: 'https://i2-prod.liverpoolecho.co.uk/incoming/article16108222.ece/ALTERNATES/s1200b/0_CS75068432.jpg',
      parkType: ParkType.THEMEPARK,
      countryCode: 'gb',
      timezone: 'Europe/London',
      location: {
        lat: 51.350407,
        lng: -0.316195
      }
    };
  }

  getSupports(): ThemeParkSupports {
    const supports = super.getSupports();
    supports.supportsAnimals = true;
    return supports;
  }

  getInstallationRequestBody(): string {
    return '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="device_identifier"\n' +
      '\n' +
      'FED2373B-6FD4-49E8-8925-FB6DB74BAD52\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="app_version"\n' +
      '\n' +
      '3.3\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="app_build"\n' +
      '\n' +
      '457\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="user_identifier"\n' +
      '\n' +
      '030DBCD0-62E7-4BD8-A409-3BDA072C673C\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc--\n' +
      '\n';
  }

  getApiKey(): string {
    return '307f27cd-2be1-4b43-aee8-7832cfadb85f';
  }

  getAppDetails(): AttractionsIoAppDetailsInterface {
    return {
      appBuild: '834',
      userAgent: 'Chessington/457 CFNetwork/1240.0.4 Darwin/20.6.0',
      platform: 'iOS',
      platformVersion: '14.8',
      contentType: 'multipart/form-data; boundary=s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc',
      latestUpdate: '2021-08-19T11:59:06+02:00',
    };
  }

  getCategory(category: number): PoiCategory {
    switch (category) {
      case 465:
      case 1589:
        // Little Rangers
      case 1590:
        // Family Explorers
      case 1691:
        // Brave Adventurers
        return PoiCategory.ATTRACTION;
      case 466:
      case 1778:
        // Zoo90
        return PoiCategory.ANIMAL;
      case 467:
      case 1597:
      case 1598:
      case 1599:
      case 1626:
      case 1706:
        // Sweets & Treats
        return PoiCategory.RESTAURANT;
      case 468:
        return PoiCategory.GUEST_SERVICES;
      case 469:
      case 1594:
        // Live Shows
      case 1595:
        // Character Meet & Greets
      case 1596:
        // Story Time
      case 1810:
        // Animal Talks, Feeds & Presentation
      case 1666:
        // Zoo Encounters
      case 1809:
        // Zoo Areas
        return PoiCategory.SHOW;
      case 470:
      case 1627:
      case 1600:
        // Gift Shops
      case 1601:
        // Sweets & Treats
      case 1602:
        // Photography
        return PoiCategory.SHOP;
      case 1060:
        return PoiCategory.HOTEL;
      case 1605:
        return PoiCategory.TOILETS;
      case 1606:
        return PoiCategory.LOCKERS;
      case 1607:
      case 1628:
      case 1679:
        return PoiCategory.ATM;
      case 1539:
      case 1613:
        return PoiCategory.PARKING;
      case 1614:
        return PoiCategory.FIRSTAID;
      case 1624:
      case 1625:
        return PoiCategory.TOILETS;
      case 1407:
        return PoiCategory.PLAYGROUND;
      case 1609:
      case 1631:
        return PoiCategory.SMOKING_AREA;
      default:
        return PoiCategory.UNDEFINED;
    }
    // {
    //   "_id": 1325,
    //   "Name": "Howl’o’ween ",
    //   "Icon": "166e1956-8893-5293-bd3f-b6a1ac4867c8",
    //   "Parent": null
    // },
    // {
    //   "_id": 1406,
    //   "Name": "Winter's Tail",
    //   "Icon": "4d998590-f6fc-5205-93cb-300211ef9361",
    //   "Parent": null
    // },
    // {
    //   "_id": 1592,
    //   "Name": "Animal Encounters ",
    //   "Icon": "0058f8ef-558e-5dd1-8bbc-2842a1d2d58a",
    //   "Parent": 466
    // },
    // {
    //   "_id": 1593,
    //   "Name": "Zoo Experiences",
    //   "Icon": "1aaa029b-e909-5bfa-a3bf-566555743563",
    //   "Parent": 466
    // },
    // {
    //   "_id": 1603,
    //   "Name": "Guest Help & Information",
    //   "Icon": "fd9b7e13-46d4-56b8-8886-1df25fcdbde9",
    //   "Parent": 468
    // },
    // {
    //   "_id": 1604,
    //   "Name": "Fastrack, VIP & Annual Passes ",
    //   "Icon": "c1eb219b-f8b1-5881-8a52-ad79efb3557e",
    //   "Parent": 468
    // },
    // {
    //   "_id": 1608,
    //   "Name": "Phone Charging",
    //   "Icon": "4dc6c21b-9488-5a65-bc2b-7c2731fa02e3",
    //   "Parent": 468
    // },
    // {
    //   "_id": 1609,
    //   "Name": "Smoking Areas",
    //   "Icon": "3c0169ee-0014-59b6-9a21-d9832890ca50",
    //   "Parent": 468
    // },
    // {
    //   "_id": 1610,
    //   "Name": "Picnic Areas ",
    //   "Icon": "3c4a3d1f-9522-5e92-a9c6-66a758ff204c",
    //   "Parent": 468
    // },
    // {
    //   "_id": 1611,
    //   "Name": "Wild Learning Centre ",
    //   "Icon": "cc9f4632-6f0d-5dde-8c4c-271f0efee047",
    //   "Parent": 468
    // },
    // {
    //   "_id": 1612,
    //   "Name": "Entrance / Exit Gate",
    //   "Icon": "ac3f8dcb-3f38-59ff-8f49-a781299f8cfb",
    //   "Parent": 1539
    // },
    // {
    //   "_id": 1629,
    //   "Name": "Feedback Survey",
    //   "Icon": "547e1bf5-6626-5675-8120-c0eebf121937",
    //   "Parent": 1060
    // },
    // {
    //   "_id": 1630,
    //   "Name": "Feedback Survey",
    //   "Icon": "24b8f7de-3f36-5ec6-bb43-ce2d565a14e0",
    //   "Parent": 468
    // },
    // {
    //   "_id": 1632,
    //   "Name": "Public Transport",
    //   "Icon": "0c7486c8-d069-5c4f-bc39-7e5ce1e38c25",
    //   "Parent": 1539
    // },
    // {
    //   "_id": 1674,
    //   "Name": "Wilderfest",
    //   "Icon": "eaf471a6-1a9e-586b-84f5-d40e6fd30b60",
    //   "Parent": null
    // },
    // {
    //   "_id": 1675,
    //   "Name": "FEB'ROAR'Y",
    //   "Icon": "6c3afc60-f073-5166-9b61-560abf4392f2",
    //   "Parent": null
    // },
    // {
    //   "_id": 1722,
    //   "Name": "Movie Time",
    //   "Icon": "e54c8ac6-1007-569d-beb3-eb79f4596e7f",
    //   "Parent": 469
    // },
  }
}
