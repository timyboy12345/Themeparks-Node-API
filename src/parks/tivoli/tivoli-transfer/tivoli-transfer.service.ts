import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { Food, Ride, TivoliDataResponseInterface } from '../interfaces/tivoli-data-response.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';

@Injectable()
export class TivoliTransferService extends TransferService {
  // TODO: Find out what other information can be extracted from the API
  transferPoiToPoi(poi: Ride | Food): Poi {
    const p: Poi = {
      id: poi.Id,
      title: poi.IntroductionHeadline,
      original: poi,
      category: PoiCategory.ATTRACTION,
    };

    if (poi.PageText && poi.PageText !== '') {
      p.description = poi.PageText;
    }

    if (poi.PageManchet && poi.PageManchet !== '') {
      p.subTitle = poi.PageManchet;
    }

    if (poi.MediaListImages) {
      p.images = poi.MediaListImages;
    }

    if (poi.IntroductionImage) {
      p.previewImage = poi.IntroductionImage;
      p.image_url = poi.IntroductionImage;
    }

    if (poi.Placement) {
      p.location = {
        lat: parseFloat(poi.Placement.LocationLatitude),
        lng: parseFloat(poi.Placement.LocationLongitude)
      }
    }

    return p;
  }

  transferRideToPoi(ride: Ride): Poi {
    const r = this.transferPoiToPoi(ride);
    r.category = PoiCategory.ATTRACTION;

    if (ride.Facts) {
      // TODO: Implement facts
    }

    if (ride.AccessAge) {
      const age = Number(ride.AccessAge.replace(/\D+/g, ""))

      if (age) {
        r.minAge = age;
      }
    }

    if (ride.AccessMinHeight) {
      const minHeight = Number(ride.AccessMinHeight.replace(/\D+/g, ""))

      if (minHeight) {
        r.minSize = minHeight;
      }
    }

    return r;
  }

  transferRestaurantToPoi(restaurant: Food): Poi {
    const r = this.transferPoiToPoi(restaurant);
    r.category = PoiCategory.RESTAURANT;
    return r;
  }

  transferShowToPoi(show: any): Poi {
    const s = this.transferPoiToPoi(show);
    s.category = PoiCategory.SHOW;
    return s;
  }

  transferDataObjectToPois(data: TivoliDataResponseInterface): Poi[] {
    return [
      ...this.transferRidesToPois(data.rides.Data),
      ...this.transferRestaurantsToPois(data.food.Data),
      ...this.transferShowsToPois(data.events.Data)
    ];
  }
}
