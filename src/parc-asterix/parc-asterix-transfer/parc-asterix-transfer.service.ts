import { Injectable } from '@nestjs/common';
import { Poi } from '../../_interfaces/poi.interface';
import { ParcAsterixAttraction } from '../interfaces/parc-asterix-attraction.interface';
import { PoiCategory } from '../../_interfaces/poi-categories.enum';
import { RideCategory } from '../../_interfaces/ride-category.interface';
import { ParcAsterixRestaurant } from '../interfaces/parc-asterix-restaurant.interface';
import { ParcAsterixShow } from '../interfaces/parc-asterix-show.interface';
import { TransferService } from '../../_services/transfer/transfer.service';

@Injectable()
export class ParcAsterixTransferService extends TransferService {
  public transferRideToPoi(parcAsterixPoi: ParcAsterixAttraction): Poi {
    let rideCategory: RideCategory;

    switch (parcAsterixPoi.experience) {
      case 'Thrillseekers':
        rideCategory = RideCategory.THRILL;
        break;
      case 'Fun for all the family':
        rideCategory = RideCategory.FAMILY;
        break;
      case 'Young Gauls':
        rideCategory = RideCategory.KIDS;
        break;
      default:
        rideCategory = RideCategory.UNDEFINED;
        break;
    }

    return {
      id: parcAsterixPoi.code + '',
      title: parcAsterixPoi.title,
      subTitle: parcAsterixPoi.summary,
      description: parcAsterixPoi.description,
      category: PoiCategory.ATTRACTION,
      original: parcAsterixPoi,
      images: parcAsterixPoi.slider_images,
      image_url: parcAsterixPoi.slider_images.length > 0 ? parcAsterixPoi.slider_images[0] : parcAsterixPoi.thumbnail,
      location: {
        lat: parseFloat(parcAsterixPoi.latitude),
        lng: parseFloat(parcAsterixPoi.longitude),
      },
      rideCategory: rideCategory,
      fastpass: parcAsterixPoi.coupe_file,
      featured: parcAsterixPoi.best,
    };
  }

  public transferRestaurantToPoi(parcAsterixPoi: ParcAsterixRestaurant): Poi {
    return {
      id: parcAsterixPoi.code + '',
      title: parcAsterixPoi.title,
      subTitle: parcAsterixPoi.summary,
      description: parcAsterixPoi.description,
      category: PoiCategory.RESTAURANT,
      original: parcAsterixPoi,
      location: {
        lat: parseFloat(parcAsterixPoi.latitude),
        lng: parseFloat(parcAsterixPoi.longitude),
      },
    };
  }

  public transferShowToPoi(parcAsterixPoi: ParcAsterixShow): Poi {
    return {
      id: parcAsterixPoi.code + '',
      title: parcAsterixPoi.title,
      subTitle: parcAsterixPoi.summary,
      description: parcAsterixPoi.description,
      category: PoiCategory.SHOW,
      original: parcAsterixPoi,
      location: {
        lat: parseFloat(parcAsterixPoi.latitude),
        lng: parseFloat(parcAsterixPoi.longitude),
      },
    };
  }
}
