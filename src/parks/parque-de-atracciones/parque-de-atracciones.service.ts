import { Injectable } from '@nestjs/common';
import { ThemeParkService } from '../../_services/themepark/theme-park.service';
import { ParkType, ThemePark } from '../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../_interfaces/park-supports.interface';
import { HttpService } from '@nestjs/axios';
import { Poi } from '../../_interfaces/poi.interface';
import { AtraccionesResponseInterface } from './interfaces/atracciones-response.interface';
import { ParqueDeAtraccionesTransferService } from './parque-de-atracciones-transfer/parque-de-atracciones-transfer.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ParqueDeAtraccionesService extends ThemeParkService{
  private readonly apiUrl = null;
  private readonly apiToken = null;

  constructor(private readonly http: HttpService,
              private readonly transfer: ParqueDeAtraccionesTransferService,
              private readonly configService: ConfigService) {
    super();

    this.apiUrl = configService.get('PARQUE_DE_ATRACCIONES_API_URL');
    this.apiToken = configService.get('PARQUE_DE_ATRACCIONES_API_TOKEN');
  }

  getInfo(): ThemePark {
    return {
      countryCode: 'es',
      description: 'Het Parque de Atracciones de Madrid is een attractiepark in de buurt van Madrid in het park Casa de Campo. Het werd geopend in 1969. Parque de Atracciones is wat ligging betreft vergelijkbaar met Tivoli in Kopenhagen. Het park ligt in de groene zone van de stad en is vlot bereikbaar met de metro.',
      id: 'parque-de-atracciones-madrid',
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Entrada_Parque_de_Atracciones_de_Madrid.jpg',
      location: { lat: 0, lng: 0 },
      name: 'Parque de Atracciones Madrid',
      parkType: ParkType.THEMEPARK,
      timezone: 'Europe/Madrid'
    }
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
      supportsOpeningTimes: false,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: false,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: false,
      supportsRideWaitTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsRides: true,
      supportsShopOpeningTimes: false,
      supportsShops: false,
      supportsShowTimes: false,
      supportsShows: false,
      supportsTranslations: false
    }
  }

  async getPois(): Promise<Poi[]> {
    return this.getRides();
  }

  async getRides(): Promise<Poi[]> {
    return this.http.get<AtraccionesResponseInterface>(this.apiUrl + '/api/v1/service/attraction', {
      headers: {
        Authorization: 'Bearer ' + this.apiToken,
        'Stay-Establishment': 'QRMy'
      }
    })
      .toPromise()
      .then((response) => this.transfer.transferRidesToPois(response.data.data));
  }
}
