import { Injectable } from '@nestjs/common';
import { AioThemeparkService } from '../../_services/aio/aio-themepark.service';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import {
  AttractionsIoAppDetailsInterface,
} from '../../_interfaces/attractions-io/attractions-io-app-details.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { PoiCategory } from '../../_interfaces/poi-categories.enum';

@Injectable()
export class GardalandService extends AioThemeparkService {
  getInfo(): ThemePark {
    return {
      countryCode: 'it',
      description: 'Gardaland is een resort bij Castelnuovo del Garda aan het Gardameer. Het attractiepark werd geopend in juli 1975 en is sindsdien, met meer dan 2,5 miljoen bezoekers per jaar, uitgegroeid tot het grootste en populairste attractiepark in Italië',
      id: 'gardaland',
      image: 'https://www.gardaland.it/media/1wzlpokx/panoramiche-006.jpg',
      name: 'Gardaland',
      parkType: ParkType.THEMEPARK,
      location: {
        lat: 45.45624514532554,
        lng: 10.713386930685767,
      },
      timezone: 'Europe/Italy',
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
      supportsHalloween: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: true,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsRides: true,
      supportsShopOpeningTimes: false,
      supportsShops: false,
      supportsShowTimes: false,
      supportsShows: true,
      supportsTranslations: false,
    };
  }

  getAppDetails(): AttractionsIoAppDetailsInterface {
    return {
      appBuild: '134',
      platformVersion: '3.6.6',
      userAgent: 'Gardaland/134 CFNetwork/1474 Darwin/23.0.0',
      platform: 'iOS',
      latestUpdate: '2023-10-30T11:43:44+01:00',
      contentType: 'multipart/form-data; boundary=s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc'
    }
  }

  getApiKey(): string {
    return 'ab9f17bb-92e5-4ff5-8009-4bca4e4b92fe'
  }

  getInstallationRequestBody(): string {
    return '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="device_identifier"\n' +
      '\n' +
      'B1D2F681-44EB-448D-BD30-48B0BE854741\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="user_identifier"\n' +
      '\n' +
      'A18F5422-AD9B-48C7-9A09-7FA7383B4D13\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="app_version"\n' +
      '\n' +
      '3.6.6\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc\n' +
      'Content-Disposition: form-data; name="app_build"\n' +
      '\n' +
      '134\n' +
      '--s47UC4ujBvwu4tUZny16oB9EYPIK2lYen2gqiaI3cG8N2xg2xG4CuZ88uVFUzeVBcHglTSA5twz4fJCrDwgWt1vy0Ff8gIwp3DPc--\n' +
      '\n'
  }

