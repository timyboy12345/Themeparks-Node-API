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
}

export enum ParkType {
  THEMEPARK = 'THEMEPARK',
  ZOO = 'ZOO',
  WATER_PARK = 'WATER_PARK',
}

export enum Company {
  SIXFLAGS = 'SIXFLAGS',
  CEDAR_FAIR = 'CEDAR_FAIR'
}
