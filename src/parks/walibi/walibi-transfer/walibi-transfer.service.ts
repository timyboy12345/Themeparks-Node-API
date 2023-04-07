import { Injectable } from '@nestjs/common';
import { Poi } from '../../../_interfaces/poi.interface';
import { WalibiEntertainment } from '../interfaces/walibi-entertainment.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { RideCategory } from '../../../_interfaces/ride-category.interface';
import { TransferService } from '../../../_services/transfer/transfer.service';

@Injectable()
export class WalibiTransferService extends TransferService {
  public transferPoiToPoi(walibiPoi: WalibiEntertainment): Poi {
    let category: { poiCategory: PoiCategory; rideCategory?: RideCategory } = {
      poiCategory: PoiCategory.UNDEFINED,
      rideCategory: RideCategory.UNDEFINED
    };

    if (walibiPoi.category && walibiPoi.category.name) {
      category = this.getCategory(walibiPoi.category.name);
    }

    const poi: Poi = {
      id: walibiPoi.uuid,
      title: walibiPoi.title,
      description: walibiPoi.description,
      category: category.poiCategory,
      original_category: walibiPoi.category?.name ?? "0",
      rideCategory: category.rideCategory,
      original: walibiPoi,
      image_url: walibiPoi.image.url,
      previewImage: walibiPoi.image.thumbnailUrl
    };

    if (walibiPoi.location) {
      poi.location = {
        lat: parseFloat(walibiPoi.location.lat),
        lng: parseFloat(walibiPoi.location.lon),
      };
    }

    if (walibiPoi.parameters) {
      poi.facts = [];

      walibiPoi.parameters.forEach((param) => {
        switch (param.title) {
          case 'min accompagnied height':
          case 'taille min accompagné':
            poi.minSizeWithEscort = Number.parseInt(param.value);
            break;
          case 'min height alone':
          case 'taille minimum':
            poi.minSizeWithoutEscort = Number.parseInt(param.value);
            break;
          case 'Max height':
          case 'Max. lengte':
            poi.maxSize = Number.parseInt(param.value);
            break;
          case 'Height':
          case 'Baanhoogte':
            poi.facts.push({value: param.value, type: 'height', id: 'height'})
            break;
          case 'Length':
          case 'Baanlengte':
            poi.facts.push({value: param.value, type: 'length', id: 'length'})
            break;
          case 'Duur':
            poi.facts.push({value: param.value, type: 'duration', id: 'duration'})
            break;
          case 'Speed':
          case 'Snelheid':
            poi.facts.push({value: param.value, type: 'speed', id: 'speed'})
            break;
          case 'Looping':
            poi.facts.push({value: param.value, type: 'inversion_count', id: 'inversion_count'})
            break;
          case 'Capacité':
            poi.facts.push({value: param.value, type: 'capacity', id: 'capacity'})
            break;
          default:
            break;
        }
      })
    }

    if (walibiPoi.additionalContent && walibiPoi.additionalContent.length > 0) {
      poi.subTitle = walibiPoi.additionalContent[0].title;
      poi.description = walibiPoi.additionalContent[0].text;
    }

    return poi;
  }

  public transferShopToPoi(ride: any): Poi {
    return this.transferPoiToPoi(ride);
  }

  public transferShowToPoi(ride: any): Poi {
    return this.transferPoiToPoi(ride);
  }

  public transferRideToPoi(ride: any): Poi {
    return this.transferPoiToPoi(ride);
  }

  public transferRestaurantToPoi(ride: any): Poi {
    return this.transferPoiToPoi(ride);
  }

  private getCategory(category: string): { poiCategory: PoiCategory, rideCategory?: RideCategory } {
    switch (category) {
      case 'Toiletten':
      case 'Toilets':
      case 'Toilettes':
        return {
          poiCategory: PoiCategory.TOILETS,
        };
      case 'Kids':
      case 'Enfants':
        return {
          poiCategory: PoiCategory.ATTRACTION,
          rideCategory: RideCategory.KIDS,
        };
      case 'Thrilling':
      case 'Exciting':
      case 'Thrills':
      case 'Sensational':
      case 'Sensations':
        return {
          poiCategory: PoiCategory.ATTRACTION,
          rideCategory: RideCategory.THRILL,
        };
      case 'Familie':
      case 'Family':
      case 'Fun':
      case 'Familles':
        return {
          poiCategory: PoiCategory.ATTRACTION,
          rideCategory: RideCategory.FAMILY,
        };
      case 'Restaurant':
      case 'Barbecue':
      case 'Meals':
      case 'Restauration classique':
      case 'Restauration rapide':
        return {
          poiCategory: PoiCategory.RESTAURANT,
        };
      case 'Frituur':
      case 'Friterie':
      case 'Snacks':
      case 'Snacks & drinks':
      case 'Ice cream':
      case 'Sandwicherie':
      case 'Kiosque':
        return {
          poiCategory: PoiCategory.SNACKBAR,
        };
      case 'Change bébé':
        return {
          poiCategory: PoiCategory.UNDEFINED
        }
      case 'Shop':
      case 'Souvenirs':
        return {
          poiCategory: PoiCategory.SHOP
        }
      case 'Lockers':
      case 'Reception':
        return {
          poiCategory: PoiCategory.SERVICE
        }
      case 'FirstAid':
      case 'Premiers secours':
        return {
          poiCategory: PoiCategory.FIRSTAID
        }
      case 'Parking autocars':
      case 'Parking voitures':
        return {
          poiCategory: PoiCategory.PARKING
        }
      case 'Accueil point info':
        return {
          poiCategory: PoiCategory.GUEST_SERVICES
        }
      case 'Zone fumeur':
        return {
          poiCategory: PoiCategory.SMOKING_AREA
        }
      case 'Distributeur de billets':
        return {
          poiCategory: PoiCategory.ATM
        }
      case 'Zones effrayantes':
      case 'Maisons hantées':
        return {
          poiCategory: PoiCategory.HALLOWEEN_EVENT
        }
      default:
        return {
          poiCategory: PoiCategory.UNDEFINED
        }
    }
  }
}
