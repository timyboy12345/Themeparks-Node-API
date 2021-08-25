import { Injectable } from '@nestjs/common';
import { Poi } from '../../../_interfaces/poi.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { RideCategory } from '../../../_interfaces/ride-category.interface';
import { TransferService } from '../../../_services/transfer/transfer.service';
import {
  ParcAsterixAttractionsExperienceEnum,
  ParcAsterixResponseAttractionInterface,
  ParcAsterixResponseRestaurantInterface,
  ParcAsterixResponseShowInterface,
} from '../interfaces/parc-asterix-response.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ParcAsterixTransferService extends TransferService {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  transferPoiToPoi(parcAsterixPoi: ParcAsterixResponseAttractionInterface | ParcAsterixResponseShowInterface | ParcAsterixResponseRestaurantInterface): Poi {
    const baseUrl = this.configService.get('PARC_ASTERIX_API_URL');

    const p: Poi = {
      id: parcAsterixPoi.id,
      title: parcAsterixPoi.title,
      subTitle: parcAsterixPoi.summary,
      description: parcAsterixPoi.description,
      category: PoiCategory.UNDEFINED,
      original: parcAsterixPoi,
    };

    // if (parcAsterixPoi.headerV2) {
    //   p.image_url =
    // } else if (parcAsterixPoi.headerV1) {
    //
    // }

    if (parcAsterixPoi.sliders) {
      p.images = parcAsterixPoi.sliders.map(slider => `${baseUrl}${slider.picture}`);
    }

    return p;
  }

  public transferRideToPoi(parcAsterixPoi: ParcAsterixResponseAttractionInterface): Poi {
    let rideCategory: RideCategory = RideCategory.UNDEFINED;

    if (parcAsterixPoi.experience) {
      switch (parcAsterixPoi.experience.id) {
        case ParcAsterixAttractionsExperienceEnum.Petits_Gaulois:
          rideCategory = RideCategory.KIDS;
          break;
        case ParcAsterixAttractionsExperienceEnum.Pour_toute_la_famille:
          rideCategory = RideCategory.FAMILY;
          break;
        case ParcAsterixAttractionsExperienceEnum.Sensations_fortes:
          rideCategory = RideCategory.THRILL;
          break;
        default:
          break;
      }
    }

    const poi = this.transferPoiToPoi(parcAsterixPoi);

    poi.category = PoiCategory.ATTRACTION;
    poi.rideCategory = rideCategory;
    poi.featured = parcAsterixPoi.isBest;
    poi.photoPoint = parcAsterixPoi.hasPicturePoint;

    if (parcAsterixPoi.latitude && parcAsterixPoi.longitude) {
      poi.location = {
        lat: parcAsterixPoi.latitude,
        lng: parcAsterixPoi.longitude,
      };
    }

    return poi;
  }

  transferShowToPoi(show: any): Poi {
    const p = this.transferPoiToPoi(show);
    p.category = PoiCategory.SHOW;
    return p;
  }

  transferRestaurantToPoi(restaurant: any): Poi {
    const p = this.transferPoiToPoi(restaurant);
    p.category = PoiCategory.RESTAURANT;
    return p;
  }

  transferHotelToPoi(hotel: any): Poi {
    const p = this.transferPoiToPoi(hotel);
    p.category = PoiCategory.HOTEL;
    return p;
  }
}
