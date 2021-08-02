import {
  BadRequestException,
  CACHE_MANAGER,
  CacheInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './_services/app.service';
import { ParksService } from './_services/parks/parks.service';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PoiDto } from './_dtos/poi.dto';
import { Cache } from 'cache-manager';
import { ThemeParkOpeningTimes } from './_interfaces/park-openingtimes.interface';

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

  @Get('park/:id/openingtimes')
  @UseInterceptors(CacheInterceptor)
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
  async getParkOpeningTimes(@Param() params): Promise<ThemeParkOpeningTimes[]> {
    const park = await this.parksService.findPark(params.id, true);

    if (!park.getFullInfo().supports.supportsShops) {
      throw new BadRequestException('This park does not support shops');
    }

    return await park.getOpeningTimes();
  }
}
