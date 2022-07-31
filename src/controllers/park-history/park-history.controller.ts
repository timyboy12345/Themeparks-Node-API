import {
  BadRequestException, CACHE_MANAGER,
  CacheInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PoiDto } from '../../_dtos/poi.dto';
import { Poi, PoiStatus } from '../../_interfaces/poi.interface';
import { WaitingTimes } from '../../_interfaces/waitingtimes.interface';
import { ParksService } from '../../_services/parks/parks.service';
import { Cache } from 'cache-manager';
import { WaitTimeService } from '../../database/wait-time/wait-time.service';
import * as moment from 'moment';

@ApiTags('Themeparks')
@Controller('parks/:id')
export class ParkHistoryController {
  constructor(private readonly parksService: ParksService,
              @Inject(CACHE_MANAGER) private cacheManager: Cache,
              private readonly waitTimeService: WaitTimeService) {
  }

  @Get('history/all')
  @UseInterceptors(CacheInterceptor)
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The park id',
  })
  @ApiResponse({
    status: 200,
    description: 'Wait time data of all rides in a park',
    isArray: true,
    type: PoiDto,
  })
  @ApiResponse({
    status: 404,
    description: 'The requested park could not be found',
  })
  @ApiResponse({
    status: 400,
    description: 'The requested park does not support rides or wait time history',
  })
  async getAllHistory(@Param() params, @Query() query): Promise<Poi[]> {
    const park = await this.parksService.findPark(params.id, true);

    if (!park.getFullInfo().supports.supportsRideWaitTimesHistory) {
      throw new BadRequestException('This park does not wait time history');
    }

    const waitTimes: WaitingTimes[] = await this.waitTimeService
      .findByParkId(park.getInfo().id)
      .then((waitTimes) => {
        return waitTimes.map((waitTime) => {
          return {
            ride_id: waitTime.ride_id,
            date: waitTime.date,
            state: PoiStatus.OPEN,
            wait: waitTime.wait,
          };
        });
      }).catch(() => {
        return [];
      });

    return await park.getRides().then(rides => {
      return rides.map((ride) => {
        delete ride.original;
        ride.waitingTimes = waitTimes.filter(wt => wt.ride_id === ride.id);
        return ride;
      });
    }) ?? [];
  }

  @Get('history/today')
  @UseInterceptors(CacheInterceptor)
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The park id',
  })
  @ApiResponse({
    status: 200,
    description: 'Wait time data of all rides in a park',
    isArray: true,
    type: PoiDto,
  })
  @ApiResponse({
    status: 404,
    description: 'The requested park could not be found',
  })
  @ApiResponse({
    status: 400,
    description: 'The requested park does not support rides or wait time history',
  })
  async getTodaysHistory(@Param() params, @Query() query): Promise<Poi[]> {
    const park = await this.parksService.findPark(params.id, true);

    if (!park.getFullInfo().supports.supportsRideWaitTimesHistory) {
      throw new BadRequestException('This park does not support wait time history');
    }

    const date = moment().format('YYYY-MM-DD');

    const waitTimes: WaitingTimes[] = await this.waitTimeService
      .findByParkIdAndDate(park.getInfo().id, date)
      .then((waitTimes) => {
        return waitTimes
          .map((waitTime) => {
            return {
              ride_id: waitTime.ride_id,
              date: waitTime.date,
              state: PoiStatus.OPEN,
              wait: waitTime.wait,
            };
          });
      }).catch(() => {
        return [];
      });

    return await park.getRides().then(rides => {
      return rides.map((ride) => {
        delete ride.original;
        ride.waitingTimes = waitTimes.filter(wt => wt.ride_id === ride.id);
        return ride;
      });
    }) ?? [];
  }
}
