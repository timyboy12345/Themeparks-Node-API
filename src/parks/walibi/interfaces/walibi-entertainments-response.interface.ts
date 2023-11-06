import { WalibiEntertainment } from './walibi-entertainment.interface';

export interface WalibiEntertainmentsResponse {
  wc: WalibiEntertainment[],
  animals: WalibiEntertainment[],
  entertainment: WalibiEntertainment[],
  restaurant: WalibiEntertainment[],
  halloween: WalibiEntertainment[],
  shop: WalibiEntertainment[],
  show: WalibiEntertainment[],
  service: WalibiEntertainment[],
}
