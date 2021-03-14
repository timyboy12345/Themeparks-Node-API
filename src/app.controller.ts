import {
  BadRequestException,
  CACHE_MANAGER, CacheInterceptor,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './_services/app.service';
import { ParksService } from './_services/parks/parks.service';
import { ThemePark } from './_interfaces/park.interface';
import { Poi } from './_interfaces/poi.interface';
import { ApiOkResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PoiDto } from './_dtos/poi.dto';
import { ParkDto } from './_dtos/park.dto';
import * as Sentry from '@sentry/node';
import { Cache } from 'cache-manager';

@ApiTags('Themeparks')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly parksService: ParksService,
              @Inject(CACHE_MANAGER) private cacheManager: Cache) {
  }

  @Get('')
  getHello(): Object {
    return this.appService.getHello();
  }

  @Get('parks')
  @ApiOkResponse({
    type: ParkDto,
    isArray: true,
  })
  getParks() {
    return this.parksService.getParks().map(park => {
      return park.getFullInfo();
    });
  }

  @Get('park/:id')
  @UseInterceptors(CacheInterceptor)
  @ApiOkResponse({
    type: ParkDto,
  })
  getPark(@Param() params): ThemePark {
    return this.parksService.findPark(params.id, true).getFullInfo();
  }

  @Get('park/:id/pois')
  @UseInterceptors(CacheInterceptor)
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
  async getParkPois(@Param() params): Promise<Poi[]> {
    const park = this.parksService.findPark(params.id, true);

    if (!park.getFullInfo().supports.supportsPois) {
      throw new BadRequestException('This park does not support pois');
    }

    return await park.getPois().then(pois => {
      return pois.map((poi) => {
        delete poi.original;
        return poi;
      });
    });
  }

  @Get('park/:id/rides')
  @UseInterceptors(CacheInterceptor)
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
  async getParkRides(@Param() params): Promise<Poi[]> {
    const park = this.parksService.findPark(params.id, true);

    if (!park.getFullInfo().supports.supportsRides) {
      throw new BadRequestException('This park does not support rides');
    }

    return await park.getRides().then(rides => {
      return rides.map((ride) => {
        delete ride.original;
        return ride;
      });
    });
  }

  @Get('park/:id/restaurants')
  @UseInterceptors(CacheInterceptor)
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
  async getParkRestaurants(@Param() params): Promise<Poi[]> {
    const park = this.parksService.findPark(params.id, true);

    if (!park.getFullInfo().supports.supportsRestaurants) {
      throw new BadRequestException('This park does not support restaurants');
    }

    return await park.getRestaurants().then(restaurants => {
      return restaurants.map((ride) => {
        delete ride.original;
        return ride;
      });
    });
  }

  @Get('park/:id/shows')
  @UseInterceptors(CacheInterceptor)
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
  async getParkShows(@Param() params): Promise<Poi[]> {
    const park = this.parksService.findPark(params.id, true);

    if (!park.getFullInfo().supports.supportsShows) {
      throw new BadRequestException('This park does not support shows');
    }

    return await park.getShows().then(shows => {
      return shows.map((ride) => {
        delete ride.original;
        return ride;
      });
    });
  }

  @Get('/exception')
  async getException() {
    const e = new Error();
    Sentry.captureException(e);
    return new InternalServerErrorException();
  }
}
