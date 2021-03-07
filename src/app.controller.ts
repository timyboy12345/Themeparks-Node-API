import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ParksService } from './services/parks/parks.service';
import { ThemePark } from './interfaces/park.interface';
import { Poi } from './interfaces/poi.interface';
import { ApiOkResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PoiDto } from './dtos/poi.dto';
import { ParkDto } from './dtos/park.dto';

@ApiTags('Themeparks')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly parksService: ParksService) {}

  @Get('')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('parks')
  @ApiOkResponse({
    type: ParkDto,
    isArray: true
  })
  getParks() {
    return this.parksService.getParks().map(park => {
      return park.getInfo();
    })
  }

  @Get('park/:id')
  @ApiOkResponse({
    type: ParkDto
  })
  getPark(@Param() params): ThemePark {
    return this.parksService.findPark(params.id, true).getInfo();
  }

  @Get('park/:id/pois')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The park id'
  })
  @ApiResponse({
    status: 200,
    description: 'All rides of a specific theme park',
    isArray: true,
    type: PoiDto
  })
  @ApiResponse({
    status: 404,
    description: 'The requested park could not be found',
  })
  async getParkPois(@Param() params): Promise<Poi[]> {
    const park = this.parksService.findPark(params.id, true);

    return await park.getPois().then(value => {
      return value.map((poi) => {
        delete poi.original;
        return poi;
      });
    });
  }

  @Get('park/:id/rides')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The park id'
  })
  @ApiResponse({
    status: 200,
    description: 'All rides of a specific theme park',
    isArray: true,
    type: PoiDto
  })
  @ApiResponse({
    status: 404,
    description: 'The requested park could not be found',
  })
  async getParkRides(@Param() params): Promise<Poi[]> {
    const park = this.parksService.findPark(params.id, true);

    return await park.getRides();
  }
}
