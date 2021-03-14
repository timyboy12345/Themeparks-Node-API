import { Injectable } from '@nestjs/common';
import { Poi } from '../../_interfaces/poi.interface';
import { PortaVenturaPoi } from '../interfaces/porta-ventura-poi.interface';
import { PoiCategory } from '../../_interfaces/poiCategories.enum';

@Injectable()
export class PortaVenturaTransferService {
  public PortaVenturaPoiToPoi(portaVenturaPoi: PortaVenturaPoi): Poi {
    let category: PoiCategory;

    switch (portaVenturaPoi.tipo) {
      case 'atraccion':
        category = PoiCategory.ATTRACTION;
        break;
      case 'restaurante':
        category = PoiCategory.RESTAURANT;
        break;
      default:
        category = PoiCategory.UNDEFINED;
        break;
    }

    return {
      id: portaVenturaPoi.id + '',
      title: portaVenturaPoi.titulo,
      location: {
        lat: parseFloat(portaVenturaPoi.latitud),
        lng: parseFloat(portaVenturaPoi.longitud),
      },
      image_url: portaVenturaPoi.logo,
      description: portaVenturaPoi.descripcion,
      category: category,
      area: portaVenturaPoi.text_zona,
      original: portaVenturaPoi,
    };
  }

  public PortaVenturaPoisToPois(portaVenturaPois: PortaVenturaPoi[]): Poi[] {
    return portaVenturaPois.map(portaVenturaPoi => this.PortaVenturaPoiToPoi(portaVenturaPoi));
  }
}
