import {
  BadRequestException,
  CACHE_MANAGER,
  CacheInterceptor, CacheTTL,
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

  @Get('history/date/:year/:month/:day')
  @UseInterceptors(CacheInterceptor)
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The park id',
  })
  @ApiParam({
    name: 'year',
    type: 'number',
    description: 'The year',
  })
  @ApiParam({
    name: 'month',
    type: 'number',
    description: 'The month (starting at 01 through 12)',
  })
  @ApiParam({
    name: 'day',
    type: 'number',
    description: 'The day (starting at 01 through 31)',
  })
  @ApiResponse({
    status: 200,
    description: 'Wait time data of all rides in a park for a given date',
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
  async getSpecificDateHistory(@Param() params, @Query() query): Promise<Poi[]> {
    const park = await this.parksService.findPark(params.id, true);

    if (!park.getFullInfo().supports.supportsRideWaitTimesHistory) {
      throw new BadRequestException('This park does not support wait time history');
    }

    const year = params.year;
    const month = params.month;
    const day = params.day;

    const date = moment(`${year}-${month}-${day}`).format('YYYY-MM-DD');

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

  @Get('history/averages')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000 * 60 * 6)
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The park id',
  })
  @ApiResponse({
    status: 200,
    description: 'Average wait times for the last month',
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
  async getAverageWaitHistory(@Param() params, @Query() query): Promise<Poi[]> {
    const park = await this.parksService.findPark(params.id, true);

    if (!park.getFullInfo().supports.supportsRideWaitTimesHistory) {
      throw new BadRequestException('This park does not support wait time history');
    }

    const date = moment()
      .subtract('14', 'days')
      .format(`YYYY-MM-DD`);

    const waitTimes: WaitingTimes[] = await this.waitTimeService
      .findByParkIdAndMinimumDate(park.getInfo().id, date)
      .then((waitTimes) => {
        return waitTimes
          .map((waitTime) => {
            // Round the time object to the nearest 5 minutes
            const start = moment(waitTime.date);
            const remainder = 5 - (start.minute() % 5);

            const dateTime = moment(start).add(remainder, 'minutes').utc().format();
            const time = moment(start).add(remainder, 'minutes').utc().format('HH:mm');

            return {
              ride_id: waitTime.ride_id,
              date: dateTime,
              time: time,
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
        const rideWaitTimes = waitTimes.filter(wt => wt.ride_id === ride.id);

        const allKeys = rideWaitTimes.map((wt: any) => {
          return wt.time;
        });

        const uniqueKeys = allKeys.filter((v, i, a) => a.indexOf(v) === i);
        const averages = uniqueKeys.map((hourMinute) => {
          const waitTimesForHourMinute = rideWaitTimes.filter((value: any) => {
            return value.time === hourMinute;
          });

          const average = waitTimesForHourMinute
            .reduce((total, next) => total + next.wait, 0) / waitTimesForHourMinute.length;

          return {
            ride_id: ride.id,
            date: null,
            time: hourMinute,
            state: PoiStatus.OPEN,
            wait: average,
          }
        });

        ride.waitingTimes = averages;
        return ride;
      });
    }) ?? [];
  }
}
