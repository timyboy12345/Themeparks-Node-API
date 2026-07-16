# 🎡 Themeparks API 🎡

Using this API, you can request waiting times from theme parks all around the world. It communicates with public API's that the parks use internally for their apps.

Feel free to add new parks.

## Example
To view the API, please go to [the example API](https://tp.arendz.nl/api) at https://tp.arendz.nl. This API is always up to date with the latest main branch of this repo.

### Supported parks
In the table below, you will find the parks that are currently supported and the functions that they support. This list of included and non-included functions is also included in the API.

| Park | Type | Ride Support | Restaurants Support | Shows Support | Shops Support | Halloween Support |
| ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
| 🇦🇹 Familypark | 🎡 | True | True | False | True | False |
| 🇧🇪 Walibi Belgium | 🎡 | True | True | False | True | False |
| 🇧🇪 Bellewaerde | 🎡 | True | True | True | True | False |
| 🇧🇪 Bobbejaanland | 🎡 | True | True | False | True | False |
| 🇧🇪 Plopsalande de Panne | 🎡 | True | True | True | True | False |
| 🇧🇪 Pairi Daiza | 🦁 | False | True | True | True | False |
| 🇨🇦 La Ronde | 🎡 | True | True | True | True | True |
| 🇩🇪 Phantasialand | 🎡 | True | True | True | True | False |
| 🇩🇪 Holiday Park | 🎡 | True | True | True | True | False |
| 🇩🇪 Hansa Park | 🎡 | True | True | True | True | False |
| 🇩🇪 Movie Park Germany | 🎡 | True | True | True | True | True |
| 🇩🇪 Europa Park | 🎡 | True | True | True | True | False |
| 🇩🇪 Rulantica | 🌊 | True | True | True | True | False |
| 🇩🇪 Heide Park | 🎡 | True | True | True | True | False |
| 🇩🇪 LegoLand Deutschland | 🎡 | True | True | True | True | False |
| 🇩🇰 Tivoli | 🎡 | True | True | True | False | False |
| 🇩🇰 Djurs Sommerland | 🎡 | True | True | True | True | False |
| 🇩🇰 LegoLand Billund | 🎡 | True | True | True | True | False |
| 🇪🇸 Portaventura | 🎡 | True | True | True | True | False |
| 🇪🇸 Ferrari Land | 🎡 | True | True | True | True | False |
| 🇪🇸 Parque Warner | 🎡 | True | True | True | True | False |
| 🇪🇸 Parque de Atracciones Madrid | 🎡 | True | False | True | True | False |
| 🇪🇸 Parque Warner Beach | 🌊 | True | True | False | True | False |
| 🇫🇷 Walibi Rhône-Alpes | 🎡 | True | True | False | True | False |
| 🇫🇷 Disneyland Paris | 🎡 | True | True | True | True | False |
| 🇫🇷 Walt Disney Studios Park | 🎡 | True | True | True | True | False |
| 🇫🇷 Parc Asterix | 🎡 | True | True | True | True | False |
| 🇫🇷 Futuroscope | 🎡 | True | True | True | True | False |
| 🇫🇷 Marineland Cote D'azure | 🎡 | True | True | True | True | False |
| 🇫🇷 Puy de Fou | 🎡 | False | True | True | False | False |
| 🇬🇧 Thorpe Park | 🎡 | True | True | True | True | False |
| 🇬🇧 Alton Towers | 🎡 | True | True | True | True | False |
| 🇬🇧 Paultons Park | 🎡 | True | True | True | True | False |
| 🇬🇧 Chessington world of Adventures | 🎡 | True | True | True | True | False |
| 🇬🇧 Legoland Windsor Resort | 🎡 | True | True | True | True | False |
| 🇮🇹 Mirabilandia | 🎡 | True | True | False | True | False |
| 🇮🇹 Gardaland | 🎡 | True | True | True | False | False |
| 🇳🇱 Efteling | 🎡 | True | True | True | True | False |
| 🇳🇱 Toverland | 🎡 | True | True | True | False | True |
| 🇳🇱 Walibi Holland | 🎡 | True | True | True | True | True |
| 🇳🇱 DippieDoe | 🎡 | True | False | False | False | False |
| 🇳🇱 Hellendoorn | 🎡 | True | True | True | True | False |
| 🇳🇱 Ouwehands Dierenpark | 🦁 | False | False | False | False | False |
| 🇳🇱 Wildlands | 🦁 | False | False | False | False | False |
| 🇳🇱 Blijdorp | 🦁 | False | False | True | False | False |
| 🇳🇱 Apenheul | 🦁 | False | False | False | False | False |
| 🇳🇱 Safaripark Beekse Bergen | 🦁 | True | True | False | True | False |
| 🇳🇱 Speelland Beekse Bergen | 🎡 | True | True | False | True | False |
| 🇳🇱 Plopsa Indoor Coevorden | 🎡 | True | True | True | True | False |
| 🇳🇱 ARTIS | 🦁 | False | False | True | False | False |
| 🇵🇱 Energylandia | 🎡 | True | False | True | False | False |
| 🇸🇦 Six Flags Qiddiya City | 🎡 | True | True | True | True | True |
| 🇸🇪 Liseberg | 🎡 | True | True | False | True | False |
| 🇸🇪 Grona Lund | 🎡 | True | True | False | False | False |
| 🇺🇸 Dollywood | 🎡 | True | False | False | False | False |
| 🇺🇸 Silver Dollar City | 🎡 | True | False | False | False | False |
| 🇺🇸 San Diego Zoo | 🦁 | True | True | True | True | False |
| 🇺🇸 San Diego Zoo Safari Park | 🦁 | True | True | True | True | False |
| 🇺🇸 Hersheypark | 🎡 | True | True | True | True | False |
| 🇺🇸 Castaway Bay | 🌊 | True | True | True | True | True |
| 🇺🇸 Six Flags Great Escape | 🌊 | True | True | True | True | True |
| 🇺🇸 Sawmill Creek Resort | 🎡 | True | True | True | True | True |
| 🇺🇸 Six Flags Discovery Kingdom | 🎡 | True | True | True | True | True |
| 🇺🇸 Six Flags Great America | 🌊 | True | True | True | True | True |
| 🇺🇸 Worlds of Fun | 🌊 | True | True | True | True | True |
| 🇺🇸 California’s Great America | 🌊 | True | True | True | True | True |
| 🇺🇸 Six Flags Over Texas | 🌊 | True | True | True | True | True |
| 🇺🇸 Hurricane Harbor, Oaxtepec | 🌊 | True | True | True | True | True |
| 🇺🇸 Six Flags Mexico | 🎡 | True | True | True | True | True |
| 🇺🇸 Valleyfair | 🌊 | True | True | True | True | True |
| 🇺🇸 Schlitterbahn Galveston | 🌊 | True | True | True | True | True |
| 🇺🇸 Six Flags Over Georgia | 🌊 | True | True | True | True | True |
| 🇺🇸 Hurricane Harbor, Rockford | 🌊 | True | True | True | True | True |
| 🇺🇸 Hurricane Harbor, Splashtown | 🌊 | True | True | True | True | True |
| 🇺🇸 Knott's Berry Farm | 🌊 | True | True | True | True | True |
| 🇺🇸 Six Flags White Water | 🌊 | True | True | True | True | True |
| 🇺🇸 Canada's Wonderland | 🌊 | True | True | True | True | True |
| 🇺🇸 Six Flags Savannah Sunset Resort & Spa | 🎡 | True | True | True | True | True |
| 🇺🇸 Michigan’s Adventure | 🌊 | True | True | True | True | True |
| 🇺🇸 Six Flags St. Louis | 🌊 | True | True | True | True | True |
| 🇺🇸 Six Flags Magic Mountain | 🌊 | True | True | True | True | True |
| 🇺🇸 Six Flags Darien Lake | 🌊 | True | True | True | True | True |
| 🇺🇸 Six Flags Great Adventure | 🌊 | True | True | True | True | True |
| 🇺🇸 Six Flags Fiesta Texas | 🌊 | True | True | True | True | True |
| 🇺🇸 Hurricane Harbor, Concord | 🌊 | True | True | True | True | True |
| 🇺🇸 Hurricane Harbor, Oklahoma City | 🌊 | True | True | True | True | True |
| 🇺🇸 Six Flags New England | 🌊 | True | True | True | True | True |
| 🇺🇸 Hurricane Harbor, Phoenix | 🌊 | True | True | True | True | True |
| 🇺🇸 Carowinds | 🌊 | True | True | True | True | True |
| 🇺🇸 Frontier City | 🎡 | True | True | True | True | True |
| 🇺🇸 Schlitterbahn New Braunfels | 🌊 | True | True | True | True | True |
| 🇺🇸 Kings Dominion | 🌊 | True | True | True | True | True |
| 🇺🇸 Cedar Point | 🌊 | True | True | True | True | True |
| 🇺🇸 Kings Island | 🌊 | True | True | True | True | True |
| 🇺🇸 Dorney Park | 🌊 | True | True | True | True | True |
| 🇺🇸 Six Flags Hurricane Harbor, Los Angeles | 🎡 | True | True | True | True | True |
| 🇺🇸 Six Flags Hurricane Harbor, Chicago | 🌊 | True | True | True | True | True |
| 🇺🇸 Six Flags Darien Lake Hotel & Campground | 🎡 | True | True | True | True | True |
| 🇺🇸 Six Flags Hurricane Harbor, Jackson | 🌊 | True | True | True | True | True |
| 🇺🇸 Hurricane Harbor, Arlington | 🌊 | True | True | True | True | True |
| 🇺🇸 Seaworld San Antonio | 🎡 | True | True | True | True | False |
| 🇺🇸 Seaworld San Diego | 🎡 | True | True | True | True | False |
| 🇺🇸 Seaworld Orlando | 🎡 | True | True | True | True | False |
| 🇺🇸 Bush Gardens Tampa Bay | 🎡 | True | True | True | True | False |
| 🇺🇸 Bush Gardens Williamsburg | 🎡 | True | True | True | True | False |
| 🇺🇸 Sesame Place Philadelphia | 🎡 | True | True | True | True | False |
| 🇺🇸 Sesame Place San Diego | 🎡 | True | True | True | True | False |
| 🇺🇸 Universal Studios Orlando | 🎡 | True | True | True | True | False |
| 🇺🇸 Islands of Adventure | 🎡 | True | True | True | True | False |
| 🇺🇸 Universal Studios Hollywood | 🎡 | True | True | True | True | False |
| 🇺🇸 Legoland California | 🎡 | True | True | True | True | False |

## Parks on the planning
If you have any tips, you can always reach out to me via info@themeparkplanner.com.

UK: Pleasure Beach, Drayton Manor
IT: Cincetitta World
ES: Puy de Fou Espana
DK: Fårup Sommerland (Has no API)

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
Since the data of themeparks is copyrighted, API urls aren't included in this documentation. These can be retrieved by doing some research on your own and filling out the `.env` file. We use Infisical to sync environment variables.