  getCategory(category: number): PoiCategory {
    switch (category) {
      case 672:
        return PoiCategory.ATTRACTION;
      case 673:
        return PoiCategory.SHOW;
      case 674:
      case 696:
      // Table Service
      case 697:
      // Fast Food
      case 698:
        // Bar
        return PoiCategory.RESTAURANT;
      case 675:
        return PoiCategory.GUEST_SERVICES;
      case 676:
        return PoiCategory.SHOP;
      case 688:
        return PoiCategory.HOTEL;
      case 690:
        return PoiCategory.PARKING;
      case 703:
        return PoiCategory.TOILETS;
      case 691:
      // Fantasy
      case 692:
      // Adventure
      case 689:
      // AQUARIUM
      case 693:
      // Adrenaline
      case 694:
      // For Families
      case 695:
        // For Kids
        return PoiCategory.UNDEFINED;
      // {
      //   "_id": 699,
      //   "Name": {
      //   "en-GB": "Gluten free Kiosk",
      //     "it-IT": "Chiosco cibo senza glutine",
      //     "de-DE": "Gluten free Kiosk"
      // },
      //   "Icon": null,
      //   "Parent": 674
      // },
      // {
      //   "_id": 700,
      //   "Name": {
      //   "en-GB": "Sandwich Shop",
      //     "it-IT": "Paninoteche",
      //     "de-DE": "Sandwich-Shop"
      // },
      //   "Icon": null,
      //   "Parent": 674
      // },
      // {
      //   "_id": 701,
      //   "Name": {
      //   "en-GB": "Gardaland Express",
      //     "it-IT": "Gardaland Express",
      //     "de-DE": "Gardaland Express"
      // },
      //   "Icon": null,
      //   "Parent": 675
      // },
      // {
      //   "_id": 702,
      //   "Name": {
      //   "en-GB": "Nursery",
      //     "it-IT": "Nursery",
      //     "de-DE": "Nursery"
      // },
      //   "Icon": null,
      //   "Parent": 675
      // },
      // {
      //   "_id": 704,
      //   "Name": {
      //   "en-GB": "Info Point",
      //     "it-IT": "Informazioni",
      //     "de-DE": "Info"
      // },
      //   "Icon": null,
      //   "Parent": 675
      // },
      // {
      //   "_id": 705,
      //   "Name": {
      //   "en-GB": "Welcome Desk",
      //     "it-IT": "Welcome Desk",
      //     "de-DE": "Welcome Desk"
      // },
      //   "Icon": null,
      //   "Parent": 675
      // },
      // {
      //   "_id": 706,
      //   "Name": {
      //   "en-GB": "Baggage Deposit",
      //     "it-IT": "Deposito Custodito",
      //     "de-DE": "Gepäckaufbewahrung"
      // },
      //   "Icon": null,
      //   "Parent": 675
      // },
      // {
      //   "_id": 707,
      //   "Name": {
      //   "en-GB": "Mailbox",
      //     "it-IT": "Cassetta Postale",
      //     "de-DE": "Briefkasten"
      // },
      //   "Icon": null,
      //   "Parent": 675
      // },
      // {
      //   "_id": 708,
      //   "Name": {
      //   "en-GB": "Mobile Recharge station",
      //     "it-IT": "Ricarica cellulari",
      //     "de-DE": "Mobiltelefon Aufladung"
      // },
      //   "Icon": null,
      //   "Parent": 675
      // },
      // {
      //   "_id": 709,
      //   "Name": {
      //   "en-GB": "Picnic Area",
      //     "it-IT": "Area Picnic",
      //     "de-DE": "Picknickzone"
      // },
      //   "Icon": null,
      //   "Parent": 675
      // },
      // {
      //   "_id": 710,
      //   "Name": {
      //   "en-GB": "Easy Shopping",
      //     "it-IT": "Easy Shopping",
      //     "de-DE": "Easy Shopping"
      // },
      //   "Icon": null,
      //   "Parent": 675
      // },
      // {
      //   "_id": 711,
      //   "Name": {
      //   "en-GB": "Tobacco Shop",
      //     "it-IT": "Tabacchi",
      //     "de-DE": "Tabakwaren"
      // },
      //   "Icon": null,
      //   "Parent": 675
      // },
      // {
      //   "_id": 712,
      //   "Name": {
      //   "en-GB": "Buggy Rent",
      //     "it-IT": "Noleggio passeggini",
      //     "de-DE": "Vermietung von Buggies"
      // },
      //   "Icon": null,
      //   "Parent": 675
      // },
      // {
      //   "_id": 713,
      //   "Name": {
      //   "en-GB": "ATM",
      //     "it-IT": "Bancomat",
      //     "de-DE": "Bankomat"
      // },
      //   "Icon": null,
      //   "Parent": 675
      // },
      // {
      //   "_id": 714,
      //   "Name": {
      //   "en-GB": "First Aid",
      //     "it-IT": "Primo Soccorso",
      //     "de-DE": "Erste Hilfe"
      // },
      //   "Icon": null,
      //   "Parent": 675
      // },
      // {
      //   "_id": 715,
      //   "Name": {
      //   "en-GB": "Selfie Point",
      //     "it-IT": "Punto Selfie",
      //     "de-DE": "Selfie Punkt"
      // },
      //   "Icon": null,
      //   "Parent": 675
      // },
      // {
      //   "_id": 716,
      //   "Name": {
      //   "en-GB": "Attraction with height limit",
      //     "it-IT": "Attrazione con limite di altezza",
      //     "de-DE": "Attraktion mit Höhenbegrenzung"
      // },
      //   "Icon": null,
      //   "Parent": 675
      // },
      // {
      //   "_id": 717,
      //   "Name": {
      //   "en-GB": "Adventure",
      //     "it-IT": "Avventura",
      //     "de-DE": "Abenteuer"
      // },
      //   "Icon": null,
      //   "Parent": 676
      // },
      // {
      //   "_id": 718,
      //   "Name": {
      //   "en-GB": "Teenagers",
      //     "it-IT": "Teenager",
      //     "de-DE": "Teenagers"
      // },
      //   "Icon": null,
      //   "Parent": 676
      // },
      // {
      //   "_id": 719,
      //   "Name": {
      //   "en-GB": "Kids",
      //     "it-IT": "Bambini",
      //     "de-DE": "Kinder"
      // },
      //   "Icon": null,
      //   "Parent": 676
      // },
      // {
      //   "_id": 720,
      //   "Name": {
      //   "en-GB": "Infants",
      //     "it-IT": "Neonati",
      //     "de-DE": "Säuglinge"
      // },
      //   "Icon": null,
      //   "Parent": 676
      // },
      // {
      //   "_id": 721,
      //   "Name": {
      //   "en-GB": "Sweets & Candies",
      //     "it-IT": "Dolci e caramelle",
      //     "de-DE": "Süßigkeiten & Bonbons"
      // },
      //   "Icon": null,
      //   "Parent": 676
      // },
      // {
      //   "_id": 722,
      //   "Name": {
      //   "en-GB": "Gardaland Fans",
      //     "it-IT": "Fan di Gardaland",
      //     "de-DE": "Gardaland Fans"
      // },
      //   "Icon": null,
      //   "Parent": 676
      // },
      // {
      //   "_id": 723,
      //   "Name": {
      //   "en-GB": "Clothing & Accessories",
      //     "it-IT": "Abbigliamento e Accessori",
      //     "de-DE": "Kleidung und Accessoires"
      // },
      //   "Icon": null,
      //   "Parent": 676
      // },
      // {
      //   "_id": 724,
      //   "Name": {
      //   "en-GB": "Dreams & Fairytale",
      //     "it-IT": "Sogni & Fiabe",
      //     "de-DE": "Träume und Märchen"
      // },
      //   "Icon": null,
      //   "Parent": 688
      // },
      // {
      //   "_id": 725,
      //   "Name": {
      //   "en-GB": "Adventure",
      //     "it-IT": "Adventure",
      //     "de-DE": "Abenteuer"
      // },
      //   "Icon": null,
      //   "Parent": 688
      // },
      // {
      //   "_id": 726,
      //   "Name": {
      //   "en-GB": "Enchanted Kingdom",
      //     "it-IT": "Regno Incantato",
      //     "de-DE": "Verzaubertes Königreich"
      // },
      //   "Icon": null,
      //   "Parent": 688
      // },
      // {
      //   "_id": 740,
      //   "Name": {
      //   "en-GB": "Meet & Greet",
      //     "it-IT": "Meet & Greet",
      //     "de-DE": "Meet & Greet"
      // },
      //   "Icon": "35892145-2f11-58c1-96c4-488576e6fcbf",
      //   "Parent": null
      // },
      // {
      //   "_id": 953,
      //   "Name": {
      //   "en-GB": "Kiosk",
      //     "de-DE": "Kiosk",
      //     "it-IT": "Chiosco"
      // },
      //   "Icon": "76cd453f-354a-5e31-87f9-79fa1c408ad6",
      //   "Parent": 674
      // },
      // {
      //   "_id": 955,
      //   "Name": {
      //   "en-GB": "Sandwich Shop",
      //     "de-DE": "Sandwich-Shop",
      //     "it-IT": "Paninoteca"
      // },
      //   "Icon": "149d6afc-5d6b-51c7-8c81-96eca8679b2e",
      //   "Parent": 674
      // },
      // {
      //   "_id": 956,
      //   "Name": {
      //   "en-GB": "Suitable for Everyone",
      //     "de-DE": "Für jeden geeignet",
      //     "it-IT": "Adatto a Tutti"
      // },
      //   "Icon": "3317af4a-bb38-5c70-83cf-7a4494299d33",
      //   "Parent": 673
      // },
      // {
      //   "_id": 957,
      //   "Name": {
      //   "en-GB": "Recommended for children",
      //     "de-DE": "Empfohlen für Kinder",
      //     "it-IT": "Consigliato per i Bambini"
      // },
      //   "Icon": "a4ac0f63-b604-5708-9e76-ed208d3fff8b",
      //   "Parent": 673
      // },
      // {
      //   "_id": 959,
      //   "Name": {
      //   "en-GB": "Lockers",
      //     "de-DE": "Schließfächer",
      //     "it-IT": "Armadietti"
      // },
      //   "Icon": "dae0a6bd-600c-5485-b89a-7d4b2656268c",
      //   "Parent": 675
      // },
      // {
      //   "_id": 960,
      //   "Name": {
      //   "en-GB": "Everything else",
      //     "de-DE": "Alles andere",
      //     "it-IT": "Tutto il resto"
      // },
      //   "Icon": "3f0a1079-0272-5aa2-b60d-7a148bc671cd",
      //   "Parent": 675
      // },
      // {
      //   "_id": 1705,
      //   "Name": {
      //   "it-IT": "LEGOLAND® Water Park",
      //     "en-GB": "LEGOLAND® Water Park",
      //     "de-DE": "LEGOLAND® Water Park"
      // },
      //   "Icon": "b1dfc511-afa4-50e6-9502-205b90e1a947",
      //   "Parent": null
      // },
      // {
      //   "_id": 3871,
      //   "Name": {
      //   "it-IT": "Aree Relax",
      //     "en-GB": "Relaxation Areas",
      //     "de-DE": "Relax-Bereiche"
      // },
      //   "Icon": "14a43a9b-89a5-56fa-ba03-15d90815c458",
      //   "Parent": null
      // },
      // {
      //   "_id": 3873,
      //   "Name": {
      //   "it-IT": "Aree Fumatori",
      //     "en-GB": "Smoking Area",
      //     "de-DE": "Raucherzone"
      // },
      //   "Icon": "ce503d1b-fc7c-5ad8-a589-a551939e8b8f",
      //   "Parent": 675
      // },
      // {
      //   "_id": 4072,
      //   "Name": {
      //   "it-IT": "Tricky Zucca",
      //     "en-GB": "Tricky Pumpkin",
      //     "de-DE": "Tricky Pumpkin"
      // },
      //   "Icon": "e2266174-6eaf-5546-b718-4b9f8880d4fe",
      //   "Parent": null
      // }
    }
  }
}
