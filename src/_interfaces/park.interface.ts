import { ThemeParkSupports } from './park-supports.interface';

export interface ThemePark {
  id: string;
  name: string;
  description: string;
  image: string;
  countryCode: string;
  supports?: ThemeParkSupports;
  parkType: ParkType;
  timezone?: string;
  company?: Company;
  location?: {
    lat: number,
    lng: number
  }
}

export enum ParkType {
  THEMEPARK = 'THEMEPARK',
  ZOO = 'ZOO',
  WATER_PARK = 'WATER_PARK',
}

export enum Company {
  SIXFLAGS = 'SIXFLAGS',
  CEDAR_FAIR = 'CEDAR_FAIR',
  SEAWORLD = 'SEAWORLD',
  UNIVERSAL = 'UNIVERSAL',
  PARQUES_REUNIDOS = 'PARQUES_REUNIDOS',
  LIBEMA = 'LIBEMA',
}
