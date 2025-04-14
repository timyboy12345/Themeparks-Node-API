export interface PlopsalandDePanneWaitTimesResponseInterface {
  'nl': PlopsalandDePanneWaitTimesResponseItemInterface[],
  'fr': PlopsalandDePanneWaitTimesResponseItemInterface[],
  'en': PlopsalandDePanneWaitTimesResponseItemInterface[],
  'de': PlopsalandDePanneWaitTimesResponseItemInterface[]
}

export interface PlopsalandDePanneWaitTimesResponseItemInterface {
  'id': string,
  'name': string,
  'currentWaitingTime': string,
  'showWaitingTime': boolean,
  'minheight': number
}
