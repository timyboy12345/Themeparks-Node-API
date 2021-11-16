import { Injectable } from '@nestjs/common';
import { Poi } from '../../../_interfaces/poi.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { RideCategory } from '../../../_interfaces/ride-category.interface';
import { TransferService } from '../../../_services/transfer/transfer.service';
import {
  ParcAsterixAttractionsExperienceEnum,
  ParcAsterixResponseAttractionInterface, ParcAsterixResponseHotelInterface,
  ParcAsterixResponseRestaurantInterface,
  ParcAsterixResponseShowInterface,
} from '../interfaces/parc-asterix-response.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ParcAsterixTransferService extends TransferService {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  transferPoiToPoi(parcAsterixPoi: ParcAsterixResponseAttractionInterface | ParcAsterixResponseShowInterface | ParcAsterixResponseRestaurantInterface | ParcAsterixResponseHotelInterface): Poi {
    const baseImageUrl = this.configService.get('PARC_ASTERIX_IMAGE_URL');

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
      p.images = parcAsterixPoi.sliders.map(slider => `${baseImageUrl}/${slider.picture}`);

      if (p.images && p.images.length > 0) {
        p.image_url = p.images[0];
      }
    }

    return p;
  }

  public transferRideToPoi(parcAsterixPoi: ParcAsterixResponseAttractionInterface): Poi {
    const baseImageUrl = this.configService.get('PARC_ASTERIX_IMAGE_URL');
    const poi = this.transferPoiToPoi(parcAsterixPoi);

    poi.category = PoiCategory.ATTRACTION;
    poi.featured = parcAsterixPoi.isBest;
    poi.photoPoint = parcAsterixPoi.hasPicturePoint;

    if (parcAsterixPoi.latitude && parcAsterixPoi.longitude) {
      poi.location = {
        lat: parcAsterixPoi.latitude,
        lng: parcAsterixPoi.longitude,
      };
    }

    if (parcAsterixPoi.experience) {
      switch (parcAsterixPoi.experience.id) {
        case ParcAsterixAttractionsExperienceEnum.Petits_Gaulois:
          poi.rideCategory = RideCategory.KIDS;
          break;
        case ParcAsterixAttractionsExperienceEnum.Pour_toute_la_famille:
          poi.rideCategory = RideCategory.FAMILY;
          break;
        case ParcAsterixAttractionsExperienceEnum.Sensations_fortes:
          poi.rideCategory = RideCategory.THRILL;
          break;
        default:
          break;
      }
    }

    const minLengthLabel = parcAsterixPoi.features.find(f => f.label === 'Taille Minimum');
    const minNotAccompaniedLengthLabel = parcAsterixPoi.features.find(f => f.label === 'Taille Minimale Non Accompagné');

    if (minLengthLabel) {
      poi.minSizeWithEscort = parseInt(minLengthLabel.value);
    }

    if (minNotAccompaniedLengthLabel) {
      poi.minSize = parseInt(minNotAccompaniedLengthLabel.value);
    }

    if (this.isAttraction(parcAsterixPoi)) {
      const headerImage = parcAsterixPoi.headerV2 || parcAsterixPoi.headerV1;

      if (headerImage) {
        poi.image_url = `${baseImageUrl}/${headerImage}`
      }
    }

    return poi;
  }

  transferShowToPoi(show: ParcAsterixResponseShowInterface): Poi {
    const p = this.transferPoiToPoi(show);
    p.category = PoiCategory.SHOW;
    return p;
  }

  transferRestaurantToPoi(restaurant: ParcAsterixResponseRestaurantInterface): Poi {
    const p = this.transferPoiToPoi(restaurant);
    p.category = PoiCategory.RESTAURANT;
    return p;
  }

  transferHotelToPoi(hotel: ParcAsterixResponseHotelInterface): Poi {
    const p = this.transferPoiToPoi(hotel);
    p.category = PoiCategory.HOTEL;

    return p;
  }

  private isAttraction(poi: any): poi is ParcAsterixResponseAttractionInterface {
    return poi.__typename === 'Attraction'
  }

  private isHotel(poi: any): poi is ParcAsterixResponseHotelInterface {
    return poi.__typename === 'Hotel'
  }
}
