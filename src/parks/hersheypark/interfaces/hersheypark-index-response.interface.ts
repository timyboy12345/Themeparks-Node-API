import { HersheyparkResponseItem } from './hersheypark-response.interface';

export interface HersheyparkIndexResponse {
  rides: HersheyparkResponseItem[],
  restaurants: HersheyparkResponseItem[],
  services: HersheyparkResponseItem[],
  games: HersheyparkResponseItem[],
  shops: HersheyparkResponseItem[],
  animals: HersheyparkResponseItem[],
  entertainment: any[],
  darkNights: any[],
  darkNightsTypes: any[],
  exploreHours: { [key: string]: { [key: string]: string } }
}
