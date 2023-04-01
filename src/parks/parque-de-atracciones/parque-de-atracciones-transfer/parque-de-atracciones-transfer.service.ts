import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { AtraccionesResponseAtraccioneInterface } from '../interfaces/atracciones-response.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { RideCategory } from '../../../_interfaces/ride-category.interface';

@Injectable()
export class ParqueDeAtraccionesTransferService extends TransferService{
  transferRideToPoi(ride: AtraccionesResponseAtraccioneInterface, locale?: string): Poi {
    const r: Poi = {
      category: PoiCategory.ATTRACTION,
      id: ride.id.toString(),
      original: ride,
      title: ride.translatableName.es,
      subTitle: ride.translatableSubTitle.es,
      description: ride.translatableDescription.es,
      location: {
        lat: ride.place.point.latitude,
        lng: ride.place.point.longitude,
      },
    }

    if (ride.photographs && ride.photographs.length > 0) {
      r.previewImage = `https://s3-eu-west-1.amazonaws.com/stayapp.cms/${ride.photographs[0]}/${ride.photographs[0]}_appthumb`;
      r.images = [];

      ride.photographs.forEach((photo) => {
        r.images.push(`https://s3-eu-west-1.amazonaws.com/stayapp.cms/${photo}/${photo}`)
      })
    }

    switch (ride.category) {
      // Suaves (zacht)
      case 7878:
        r.rideCategory = RideCategory.KIDS;
        break;
      // Moderadas (gematigd)
      case 7879:
        r.rideCategory = RideCategory.FAMILY;
        break;
      // Intensas
      case 7880:
        r.rideCategory = RideCategory.THRILL;
        break;
      // Nickelodeon Land
      case 7881:
        break;
      // No disponibles
      case 29844:
      default:
        r.rideCategory = RideCategory.UNDEFINED;
        break;
      // Casa del Terror
      case 36921:
        r.category = PoiCategory.HALLOWEEN_EVENT;
        break;
    }

    const lengthData = ride.textList.find((tl) => tl.icon === 248919);

    if (lengthData) {
      const accompaniedRegex = /Acompañados: menores de ([0-9]+) cm/;
      const accompaniedMatches = lengthData.description.es.match(accompaniedRegex);

      const minRegex = /Mínimo: ([0-9]+) cm/;
      const minMatches = lengthData.description.es.match(minRegex);

      if (minMatches && minMatches.length > 0) {
        if (accompaniedMatches && accompaniedMatches.length > 0) {
          r.minSizeWithEscort = Number.parseFloat(minMatches[1]);
          r.minSize = Number.parseFloat(accompaniedMatches[1]);
        } else {
          r.minSize = Number.parseFloat(minMatches[1]);
        }
      }

      const maxRegex = /Máximo: ([0-9]+) cm/;
      const maxMatches = lengthData.description.es.match(maxRegex);

      if (maxMatches && maxMatches.length > 0) {
        r.maxSize = Number.parseFloat(maxMatches[1]);
      }
    }

    if (ride.waitingTime >= 0) {
      r.currentWaitTime = ride.waitingTime;
    }

    return r;
  }
}
