import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParkDto } from '../../_dtos/park.dto';
import { ThemePark } from '../../_interfaces/park.interface';
import { ParksService } from '../../_services/parks/parks.service';
import { Cache } from 'cache-manager';
import { PoiDto } from '../../_dtos/poi.dto';
import { Poi } from '../../_interfaces/poi.interface';
import { LanguageInterceptor } from '../../_interceptors/language.interceptor';
import { ThemeParkOpeningTimes } from '../../_interfaces/park-openingtimes.interface';
import { ThemeParkOpeningHourDto } from '../../_dtos/theme-park-opening-hour.dto';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { ThemeParkEvent } from '../../_interfaces/park-event.interface';
import * as Sentry from '@sentry/nestjs';

@ApiTags('Themeparks')
@Controller('parks/:id')
export class ParkController {
  constructor(private readonly parksService: ParksService,
              @Inject(CACHE_MANAGER) private cacheManager: Cache) {
  }

  @Get('')
  @UseInterceptors(CacheInterceptor, LanguageInterceptor)
  @ApiOkResponse({
    type: ParkDto,
  })
  async getPark(@Param() params): Promise<ThemePark> {
    return (await this.parksService.findPark(params.id, true)).getFullInfo();
  }

  @Get('pois')
  @UseInterceptors(CacheInterceptor, LanguageInterceptor)
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The park id',
  })
  @ApiResponse({
    status: 200,
    description: 'All rides of a specific theme park',
    isArray: true,
    type: PoiDto,
  })
  @ApiResponse({
    status: 404,
    description: 'The requested park could not be found',
  })
  async getParkPois(@Param() params, @Query() query): Promise<Poi[]> {
    const park = await this.parksService.findPark(params.id, true);

    if (!park.getFullInfo().supports.supportsPois) {
      throw new BadRequestException('This park does not support pois');
    }

    Sentry.setTag("park-id", params.id);

    return await park.getPois().then(pois => {
      return pois.map((poi) => {
        if (!query.includeOriginal) {
          delete poi.original;
        }

        return poi;
      });
    }) ?? [];
  }

  @Get('rides')
  @UseInterceptors(CacheInterceptor, LanguageInterceptor)
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The park id',
  })
  @ApiResponse({
    status: 200,
    description: 'All rides of a specific theme park',
    isArray: true,
    type: PoiDto,
  })
  @ApiResponse({
    status: 404,
    description: 'The requested park could not be found',
  })
  async getParkRides(@Param() params, @Query() query): Promise<Poi[]> {
    const park = await this.parksService.findPark(params.id, true);

    if (!park.getFullInfo().supports.supportsRides) {
      throw new BadRequestException('This park does not support rides');
    }

    Sentry.setTag("park-id", params.id);

    return await park.getRides().then(rides => {
      return rides.map((ride) => {
        if (!query.includeOriginal) {
          delete ride.original;
        }

        return ride;
      });
    }) ?? [];
  }

  @Get('restaurants')
  @UseInterceptors(CacheInterceptor, LanguageInterceptor)
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The park id',
  })
  @ApiResponse({
    status: 200,
    description: 'All restaurants of a specific theme park',
    isArray: true,
    type: PoiDto,
  })
  @ApiResponse({
    status: 404,
    description: 'The requested park could not be found',
  })
  async getParkRestaurants(@Param() params, @Query() query): Promise<Poi[]> {
    const park = await this.parksService.findPark(params.id, true);

    if (!park.getFullInfo().supports.supportsRestaurants) {
      throw new BadRequestException('This park does not support restaurants');
    }

    Sentry.setTag("park-id", params.id);

    return await park.getRestaurants().then(restaurants => {
      return restaurants.map((restaurant) => {
        if (!query.includeOriginal) {
          delete restaurant.original;
        }

        return restaurant;
      });
    }) ?? [];
  }

  @Get('shows')
  @UseInterceptors(CacheInterceptor, LanguageInterceptor)
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The park id',
  })
  @ApiResponse({
    status: 200,
    description: 'All shows of a specific theme park',
    isArray: true,
    type: PoiDto,
  })
  @ApiResponse({
    status: 404,
    description: 'The requested park could not be found',
  })
  async getParkShows(@Param() params, @Query() query): Promise<Poi[]> {
    const park = await this.parksService.findPark(params.id, true);

    if (!park.getFullInfo().supports.supportsShows) {
      throw new BadRequestException('This park does not support shows');
    }

    Sentry.setTag("park-id", params.id);

    return await park.getShows().then(shows => {
      return shows.map((show) => {
        if (!query.includeOriginal) {
          delete show.original;
        }

        return show;
      });
    }) ?? [];
  }

  @Get('shops')
  @UseInterceptors(CacheInterceptor, LanguageInterceptor)
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The park id',
  })
  @ApiResponse({
    status: 200,
    description: 'All shops of a specific theme park',
    isArray: true,
    type: PoiDto,
  })
  @ApiResponse({
    status: 404,
    description: 'The requested park could not be found',
  })
  async getParkShops(@Param() params, @Query() query): Promise<Poi[]> {
    const park = await this.parksService.findPark(params.id, true);

    if (!park.getFullInfo().supports.supportsShops) {
      throw new BadRequestException('This park does not support shops');
    }

    Sentry.setTag("park-id", params.id);

    return await park.getShops().then(shops => {
      return shops.map((shop) => {
        if (!query.includeOriginal) {
          delete shop.original;
        }

        return shop;
      });
    });
  }

  @Get('animals')
  @UseInterceptors(CacheInterceptor, LanguageInterceptor)
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The park id',
  })
  @ApiResponse({
    status: 200,
    description: 'All animals of a specific theme park',
    isArray: true,
    type: PoiDto,
  })
  @ApiResponse({
    status: 404,
    description: 'The requested park could not be found',
  })
  async getParkAnimals(@Param() params, @Query() query): Promise<Poi[]> {
    const park = await this.parksService.findPark(params.id, true);

    if (!park.getFullInfo().supports.supportsAnimals) {
      throw new BadRequestException('This park does not support animals');
    }

    Sentry.setTag("park-id", params.id);

    return await park.getAnimals().then(animals => {
      return animals.map((animal) => {
        if (!query.includeOriginal) {
          delete animal.original;
        }

        return animal;
      });
    });
  }

  @Get('opening-hours')
  @UseInterceptors(CacheInterceptor, LanguageInterceptor)
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The park id',
  })
  @ApiResponse({
    status: 200,
    description: 'All opening hours of a specific theme park',
    isArray: true,
    type: ThemeParkOpeningHourDto,
  })
  @ApiResponse({
    status: 404,
    description: 'The requested park could not be found',
  })
  async getParkOpeningHours(@Param() params): Promise<ThemeParkOpeningTimes[]> {
    const park = await this.parksService.findPark(params.id, true);

    if (!park.getFullInfo().supports.supportsOpeningTimes) {
      throw new BadRequestException('This park does not support opening hours');
    }

    Sentry.setTag("park-id", params.id);

    return await park.getOpeningTimes();
  }

  @Get('events')
  @UseInterceptors(CacheInterceptor, LanguageInterceptor)
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The park id',
  })
  @ApiResponse({
    status: 200,
    description: 'All events of a specific park, with all available data',
    isArray: true,
    type: ThemeParkOpeningHourDto,
  })
  @ApiResponse({
    status: 404,
    description: 'The requested park could not be found',
  })
  async getParkEvents(@Param() params): Promise<ThemeParkEvent[]> {
    const park = await this.parksService.findPark(params.id, true);

    if (!park.getFullInfo().supports.supportsEvents) {
      throw new BadRequestException('This park does not support events');
    }

    Sentry.setTag("park-id", params.id);

    return await park.getEvents();
  }
}
