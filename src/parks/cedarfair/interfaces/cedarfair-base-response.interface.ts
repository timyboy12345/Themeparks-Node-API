export interface CedarfairBaseResponseInterface {
  "parkId": number,
  "venueId": number,
  "poiId": number,
  "fimsId": string,
  "uuid": string,
  "name": string,
  "isActive": boolean,
  "type"?: {
    "id": number,
    "name": string
  },
  "waterRide": boolean,
  "description": string,
  "height"?: {
    "maxAlone": number | 0,
    "minAlone": number | 0,
    "maxAccompanied": number | 0,
    "minAccompanied": number | 0
  },
  "area": {
    "id": number,
    "name": string
  },
  "thrillLevel": 1 | 2 | 3 | 4 | 5,
  "location": {
    "latitude": string,
    "longitude": string
  },
  "fastPass": [
    {
      "id": 40,
      "name": "Fast Lane"
    }
  ],
  "parkModes": [
    {
      "id": 24,
      "name": "Park"
    }
  ],
  "image": string,
  "moreInfoButton": null,
  "landmark": string,
  "mediaGallery": CedarFairMediaObject[],
  "menu": null,
  "foodTypes": [
    {
      "id": 56,
      "name": "Snacks"
    }
  ],
  "iconPOI": "/content/gallery/cp-en-us/icons/cp-bluestreak-ridesicon.png/cp-bluestreak-ridesicon.png"
}


export interface CedarFairMediaObject
{
  "type": "VideoCompound" | "ImageCompound"

  // Videos
  "autoloop"?: boolean,
  "autoplay"?: boolean,
  "fullscreen"?: boolean,
  "mute"?: boolean,
  "id"?: string,
  "title"?: "",
  "videoService"?: "youtube",

  // Images
  "label"?: string,
  "altText"?: string,
  "link"?: string | null,
  "image"?: string, // "/content/gallery/cp-en-us/poi/rides/mobile-app/cp-23-bluestreak-app.jpg/cp-23-bluestreak-app.jpg",
}
