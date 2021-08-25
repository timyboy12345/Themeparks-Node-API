import { Injectable } from '@nestjs/common';
import { Poi } from '../../../../_interfaces/poi.interface';
import { DisneylandParisAttraction } from '../interfaces/disneyland-paris-attraction.interface';
import { PoiCategory } from '../../../../_interfaces/poi-categories.enum';
import { RideCategory } from '../../../../_interfaces/ride-category.interface';
import { TransferService } from '../../../../_services/transfer/transfer.service';

@Injectable()
export class DisneylandParisTransferService extends TransferService {
  public transferPoiToPoi(disneylandParisPoi: DisneylandParisAttraction): Poi {
    let c: PoiCategory;

    switch (disneylandParisPoi.entityType) {
      case 'attractions':
        c = PoiCategory.ATTRACTION;
        break;
      case 'restaurant':
      case 'dinnershow':
      case 'diningevent':
      case 'dining':
        c = PoiCategory.RESTAURANT;
        break;
      case 'shop':
      case 'shopping':
        c = PoiCategory.SHOP;
        break;
      case 'entertainment':
      case 'tour':
        c = PoiCategory.SHOW;
        break;
      case 'services':
      case 'guestservice':
        c = PoiCategory.SERVICE;
        break;
      case 'event':
      case 'events':
        c = PoiCategory.EVENT;
        break;
      case 'resorts':
        c = PoiCategory.HOTEL;
        break;
      case 'recreation':
      case 'spa':
      case 'sponsor':
      default:
        c = PoiCategory.UNDEFINED;
        break;
    }

    const poi: Poi = {
      id: disneylandParisPoi.id,
      category: c,
      title: disneylandParisPoi.name,
      website_url: disneylandParisPoi.url,
      fastpass: disneylandParisPoi.fastPass,
      singleRider: disneylandParisPoi.singleRider,
      original: disneylandParisPoi,
      original_category: disneylandParisPoi.entityType,
    };

    if (disneylandParisPoi.coordinates && disneylandParisPoi.coordinates.length > 0) {
      poi.location = {
        lat: disneylandParisPoi.coordinates[0].lat,
        lng: disneylandParisPoi.coordinates[0].lng,
      };
    }

    const media = [];

    if (disneylandParisPoi.heroMedia) {
      media.push(disneylandParisPoi.heroMedia.url);
    }

    if (disneylandParisPoi.squareMediaMobile) {
      media.push(disneylandParisPoi.squareMediaMobile.url);
    }

    poi.images = media;
    if (media.length > 0) {
      poi.image_url = media[0];
    }

    if (disneylandParisPoi.age && disneylandParisPoi.age.length > 0) {
      // Age IDs: ['allAges', 'kids', 'preschoolers', 'tweens', 'teens', 'adults']
      if (disneylandParisPoi.age.filter(age => age.id == 'allAges').length > 0) {
        poi.rideCategory = RideCategory.FAMILY;
      } else if (disneylandParisPoi.age.filter(age => age.id === 'tweens' || age.id === 'teens' || age.id === 'adults').length > 0) {
        poi.rideCategory = RideCategory.THRILL;
      } else if (disneylandParisPoi.age.filter(age => age.id == 'preschoolers' || age.id === 'kids').length > 0) {
        poi.rideCategory = RideCategory.KIDS;
      } else {
        poi.rideCategory = RideCategory.UNDEFINED;
      }
    }

    return poi;
  }
}
