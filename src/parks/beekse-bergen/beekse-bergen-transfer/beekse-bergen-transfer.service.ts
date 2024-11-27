import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { RideCategory } from '../../../_interfaces/ride-category.interface';
import { BeekseBergenLocationsResponseInterface } from '../interfaces/beekse-bergen-locations-response.interface';

@Injectable()
export class BeekseBergenTransferService extends TransferService {
  transferAnimalToPoi(animal: BeekseBergenApiResponseItem): Poi {
    return this.transferItemToPoi(PoiCategory.ANIMAL, animal);
  }

  transferRestaurantToPoi(restaurant: BeekseBergenApiResponseItem): Poi {
    return this.transferItemToPoi(PoiCategory.RESTAURANT, restaurant);
  }

  transferRideToPoi(ride: any): Poi {
    return this.transferItemToPoi(PoiCategory.ATTRACTION, ride);
  }

  // TODO: Implement new API url
  private transferItemToPoi(category: PoiCategory, data: BeekseBergenApiResponseItem): Poi {
    const poi: Poi = {
      category: category,
      id: data.id.toString(),
      original: data,
      title: data.short_title,
      description: data.description,
      image_url: data.coverImage,
      previewImage: data.coverImage,
      images: data.medias.map((media) => {
        return media.original;
      }),
      website_url: 'https://beeksebergen.nl/' + data.slug,
    };

    if (data.attributes.diersoort) {
      poi.area = data.attributes.diersoort.map((ds) => ds.name).join(', ');
    }

    if (data.attributes.horecasoort) {
      poi.area = data.attributes.horecasoort.map((ds) => ds.name).join(', ');
    }

    if (data.attributes.attractiesoort) {
      const attractieSoortIds = data.attributes.attractiesoort.map((as) => as.id);

      // Familiepret
      if (attractieSoortIds.includes(272)) {
        poi.rideCategory = RideCategory.FAMILY;
      } else if (attractieSoortIds.includes(271)) {
        poi.rideCategory = RideCategory.KIDS;
      }

      // if (attractieSoortIds.includes(281)) {
      //   poi.category = PoiCategory.WATER_RIDE;
      // }
    }

    return poi;
  }

  transferDataObjectToPois(data: BeekseBergenLocationsResponseInterface, ...args): Poi[] {
    const pois: Poi[] = [];

    const facilities = data.data.filter((d) => d.attributes.facility.data !== null);
    const animals = data.data.filter((d) => d.attributes.animals.data.length > 0);

    animals.forEach((a) => {
      const animal = a.attributes.animals.data[0];

      pois.push({
        category: PoiCategory.ANIMAL,
        id: a.id.toString(),
        original: a,
        title: a.attributes.name,
        description: animal.attributes.description + '\n\n' + animal.attributes.bottomDescription,
        subTitle: animal.attributes.subtitle,
        location: {
          lat: a.attributes.coordinates.latitude,
          lng: a.attributes.coordinates.longitude,
        },
      });
    });

    facilities.forEach((f) => {
      pois.push({
        category: PoiCategory.RESTAURANT,
        id: f.id.toString(),
        original: f,
        title: f.attributes.name,
        description: f.attributes.facility.data.attributes.description,
        subTitle: f.attributes.facility.data.attributes.summary,
      });
    });

    return pois;
  }
}
