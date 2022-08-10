export interface DisneylandParisWaitTimesResponseItemInterface {
  "entityId": string,
  "type": "Attraction" | string,
  "parkId": string,
  "status": "OPERATING" | "REFURBISHMENT" | string,
  "responseTimestamp": string,
  "singleRider": {
    "isAvailable": boolean,
    "singleRiderWaitMinutes": string|null
  },
  "postedWaitMinutes": string
}
