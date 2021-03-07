import { HttpService, Injectable } from '@nestjs/common';
import { ThemeparkService } from '../_services/themepark/themepark.service';
import { ThemePark } from '../_interfaces/park.interface';
import { Poi } from '../_interfaces/poi.interface';
import { EftelingPoisResponse } from './interfaces/efteling_pois_response.interface';
import { PoiCategory } from '../_interfaces/poiCategories.enum';

@Injectable()
export class EftelingService extends ThemeparkService {
  private _eftelingApiURl: string;

  public constructor(private httpService: HttpService) {
    super();

    this._eftelingApiURl = 'http://prd-search-acs.efteling.com/2013-01-01/search?size=1000&q.parser=structured&q=(phrase field=language \'nl\')';
  }

  getInfo(): ThemePark {
    return {
      id: 'efteling',
      name: 'Efteling',
      countryCode: 'nl',
      image: '',
    };
  }

  getPois(): Promise<Poi[]> {
    return this.httpService.get<EftelingPoisResponse>(this._eftelingApiURl).toPromise().then(value => {
      return value.data.hits.hit.map<Poi>((eftelingPoi) => {
        let c: PoiCategory = PoiCategory.UNDEFINED;

        switch (eftelingPoi.fields.category) {
          case "attraction":
            c = PoiCategory.ATTRACTION;
            break;
          case "game":
            c = PoiCategory.GAME;
            break;
          case "facilities-generic":
            c = PoiCategory.SERVICE;
            break;
          case "facilities-toilets":
            c = PoiCategory.TOILETS;
            break;
          case "merchandise":
            c = PoiCategory.SHOP;
            break;
          case "photo-shop":
            c = PoiCategory.PHOTO_SHOP;
            break;
          case "restaurant":
            c = PoiCategory.RESTAURANT;
            break;
          case "show":
            c = PoiCategory.SHOW;
            break;
          case "fairytale":
            c = PoiCategory.UNDEFINED;
            break;
          default:
            break;
        }

        return {
          id: eftelingPoi.id,
          category: c,
          title: eftelingPoi.fields.name,
          description: eftelingPoi.fields.detail_text,
          original: eftelingPoi
        }
      });
    });
  }

  async getRides(): Promise<Poi[]> {
    return this.getPois().then((pois) => {
      return pois.filter(poi => poi.category == PoiCategory.ATTRACTION);
    });
  }
}
