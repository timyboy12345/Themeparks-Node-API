import { CACHE_MANAGER, CacheInterceptor, Controller, Get, Inject, Param, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ParkDto } from '../../_dtos/park.dto';
import { ThemePark } from '../../_interfaces/park.interface';
import { ParksService } from '../../_services/parks/parks.service';
import { Cache } from 'cache-manager';
import { WaitTimeService } from '../../database/wait-time/wait-time.service';

@Controller('parks')
export class ParksController {
  constructor(private readonly parksService: ParksService,
              @Inject(CACHE_MANAGER) private cacheManager: Cache) {
  }

  @Get('parks')
  @UseInterceptors(CacheInterceptor)
  @ApiOkResponse({
    type: ParkDto,
    isArray: true,
  })
  async getParks() {
    return (await this.parksService.getParks()).map(park => park.getFullInfo());
  }

  @Get('park/:id')
  @UseInterceptors(CacheInterceptor)
  @ApiOkResponse({
    type: ParkDto,
  })
  async getPark(@Param() params): Promise<ThemePark> {
    return (await this.parksService.findPark(params.id, true)).getFullInfo();
  }
}
