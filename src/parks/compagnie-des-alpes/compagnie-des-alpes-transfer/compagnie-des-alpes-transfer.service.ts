import { Injectable } from '@nestjs/common';
import { Poi } from '../../../_interfaces/poi.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import * as moment from 'moment-timezone';
import {
  CDAAttractionResponseInterface,
} from '../interfaces/cda-attractions-response.interface';
import { RideCategory } from '../../../_interfaces/ride-category.interface';
import {
  CdaOpeningHoursResponseInterface,
} from '../interfaces/cda-opening-hours-response.interface';
import { ThemeParkOpeningTimes } from '../../../_interfaces/park-openingtimes.interface';
import { TransferService } from '../../../_services/transfer/transfer.service';

@Injectable()
export class CompagnieDesAlpesTransferService extends TransferService {
  transferPoiToPoi(poi: any, locale?: string): Poi {
    const imageBase = 'https://www.bellewaerde.be';

    let id = '';
    if (poi.waitingTimeName) {
      id = poi.waitingTimeName;
    } else if (poi.title) {
      id = poi.title;
    } else if (poi.name) {
      id = poi.name;
    }

    const p: Poi = {
      // @ts-ignore
      id: id.toString().replaceAll(' ', '-').toLowerCase(),
      original: poi,
      category: PoiCategory.UNDEFINED,
      title: poi.title,
      description: poi.description ? poi.description : poi.shortDescription,
      subTitle: poi.subtitle ? poi.subtitle : poi.shortDescription,
      location: {
        lat: poi.latitude,
        lng: poi.longitude,
      },
    };

    if (poi.zone && poi.zone.title) {
      p.area = poi.zone.title;
    }

    if (poi.mainVideo) {
      p.videos = [{
        platform: 'URL',
        full_url: imageBase + poi.mainVideo,
      }];
    }

    if (poi.mainImage) {
      const imgs = poi.mainImage.renditions
        .filter((i) => i.width <= 1300)
        .sort((a, b) => {
          return a.width < b.width ? 1 : -1;
        });

      if (imgs.length > 0) {
        p.image_url = imageBase + imgs[0].url;
        p.images = [imageBase + poi.mainImage.path];
      }
    }

    if (poi.gallery) {
      const images = poi.gallery.filter((i) => i.type === 'IMAGE');
      const videos = poi.gallery.filter((i) => i.type === 'VIDEO');

      p.images = images.map((i) => {
        return imageBase + i.renditions
          .sort((a, b) => {
            return a.width < b.width ? 1 : -1;
          })[0].url;
      });

      p.videos = videos.map((v) => {
        return {
          platform: 'URL',
          full_url: imageBase + v.url,
          thumbnail: imageBase + v.renditions
            .sort((a, b) => {
              return a.width < b.width ? 1 : -1;
            })[0].url,
        }
      })
    }

    return p;
  }

  transferRestaurantToPoi(restaurant: CDAAttractionResponseInterface, locale?: string): Poi {
    const r = this.transferPoiToPoi(restaurant);
    r.category = PoiCategory.RESTAURANT;
    return r;
  }

  transferShopToPoi(shop: CDAAttractionResponseInterface, locale?: string): Poi {
    const s = this.transferPoiToPoi(shop);
    s.category = PoiCategory.SHOP;
    return s;
  }

  transferShowToPoi(show: CDAAttractionResponseInterface, locale?: string): Poi {
    const s = this.transferPoiToPoi(show);
    s.category = PoiCategory.SHOW;
    return s;
  }

  transferAnimalToPoi(animal: any, locale?: string): Poi {
    const a = this.transferPoiToPoi(animal.generalInformation);
    a.category = PoiCategory.ANIMAL;
    return a;
  }

  public transferRideToPoi(poi: CDAAttractionResponseInterface): Poi {
    let c = PoiCategory.ATTRACTION;
    const ride = this.transferPoiToPoi(poi);
    ride.id = poi.waitingTimeName ? poi.waitingTimeName : ride.id;
    ride.category = c;

    switch (poi.type.id) {
      case 'blw:attraction-target-groups/families':
        ride.rideCategory = RideCategory.FAMILY;
        break;
      case 'blw:attraction-target-groups/sensations':
        ride.rideCategory = RideCategory.THRILL;
        break;
      case 'blw:attraction-target-groups/kids':
        ride.rideCategory = RideCategory.KIDS;
        break;
      default:
        ride.rideCategory = RideCategory.UNDEFINED;
        break;
    }

    if (poi.heightSoloRide) {
      ride.minSizeWithoutEscort = poi.heightSoloRide;
    }

    if (poi.heightAccompaniedByAdult) {
      ride.minSizeWithEscort = poi.heightAccompaniedByAdult;
    }

    if (poi.maxHeightNotAllowed) {
      ride.maxSize = poi.maxHeightNotAllowed;
    }

    ride.facts = [];

    if (poi.rideDetails) {
      if (poi.rideDetails.speed) {
        ride.facts.push({
          type: 'speed',
          id: 'speed',
          value: poi.rideDetails.speed.toString(),
        });
      }

      if (poi.rideDetails.height) {
        ride.facts.push({
          type: 'height',
          id: 'height',
          value: poi.rideDetails.height.toString(),
        });
      }

      if (poi.rideDetails.length) {
        ride.facts.push({
          type: 'length',
          id: 'length',
          value: poi.rideDetails.length.toString(),
        });
      }

      if (poi.rideDetails.capacity) {
        ride.facts.push({
          type: 'capacity',
          id: 'capacity',
          value: poi.rideDetails.capacity.toString(),
        });
      }

      if (poi.rideDetails.yearOfConstruction) {
        ride.facts.push({
          type: 'build_in',
          id: 'build_in',
          value: poi.rideDetails.yearOfConstruction.toString(),
        });
      }
    }

    return ride;
  }

  transferOpeningTimesToOpeningTimes(openingTimes: CdaOpeningHoursResponseInterface): ThemeParkOpeningTimes[] {
    const times: ThemeParkOpeningTimes[] = [];

    for (const year in openingTimes.calendar) {
      for (const month in openingTimes.calendar[year].months) {
        for (const dayNumber in openingTimes.calendar[year].months[month].days) {
          const d = openingTimes.calendar[year].months[month].days[dayNumber];
          const openDate = moment(`${year}-${month}-${dayNumber} ${d.openingHour}:00`, 'YYYY-MM-DD HH:mm:ss');
          const closeDate = moment(`${year}-${month}-${dayNumber} ${d.closingHour}:00`, 'YYYY-MM-DD HH:mm:ss');

          if (!d.closed) {
            times.push({
              date: openDate.format(),
              openingTimes: [{
                open: openDate.format(),
                openTime: d.openingHour,
                close: closeDate.format(),
                closeTime: d.closingHour,
              }],
            });
          }
        }
      }
    }

    return times;
  }
}
