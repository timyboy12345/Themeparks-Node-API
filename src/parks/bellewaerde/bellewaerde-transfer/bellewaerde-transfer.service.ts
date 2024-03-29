import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import {
  BellewaerdeRidesResponseCategory,
  BellewaerdeRidesResponseRideInterface,
} from '../interfaces/bellewaerde-rides-response.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { RideCategory } from '../../../_interfaces/ride-category.interface';

@Injectable()
export class BellewaerdeTransferService extends TransferService {
  public transferPoiToPoi(poi: BellewaerdeRidesResponseRideInterface): Poi {
    let c = PoiCategory.UNDEFINED;

    switch (poi.category) {
      case BellewaerdeRidesResponseCategory.Kids:
      case BellewaerdeRidesResponseCategory.Splash:
      case BellewaerdeRidesResponseCategory.Familie:
      case BellewaerdeRidesResponseCategory.Spannend:
      case BellewaerdeRidesResponseCategory.Duizelig:
        c = PoiCategory.ATTRACTION;
        break;
      case BellewaerdeRidesResponseCategory.Show:
        c = PoiCategory.SHOW;
        break;
      case BellewaerdeRidesResponseCategory.Dieren:
        c = PoiCategory.ANIMAL;
        break;
      case BellewaerdeRidesResponseCategory.Glijbanen:
      case BellewaerdeRidesResponseCategory.Avontuur:
      case BellewaerdeRidesResponseCategory.Speelzones:
        c = PoiCategory.SLIDE;
        break;
      case BellewaerdeRidesResponseCategory.Ontspanning:
      default:
        break;
    }

    const ride: Poi = {
      id: poi.title.toLowerCase(),
      original: poi,
      category: c,
      title: poi.title,
      featured: poi.isNew === 1,
      singleRider: poi.single_rider === 1,
      fastpass: poi.fast_lane === 1,
    };

    switch (poi.category) {
      case BellewaerdeRidesResponseCategory.Duizelig:
      case BellewaerdeRidesResponseCategory.Spannend:
        ride.rideCategory = RideCategory.THRILL;
        break;
      case BellewaerdeRidesResponseCategory.Familie:
      case BellewaerdeRidesResponseCategory.Show:
      case BellewaerdeRidesResponseCategory.Splash:
        ride.rideCategory = RideCategory.FAMILY;
        break;
      case BellewaerdeRidesResponseCategory.Kids:
      default:
        ride.rideCategory = RideCategory.KIDS;
    }

    if (poi.url) {
      ride.website_url = 'https://www.bellewaerde.be' + poi.url;
    }

    if (poi.imgUrl) {
      ride.image_url = 'https://www.bellewaerde.be' + poi.imgUrl;
    }

    if (poi.heightAlone) {
      ride.minSizeWithoutEscort = poi.heightAlone;
    }

    if (poi.heightAdult) {
      ride.minSizeWithEscort = poi.heightAdult;
    }

    return ride;
  }
}
