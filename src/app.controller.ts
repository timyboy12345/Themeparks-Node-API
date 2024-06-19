import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './_services/app.service';
import { ParksService } from './_services/parks/parks.service';
import { Cache } from 'cache-manager';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly parksService: ParksService,
              @Inject(CACHE_MANAGER) private cacheManager: Cache) {
  }

  @Get('')
  @ApiExcludeEndpoint()
  getHello(): Object {
    return this.appService.getHello();
  }
}
