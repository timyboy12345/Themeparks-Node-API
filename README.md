# 🎡 Themeparks API 🎡

Using this API, you can request waiting times from theme parks all around the world. It communicates with public API's that the parks use internally for their apps.

Feel free to add new parks.

## Example
To view the API, please go to [the example API](https://tp.arendz.nl/api) at https://tp.arendz.nl. This API is always up-to-date with the latest master-branch of this repo.

### Supported parks
In the table below you will find the parks that are currently supported and the functions that they support. This list of included and non-included functions is also included in the API.

| Park | Type | Ride Support | Restaurants Support | Shows Support | Shops Support | Halloween Support |
| ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
| 🇧🇪 Walibi Belgium | 🎡 | True | True | True | True | False |
| 🇧🇪 Bellewaerde | 🎡 | True | False | True | False | False |
| 🇧🇪 Bellewaerde Aquapark | 🌊 | True | False | False | False | False |
| 🇧🇪 Bobbejaanland | 🎡 | True | True | False | True | False |
| 🇧🇪 Plopsalande de Panne | 🎡 | True | True | True | True | False |
| 🇨🇦 La Ronde, Montreal | 🎡 | True | True | True | True | False |
| 🇩🇪 Phantasialand | 🎡 | True | True | True | True | False |
| 🇩🇪 Holiday Park | 🎡 | True | True | True | True | False |
| 🇩🇪 LegoLand Deutschland | 🎡 | False | False | False | False | False |
| 🇩🇪 Hansa Park | 🎡 | True | True | True | True | False |
| 🇩🇪 Movie Park Germany | 🎡 | True | False | True | False | False |
| 🇩🇰 Tivoli | 🎡 | True | True | True | False | False |
| 🇪🇸 Portaventura | 🎡 | True | True | False | False | False |
| 🇪🇸 Ferrari Land | 🎡 | True | True | False | False | False |
| 🇪🇸 Parque Warner | 🎡 | True | True | True | True | False |
| 🇪🇸 Parque de Atracciones Madrid | 🎡 | True | False | True | False | False |
| 🇪🇸 Parque Warner Beach | 🌊 | True | True | False | False | False |
| 🇫🇷 Walibi Rhône-Alpes | 🎡 | True | True | True | True | False |
| 🇫🇷 Disneyland Paris | 🎡 | True | True | True | True | False |
| 🇫🇷 Walt Disney Studios Park | 🎡 | True | True | True | True | False |
| 🇫🇷 Parc Asterix | 🎡 | True | True | True | False | False |
| 🇫🇷 Futuroscope | 🎡 | True | True | True | True | False |
| 🇬🇧 Thorpe Park | 🎡 | True | True | True | True | False |
| 🇬🇧 Alton Towers | 🎡 | True | True | True | True | False |
| 🇬🇧 Paultons Park | 🎡 | True | True | True | True | False |
| 🇬🇧 Chessington world of Adventures | 🎡 | True | True | True | True | False |
| 🇳🇱 Efteling | 🎡 | True | True | True | True | False |
| 🇳🇱 Toverland | 🎡 | True | True | True | False | True |
| 🇳🇱 Walibi Holland | 🎡 | True | True | True | True | False |
| 🇳🇱 DippieDoe | 🎡 | True | False | False | False | False |
| 🇳🇱 Hellendoorn | 🎡 | True | True | True | True | False |
| 🇳🇱 Ouwehands Dierenpark | 🦁 | False | False | False | False | False |
| 🇳🇱 Wildlands | 🦁 | False | False | False | False | False |
| 🇳🇱 Blijdorp | 🦁 | False | False | True | False | False |
| 🇳🇱 Apenheul | 🦁 | False | False | False | False | False |
| 🇳🇱 Safaripark Beekse Bergen | 🦁 | False | True | False | False | False |
| 🇳🇱 Speelland Beekse Bergen | 🎡 | True | False | False | False | False |
| 🇵🇱 Energylandia | 🎡 | True | False | True | False | False |
| 🇸🇪 Liseberg | 🎡 | True | True | False | True | False |
| 🇸🇪 Grona Lund | 🎡 | True | False | False | False | False |
| 🇺🇸 Dollywood | 🎡 | True | False | False | False | False |
| 🇺🇸 Silver Dollar City | 🎡 | True | False | False | False | False |
| 🇺🇸 San Diego Zoo | 🦁 | True | True | True | True | False |
| 🇺🇸 Six Flags Over Texas | 🎡 | True | True | True | True | False |
| 🇺🇸 Six Flags Over Georgia | 🎡 | True | True | True | True | False |
| 🇺🇸 Six Flags St. Louis | 🎡 | True | True | True | True | False |
| 🇺🇸 Six Flags Great Adventure | 🎡 | True | True | True | True | False |
| 🇺🇸 Six Flags Magic Mountain | 🎡 | True | True | True | True | False |
| 🇺🇸 Six Flags Great America | 🎡 | True | True | True | True | False |
| 🇺🇸 Six Flags Fiesta Texas | 🎡 | True | True | True | True | False |
| 🇺🇸 Six Flags Hurricane Harbor, Arlington | 🌊 | True | True | True | True | False |
| 🇺🇸 Six Flags Hurricane Harbor, Los Angeles | 🌊 | True | True | True | True | False |
| 🇺🇸 Six Flags Hurricane Harbor, Chicago | 🌊 | True | True | True | True | False |
| 🇺🇸 Six Flags America | 🎡 | True | True | True | True | False |
| 🇺🇸 Six Flags Discovery Kingdom | 🎡 | True | True | True | True | False |
| 🇺🇸 Six Flags New England | 🎡 | True | True | True | True | False |
| 🇺🇸 Six Flags Hurricane Harbor, Jackson | 🌊 | True | True | True | True | False |
| 🇺🇸 The Great Escape | 🎡 | True | True | True | True | False |
| 🇺🇸 Six Flags White Water, Atlanta | 🌊 | True | True | True | True | False |
| 🇺🇸 Six Flags México | 🎡 | True | True | True | True | False |
| 🇺🇸 Six Flags Hurricane Harbor, Oaxtepec | 🌊 | True | True | True | True | False |
| 🇺🇸 Six Flags Hurricane Harbor, Concord | 🌊 | True | True | True | True | False |
| 🇺🇸 Six Flags Frontier City | 🎡 | True | True | True | True | False |
| 🇺🇸 Six Flags Hurricane Harbor, Oklahoma City | 🌊 | True | True | True | True | False |
| 🇺🇸 Six Flags Darien Lake | 🎡 | True | True | True | True | False |
| 🇺🇸 Six Flags Hurricane Harbor, Phoenix | 🌊 | True | True | True | True | False |
| 🇺🇸 Six Flags Hurricane Harbor, SplashTown | 🌊 | True | True | True | True | False |
| 🇺🇸 Six Flags Hurricane Harbor, Rockford | 🌊 | True | True | True | True | False |
| 🇺🇸 Canada's Wonderland | 🎡 | True | True | True | True | False |
| 🇺🇸 Carowinds | 🎡 | True | True | True | True | False |
| 🇺🇸 Cedar Point | 🎡 | True | True | True | True | False |
| 🇺🇸 Dorney Park | 🎡 | True | True | True | True | False |
| 🇺🇸 California's Great Adventure | 🎡 | True | True | True | True | False |
| 🇺🇸 King's Dominion | 🎡 | True | True | True | True | False |
| 🇺🇸 Kings Island | 🎡 | True | True | True | True | False |
| 🇺🇸 Knotts Berry Farm | 🎡 | True | True | True | True | False |
| 🇺🇸 Michigans Adventure | 🎡 | True | True | True | True | False |
| 🇺🇸 Valley Fair | 🎡 | True | True | True | True | False |
| 🇺🇸 Worlds of Fun | 🎡 | True | True | True | True | False |

## Parks on the planning

UK: Pleasure Beach, LegoLand Windsor, Drayton Manor
IT: Gardaland, Cincetitta World
ES: Puy de Fou Espana
DE: Movie Park, Europapark, Rulantica, Heidi Park
OO: Familypark
FR: Puy de Fou
DM: Legoland Billund, Djurs Sommerland, Farup Sommerland

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

### Attractions IO
Some parks use a service provided by attractions io. For these parks, a special `AioThemeparkService` was created. You need a few details from the app, including API key and build details, and you can include the park in the API.

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

### Api URLs
Since the data of themeparks is copyrighted, API url's aren't included in this documentation. These can be retrieved by doing some research on your own and filling out the `.env` file. 
