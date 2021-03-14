import { WalibiBelgiumEntertainment } from './walibi-belgium-entertainment.interface';

export interface WalibiBelgiumEntertainmentsResponse {
  wc: WalibiBelgiumEntertainment[],
  animals: WalibiBelgiumEntertainment[],
  entertainment: WalibiBelgiumEntertainment[],
  restaurant: WalibiBelgiumEntertainment[],
  shop: WalibiBelgiumEntertainment[],
  show: WalibiBelgiumEntertainment[],
  service: WalibiBelgiumEntertainment[],
}
