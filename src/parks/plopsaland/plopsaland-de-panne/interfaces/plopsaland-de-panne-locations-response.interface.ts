export interface PlopsalandDePanneLocationsResponseInterface {
  nl: PlopsalandDePanneLocationsResponseLanguageInterface,
  fr: PlopsalandDePanneLocationsResponseLanguageInterface,
  en: PlopsalandDePanneLocationsResponseLanguageInterface,
  de: PlopsalandDePanneLocationsResponseLanguageInterface,
}

export interface PlopsalandDePanneLocationsResponseLanguageInterface {
  attraction: {
    [key: string]: PlopsalandDePanneLocationsResponseItemInterface[]
  },
  food: {
    [key: string]: PlopsalandDePanneLocationsResponseItemInterface[]
  },
  meet_greet: {
    [key: string]: PlopsalandDePanneLocationsResponseItemInterface[]
  },
  shop: {
    [key: string]: PlopsalandDePanneLocationsResponseItemInterface[]
  },
  event: {
    [key: string]: PlopsalandDePanneLocationsResponseItemInterface[]
  },
  atm: {
    [key: string]: PlopsalandDePanneLocationsResponseItemInterface[]
  },
  proximus: {
    [key: string]: PlopsalandDePanneLocationsResponseItemInterface[]
  }
}

export interface PlopsalandDePanneLocationsResponseItemInterface {
  'name': string,
  'latitude': string,
  'longitude': string
}
