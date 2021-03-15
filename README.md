# 🎡 Themeparks API 🎡

Using this API, you can request waiting times from theme parks all around the world. It communicates with public API's that the parks use internally for their apps.

Feel free to add new parks.

## Example
To view the API, please go to [the example API](https://tp.arendz.nl/api) at https://tp.arendz.nl. This API is always up-to-date with the latest master-branch of this repo.

### Supported parks
In the table below you will find the parks that are currently supported and the functions that they support. This list of included and non-included functions is also included in the API.

| Park | Ride Support | Restaurants Support | Shows Support |
| ------------- | ------------- | ------------- | ------------- |
| 🇫🇷 Bellewaerde | Yes | Yes | Yes  |
| 🇫🇷 Disneyland Paris | Yes | Yes | Yes  |
| 🇫🇷 Disneyland Studios Park | Yes | Yes | Yes  |
| 🇫🇷 Parc Asterix | Yes | Yes | Yes  |
| 🇩🇪 Phantasialand | Yes | Yes | Yes  |
| 🇪🇸 Portaventura Park | Yes | Yes | No  |
| 🇪🇸 Ferrariland | Yes | Yes | No  |
| 🇳🇱 Efteling | Yes | Yes | No  |
| 🇳🇱 Toverland | Yes | Yes | No  |
| 🇳🇱 Walibi Holland | Yes | No | No |
| 🇳🇱 Walibi Holland | Yes | Yes | Yes |
| 🇳🇱 DippieDoe | Yes | No | No |


## Description

This API was build using the [Nest](https://github.com/nestjs/nest) framework. Find the docs at the [NestJS Documentation](https://docs.nestjs.com/)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).

## Formats
The API returns parks, restaurants, rides and others points of interest (POIs) in a standardized way, these are detailed below. 
### Park Format
```typescript
export interface ThemePark {
  id: string;
  name: string;
  description: string;
  image: string;
  countryCode: string;
  supports?: ThemeParkSupports;
}
```

### Poi Format
```typescript
export interface Poi {
  id: string;
  category: PoiCategory;
  rideCategory?: RideCategory;
  original_category?: string;
  title: string;
  subTitle?: string;
  description?: string;
  area?: string;
  createdAt?: string;
  location?: {
    lat: number,
    lng: number
  },
  entrance?: {
    id?: string,
    world?: {
      lat: number,
      lng: number
    },
    map?: {
      lat: number,
      lng: number
    }
  };
  exit?: {
    id?: string,
    world?: {
      lat: number,
      lng: number
    },
    map?: {
      lat: number,
      lng: number
    }
  };
  maxAge?: string;
  maxSize?: string;
  minAge?: number;
  minSize?: number;
  minSizeEscort?: number;
  tags?: string[];
  image_url?: string;
  website_url?: string;
  fastpass?: boolean;
  singlerider?: boolean;
  featured?: boolean;
  photoPoint?: boolean;

  images?: string[];

  waitingTimes?: WaitingTimes;

  showTimes?: ShowTimes;

  openingTimes?: PoiOpeningTime[];

  original: any;
}

```

### Api URLS
Since the data of themeparks is copyrighted, API url's aren't included in this documentation. These can be retrieved by doing some research on your own. 
