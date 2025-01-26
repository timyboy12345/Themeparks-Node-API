import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import {
  UniversalBaseItem,
  UniversalCategory,
} from '../interfaces/universal-base-response.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { ShowTime } from '../../../_interfaces/showtimes.interface';
import * as moment from 'moment-timezone';

@Injectable()
export class UniversalTransferService extends TransferService {
  transferPoiToPoi(poi: UniversalBaseItem, locale?: string): Poi {
    const p: Poi = {
      category: this.getCategory(poi),
      id: `${poi.Id}`,
      original: poi,
      title: poi.MblDisplayName,
      original_category: poi.Category,
      subTitle: poi.MblLongDescription != poi.MblShortDescription ? poi.MblShortDescription : null,
      description: poi.MblLongDescription ?? poi.MblShortDescription,
      images: poi.DetailImages,
      image_url: poi.ListImage ?? poi.ThumbnailImage,
      previewImage: poi.ThumbnailImage ?? poi.ListImage,
      location: {
        lat: poi.Latitude,
        lng: poi.Longitude,
      },
    };

    if (poi.MinHeightInInches) {
      p.minSizeWithEscort = poi.MinHeightInInches * 2.54;
    }

    if (poi.DiningMenusLinks && poi.DiningMenusLinks.length > 0) {
      p.menuUrl = poi.DiningMenusLinks[0].MenuLink;
    }

    // TODO: Check if show-times are send again with API response
    if (poi.StartDateTimes) {
      let dateTime = moment.tz('America/New_York');

      let showTimes: ShowTime[] = poi.StartDateTimes
        .map((st) => {
          const start = moment(st).tz('America/New_York', true);

          // TODO: Check if more can be implemented
          // TODO: Don't hard-code timezone
          return {
            localFromDate: start.format('YYYY-MM-DD'),
            localFromTime: st.split(' ')[1],
            timezoneFrom: start.format(),
            isPassed: moment(st).tz('America/New_York', true).isBefore(),
          };
        });

      const currently = moment().tz('America/New_York');
      p.showTimes = {
        showTimes: showTimes,
        currentDate: currently.format('YYYY-MM-DD'),
        currentDateTimezone: currently.format(),
        timezone: 'America/New_York',
      };
    }

    // TODO: Add Restaurant Opening Times

    return p;
  }

  private getCategory(poi: UniversalBaseItem): PoiCategory {
    switch (poi.Category) {
      case UniversalCategory.Atms:
        return PoiCategory.ATM;
      case UniversalCategory.DiningLocations:
        return PoiCategory.RESTAURANT;
      case UniversalCategory.Rides:
        return PoiCategory.ATTRACTION;
      case UniversalCategory.Shows:
        return PoiCategory.SHOW;
      case UniversalCategory.Shops:
        return PoiCategory.SHOP;
      case UniversalCategory.FirstAidStations:
        return PoiCategory.FIRSTAID;
      case UniversalCategory.GuestServices:
        return PoiCategory.GUEST_SERVICES;
      case UniversalCategory.Lockers:
        return PoiCategory.LOCKERS;
      case UniversalCategory.Restrooms:
        return PoiCategory.TOILETS;
      case UniversalCategory.SmokingAreas:
        return PoiCategory.SMOKING_AREA;
      case UniversalCategory.GameHub:
        return PoiCategory.GAME;
      default:
        return PoiCategory.UNDEFINED;
    }
  }

  //  Studios: 10010
  //  Islands: 10000
  //  CityWalk: 10011
  //  Wet 'N Wild: 45084

  transferDataObjectToPois(data: any, ...args): Poi[] {
    let pois: Poi[] = [];

    data.Results.forEach((land) => {
      const landName = land.MblDisplayName;

      const attractions = land.Attractions
        .filter((a: any) => a.VenueId && a.VenueId.toString() === args[0].toString());
      const rides = this.transferPoisToPois(attractions)
        .map((l) => ({ ...l, area: landName }));
      pois = pois.concat(rides);
    });

    return pois;
  }
}
