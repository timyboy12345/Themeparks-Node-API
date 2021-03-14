import { Injectable } from '@nestjs/common';
import { Poi } from '../../_interfaces/poi.interface';
import { EftelingPoi } from '../interfaces/efteling_poi.interface';
import { PoiCategory } from '../../_interfaces/poiCategories.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EftelingTransferService {
  constructor(private readonly configService: ConfigService) {
  }

  public EftelingPoiToPoi(eftelingPoi: EftelingPoi): Poi {
    let c: PoiCategory = PoiCategory.UNDEFINED;

    switch (eftelingPoi.fields.category) {
      case 'attraction':
        c = PoiCategory.ATTRACTION;
        break;
      case 'game':
        c = PoiCategory.GAME;
        break;
      case 'facilities-generic':
        c = PoiCategory.SERVICE;
        break;
      case 'facilities-toilets':
        c = PoiCategory.TOILETS;
        break;
      case 'merchandise':
        c = PoiCategory.SHOP;
        break;
      case 'photo-shop':
        c = PoiCategory.PHOTO_SHOP;
        break;
      case 'restaurant':
        c = PoiCategory.RESTAURANT;
        break;
      case 'show':
        c = PoiCategory.SHOW;
        break;
      case 'fairytale':
        c = PoiCategory.UNDEFINED;
        break;
      default:
        break;
    }

    const lat = parseFloat(eftelingPoi.fields.latlon.split(',')[0]);
    const lng = parseFloat(eftelingPoi.fields.latlon.split(',')[1]);

    // Get the URL where the images are located
    const imgUrl = this.configService.get('EFTELING_MEDIA_URL');

    const images = [];
    for (let i = 1; i <= 5; i++) {
      const img = eftelingPoi.fields['image_detailview' + i];
      if (img) {
        images.push(imgUrl + img);
      }
    }

    // Select a high quality image from images, otherwise get fallback low quality image
    const image = images.length > 0 ? images[0] : `${imgUrl}${eftelingPoi.fields.image}`;

    return {
      id: eftelingPoi.id,
      category: c,
      title: eftelingPoi.fields.name,
      subTitle: eftelingPoi.fields.subtitle,
      description: eftelingPoi.fields.detail_text,
      original: eftelingPoi,
      image_url: image,
      area: eftelingPoi.fields.empire,
      location: {
        lat: lat,
        lng: lng,
      },
      images: images,
    };
  }

  public EftelingPoisToPois(eftelingPois: EftelingPoi[]): Poi[] {
    return eftelingPois.map(eftelingPoi => this.EftelingPoiToPoi(eftelingPoi));
  }
}
