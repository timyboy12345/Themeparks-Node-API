# 🎡 Themeparks API 🎡

Using this API, you can request waiting times from theme parks all around the world. It communicates with public API's that the parks use internally for their apps.

Feel free to add new parks.

## Example
To view the API, please go to [the example API](https://tp.arendz.nl/api) at https://tp.arendz.nl. This API is always up-to-date with the latest master-branch of this repo.

### Supported parks
In the table below you will find the parks that are currently supported and the functions that they support. This list of included and non-included functions is also included in the API.

| Park | Ride Support | Restaurants Support | Shows Support | Shops Support |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| 🇫🇷 Bellewaerde | Yes | Yes | Yes | Yes |
| 🇫🇷 Disneyland Paris | Yes | Yes | Yes | Yes |
| 🇫🇷 Disneyland Studios Park | Yes | Yes | Yes | Yes |
| 🇫🇷 Parc Asterix | Yes | Yes | Yes | No |
| 🇩🇪 Phantasialand | Yes | Yes | Yes | Yes |
| 🇩🇪 Hansa Park | Yes | Yes | Yes | Yes |
| 🇩🇪 Holiday Park | Yes | Yes | No | Yes |
| 🇪🇸 Portaventura Park | Yes | Yes | No | No |
| 🇪🇸 Ferrariland | Yes | Yes | No | No |
| 🇧🇪 Walibi Belgium | Yes | No | No | Yes |
| 🇧🇪 Bobbejaanland | Yes | Yes | No | Yes |
| 🇧🇪 Plopsaland de Panne | Yes | Yes | Yes | Yes |
| 🇳🇱 Efteling | Yes | Yes | Yes | Yes |
| 🇳🇱 Toverland | Yes | Yes | No | No |
| 🇳🇱 Walibi Holland | Yes | Yes | Yes | No |
| 🇳🇱 DippieDoe | Yes | No | No | No |
| 🇳🇱 Avonturenpark Hellendoorn | Yes | Yes | Yes | Yes |
| 🇺🇸 All Sixflags parks | Yes | Yes | Yes | Yes |

### Supported Zoos
As an experiment, the API also includes some data from zoos. In the table below, you can find the zoos that are currently supported.

| Zoo | Animal Support | Restaurants Support | Shows Support |
| ------------- | ------------- | ------------- | ------------- |
| 🇳🇱 Ouwehands Dierenpark | Yes | No | No |
| 🇳🇱 Wildlands | Yes | No | No |


## Description

This API was build using the [Nest](https://github.com/nestjs/nest) framework. Find the docs at the [NestJS Documentation](https://docs.nestjs.com/)

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Adding a new park
If you have access to an API of a theme park/resort that is not yet included, you can include it yourself and create a pull request, or create an issue with all details needed to integrate the park (API Keys, URLs, ...)

### Structure
To keep the code easy to understand, there is a structure to the files. This is used for all parks. If the park you're adding is part of a resort, the contents is placed within a folder named after the resort (for example `disney`) 
```text
...
src
  +-- _dtos # The dto files for API documentation
      +-- ...
  +-- _interfaces # The global interface and enum files
      +-- ...
  +-- _services # The global services
      +-- ...
  +-- controllers # All HTTP controllers
  +-- database # All models and repositories for the database connection
  +-- parks
      +-- {PARK_NAME} # The folder in which all files will be located
          +-- interfaces # All interfaces for this park
              +-- ...
          +-- {PARK_NAME}-transfer # A service which is used to translate park-provided objects to the POI interface structure 
              +-- {PARK_NAME}-transfer.service.spec.ts
              +-- {PARK_NAME}-transfer.service.ts
          +-- data # A folder which contains static assets if no API is available for this data
              +-- ...
          +-- {PARK_NAME}.service.spec.ts # All tests for this park
          +-- {PARK_NAME}.service.ts # The service for this park, which extends theme-park.service.ts 
  +-- schedules # All cron-jobs
...
```

After the right files have been added, the park has to be added to the constructor of `parks.service.ts` so Nest knows the park exists and is ready to be included with the other parks.

### Using other services
Some parks use a single API URL to return all data. For these parks, the `through-pois-theme-park.service.ts` file was created. This service can be usefull if a park returns data from for example `restaurants`, `rides` and `shows` in a single response. This way, you don't have to create all the methods by hand, but just implement the `getPois()` method. 

Some parks use services provided by [themeparks.io](https://attractions.io). For these parks, a specific service was created called `themeparks-io-theme-park.service.ts`. This service can easily implement new themeparks.io parks by providing some basic information, since all data is returned in a standardized format.

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
