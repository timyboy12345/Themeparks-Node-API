import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { FamilyParkPoi } from '../interfaces/family-park.interface';
import { PoiFact } from '../../../_interfaces/poi-fact.interface';

@Injectable()
export class FamilyparkTransferService extends TransferService {
  transferDataObjectToPois(data: any, ...args): Poi[] {
    const rides = this.transferPoisToPois(data.find((d: any) => d.poiType === 'ATTRACTION').content);
    const restaurants = this.transferPoisToPois(data.find((d: any) => d.poiType === 'RESTAURANT').content);
    const shops = this.transferPoisToPois(data.find((d: any) => d.poiType === 'SHOP').content);
    const toilets = this.transferPoisToPois(data.find((d: any) => d.poiType === 'TOILET').content);
    const smokingAreas = this.transferPoisToPois(data.find((d: any) => d.poiType === 'mixed').content);
    const service = this.transferPoisToPois(data.find((d: any) => d.poiType === 'SERVICE').content);

    return [...rides, ...restaurants, ...shops, ...toilets, ...smokingAreas, ...service];
  }

  transferPoiToPoi(poi: FamilyParkPoi, locale?: string): Poi {
    let category: PoiCategory = PoiCategory.UNDEFINED;

    switch (poi.poiType) {
      case 'ATTRACTION':
        category = PoiCategory.ATTRACTION;
        break;
      case 'RESTAURANT':
        category = PoiCategory.RESTAURANT;
        break;
      case 'SHOP':
        category = PoiCategory.SHOP;
        break;
      case 'TOILET':
        category = PoiCategory.TOILETS;
        break;
      case 'SERVICE':
        category = PoiCategory.SERVICE;
        break;
      default:
        break;
    }

    const facts: PoiFact[] = [];

    if (poi.rideDetails) {
      if (poi.rideDetails.speed) {
        facts.push({
          id: 'speed',
          type: 'speed',
          value: poi.rideDetails.speed.toString(),
        });
      }

      if (poi.rideDetails.yearOfConstruction) {
        facts.push({
          id: 'build_in',
          type: 'build_in',
          value: poi.rideDetails.yearOfConstruction.toString(),
        });
      }

      if (poi.rideDetails.capacity) {
        facts.push({
          id: 'capacity',
          type: 'capacity',
          value: poi.rideDetails.capacity.toString(),
        });
      }

      if (poi.rideDetails.duration) {
        facts.push({
          id: 'duration',
          type: 'duration',
          value: poi.rideDetails.duration.toString(),
        });
      }

      if (poi.rideDetails.height) {
        facts.push({
          id: 'height',
          type: 'height',
          value: poi.rideDetails.height.toString(),
        });
      }

      if (poi.rideDetails.length) {
        facts.push({
          id: 'length',
          type: 'length',
          value: poi.rideDetails.length.toString(),
        });
      }

      // if (poi.rideDetails.waterDepth) {
      //   facts.push({
      //     id: 'waterDepth',
      //     type: 'string',
      //     description: 'Water Depth',
      //     value: poi.rideDetails.waterDepth.toString(),
      //   });
      // }

      // if (poi.rideDetails.looping !== null) {
      //   facts.push({
      //     id: 'looping',
      //     type: 'string',
      //     description: 'Looping',
      //     value: poi.rideDetails.looping ? 'Yes' : 'No',
      //   });
      // }

      // if (poi.rideDetails.access) {
      //   facts.push({
      //     id: 'access',
      //     type: 'string',
      //     description: 'Access',
      //     value: poi.rideDetails.access,
      //   });
      // }

      // if (poi.rideDetails.schedule) {
      //   facts.push({
      //     id: 'schedule',
      //     type: 'string',
      //     description: 'Schedule',
      //     value: poi.rideDetails.schedule,
      //   });
      // }

      // if (poi.rideDetails.rateEntrance) {
      //   facts.push({
      //     id: 'rateEntrance',
      //     type: 'string',
      //     description: 'Entrance Rate',
      //     value: poi.rideDetails.rateEntrance,
      //   });
      // }
    }

    if (poi.fearLevel) {
      facts.push({
        id: 'fearLevel',
        type: 'string',
        description: 'Fear Level',
        value: poi.fearLevel.toString(),
      });
    }

    // TODO: Services contain on-ride photos for rides
    // if (poi.services) {
    //   poi.services.forEach((service, index) => {
    //     facts.push({
    //       id: `service-${index}`,
    //       type: 'string',
    //       description: service.title,
    //       value: service.description,
    //     });
    //   });
    // }

    return {
      category: category,
      original: poi,
      title: poi.title,
      id: poi.technicalName,
      subTitle: poi.subtitle || poi.shortDescription,
      description: poi.description || poi.statusDescription,
      location: {
        lat: poi.latitude,
        lng: poi.longitude,
      },
      image_url: poi.mainImage ? `https://aem.familypark.at${poi.mainImage.url}` : null,
      images: poi.gallery?.map((g) => g.url).filter((u) => !!u).map((u) => `https://aem.familypark.at/${u}`),
      // videos: poi.mainVideo ? [{ url: poi.mainVideo }] : [],
      area: poi.zone?.title,
      minSizeWithEscort: poi.heightAccompaniedByAdult,
      minSizeWithoutEscort: poi.heightSoloRide,
      maxSize: poi.maxHeightNotAllowed,
      menuUrl: poi.menu?.link,
      facts: facts,
    };
  }
}

