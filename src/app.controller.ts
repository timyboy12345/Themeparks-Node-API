import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ParksService } from './services/parks/parks.service';
import { ThemePark } from './interfaces/park.interface';
import { Poi } from './interfaces/poi.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly parksService: ParksService) {}

  @Get('')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('park/:id')
  getPark(@Param() params): ThemePark {
    return this.parksService.findPark(params.id, true).getInfo();
  }

  @Get('park/:id/pois')
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
  async getParkRides(@Param() params): Promise<Poi[]> {
    const park = this.parksService.findPark(params.id, true);

    return await park.getRides();
  }
}
