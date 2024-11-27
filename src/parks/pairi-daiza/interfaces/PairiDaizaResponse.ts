export interface PairiDaizaResponse {
  "ServiceResultType": 1,
  "ServiceResultMessage": null,
  "ServiceResultData": PairiDaizaResponseShop[] | PairiDaizaResponseAnimation[] | PairiDaizaReponseAnimal[]
}

export interface PairiDaizaResponseShop {
  "Id": number,
  "Slug": string,
  "Name": PairiDaizaTranslatedText,
  "Description": PairiDaizaTranslatedText,
  "ReferredLetter": null,
  "Priority": 1,
  "ListImageUrl": string,
  "PinImageUrl": string,
  "PinUnavaibleImageUrl": string,
  "DetailImageUrl": string,
  "CreationDate": string,
  "LastModifiedDate": string,
  "ClosingDays": string[],
  "Lat": number,
  "Long": number,
  "Pins": null,
  "OpeningHours": PairiDaizaOpeningHour[],
  "Order": number
}

export interface PairiDaizaResponseAnimation {
  "Id": number,
  "Slug": string,
  "Name": PairiDaizaTranslatedText,
  "Description": PairiDaizaTranslatedText,
  "ReferredLetter": PairiDaizaTranslatedText,
  "Priority": number,
  "ListImageUrl": string,
  "PinImageUrl": string,
  "PinUnavaibleImageUrl": string,
  "DetailImageUrl": string,
  "CreationDate": string,
  "LastModifiedDate": string,
  "ClosingDays": string[],
  "OpeningHours": PairiDaizaOpeningHour[],
  "OpeningHoursUnique": null,
  "OpeningHoursSlot": null,
  "Lat": number,
  "Long": number,
  "Pins": null,
  "Order": number
}

export interface PairiDaizaReponseAnimal {
  "Id": number,
  "Slug": string,
  "Name": PairiDaizaTranslatedText,
  "Description": PairiDaizaTranslatedText,
  "ReferredLetter": PairiDaizaTranslatedText,
  "Priority": 0,
  "ListImageUrl": "https://pairidaiza.blob.core.windows.net/applicationimages/Animal/les-pandas-geants-1676539907.jpg",
  "PinImageUrl": "https://pairidaiza.blob.core.windows.net/applicationimages/PinAnimalON/120/les-pandas-geants-1680251096.png",
  "PinUnavaibleImageUrl": "https://pairidaiza.blob.core.windows.net/applicationimages/PinAnimalOFF/120/les-pandas-geants-1680251096.png",
  "DetailImageUrl": "https://pairidaiza.blob.core.windows.net/applicationimages/AnimalDetails/les-pandas-geants-1676379350.jpg",
  "CreationDate": "0001-01-01T00:00:00",
  "LastModifiedDate": "0001-01-01T00:00:00",
  "ClosingDays": [
    "2016-02-25T00:00:00",
    "2016-02-26T00:00:00",
    "2016-03-01T00:00:00",
    "2016-03-18T00:00:00",
    "2016-05-12T00:00:00",
    "2016-05-25T00:00:00"
  ],
  "Lat": 50.583897,
  "Long": 3.892103,
  "Feedable": false,
  "FeedingHours": [],
  "Pins": [
    {
      "Id": 1237,
      "Lat": 50.583897,
      "Long": 3.892103,
      "Icon": null,
      "AnimalId": 0
    },
    {
      "Id": 1238,
      "Lat": 50.584070,
      "Long": 3.891514,
      "Icon": null,
      "AnimalId": 0
    }
  ],
  "AnimalClass": PairiDaizaTranslatedText,
  "Alimentation": PairiDaizaTranslatedText,
  "Weight": PairiDaizaTranslatedText,
    // "TextFR": "70 – 120 kg",
    // "TextNL": "70 - 120 kg",
    // "TextEN": "70 - 120 kg,
  "Longevity": PairiDaizaTranslatedText,
    // "TextFR": "10 – 20 ans",
    // "TextNL": "10 - 20 jaar",
    // "TextEN": "10 - 20 year"
  "Width": PairiDaizaTranslatedText,
    // "TextFR": "1.2 - 1.9 m",
    // "TextNL": "1.2 - 1.9 m ",
    // "TextEN": "1.2 - 1.9 m"
  "AnimalHeight": PairiDaizaTranslatedText,
  //   "TextFR": "60 - 90 cm",
  //   "TextNL": "60 - 90 cm",
  //   "TextEN": "60 - 90 cm"
  "DetailsBackgroundImageUrl": "https://pairidaiza.blob.core.windows.net/applicationimages/AnimalBG/ours.svg",
  "FoodIconUrl": "https://pairidaiza.blob.core.windows.net/applicationimages/Icons/foodIcon.svg",
  "ClassIconUrl": "https://pairidaiza.blob.core.windows.net/applicationimages/Icons/classIcon.svg"
}

export interface PairiDaizaOpeningHour {
  "StartHour": string,
  "EndHour": string,
  "Date": string,
  "Text": null,
  "Info": null
}

export interface PairiDaizaTranslatedText {
  "TextFR": string,
  "TextNL": string,
  "TextEN": string
}
