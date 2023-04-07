import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { Food, OpeningHour, Ride, TivoliDataResponseInterface } from '../interfaces/tivoli-data-response.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { ThemeParkOpeningTimes } from '../../../_interfaces/park-openingtimes.interface';
import * as moment from 'moment-timezone';

@Injectable()
export class TivoliTransferService extends TransferService {
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
        lng: parseFloat(poi.Placement.LocationLongitude),
      };
    }

    return p;
  }

  transferRideToPoi(ride: Ride): Poi {
    const r = this.transferPoiToPoi(ride);
    r.category = ride.IsGame ? PoiCategory.GAME : PoiCategory.ATTRACTION;

    if (ride.Facts) {
      r.facts = [];

      ride.Facts.forEach((fact) => {
        switch (fact.Label) {
          case 'Built':
            r.facts.push({
              id: 'build_in',
              type: 'build_in',
              value: fact.Value
            })
            break;
          case 'Capacity':
            r.facts.push({
              id: 'capacity',
              type: 'capacity',
              value: fact.Value
            })
            break;
          case 'G-effect':
            r.facts.push({
              id: 'g_forces',
              type: 'g_forces',
              value: fact.Value
            })
            break;
          case 'Length of ride':
            r.facts.push({
              id: 'length',
              type: 'length',
              value: fact.Value
            })
            break;
          case 'Height':
            r.facts.push({
              id: 'height',
              type: 'height',
              value: fact.Value
            })
            break;
          case 'Maker':
            r.facts.push({
              id: 'manufacturer',
              type: 'manufacturer',
              value: fact.Value
            })
            break;
          case 'Speed':
            r.facts.push({
              id: 'speed',
              type: 'speed',
              value: fact.Value
            })
            break;
          case 'Ride time':
            r.facts.push({
              id: 'duration',
              type: 'duration',
              value: fact.Value
            })
            break;
          case 'Number of passengers per ride':
            r.facts.push({
              id: 'passengers_per_car',
              type: 'passengers_per_car',
              value: fact.Value
            })
            break;
          default:
            break;
        }
      })
    }

    if (ride.AccessAge) {
      const age = Number(ride.AccessAge.replace(/\D+/g, ""))

      if (age) {
        r.minAgeWithoutEscort = age;
      }
    }

    if (ride.AccessAgeValue) {
      r.minAgeWithoutEscort = ride.AccessAgeValue;
    }

    if (ride.AccessMinHeightValue) {
      r.minSizeWithoutEscort = ride.AccessMinHeightValue;
    }

    if (ride.AccessPriceValue) {
      r.priceType = 'local_currency';
      r.priceName = 'DKK';
      r.price = ride.AccessPriceValue;
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
      ...this.transferShowsToPois(data.events.Data),
    ];
  }

  transferOpeningTimesToOpeningTimes(openingTimes: OpeningHour[], locale?: string): ThemeParkOpeningTimes[] {
    return openingTimes.map((oh) => {
      return {
        date: oh.Date,
        openingTimes: [{
          open: moment(`${oh.Date} ${oh.FromHour}:${oh.FromMinute}`).tz('Europe/Copenhagen').format(),
          openTime: `${oh.FromHour}:${oh.FromMinute}`,
          close: moment(`${oh.Date} ${oh.UntilHour}:${oh.UntilMinute}`).tz('Europe/Copenhagen').format(),
          closeTime: `${oh.UntilHour}:${oh.UntilMinute}`
        }]
      }
    })
  }
}
