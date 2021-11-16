import { CACHE_MANAGER, CacheInterceptor, Controller, Get, Inject, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ParkDto } from '../../_dtos/park.dto';
import { ParksService } from '../../_services/parks/parks.service';
import { Cache } from 'cache-manager';

@ApiTags('Themeparks')
@Controller('parks')
export class ParksController {
  constructor(private readonly parksService: ParksService,
              @Inject(CACHE_MANAGER) private cacheManager: Cache) {
  }

  @Get('')
  @UseInterceptors(CacheInterceptor)
  @ApiOkResponse({
    type: ParkDto,
    isArray: true,
  })
  async getParks() {
    return (await this.parksService.getParks()).map(park => park.getFullInfo());
  }
}
