import { Controller, Get } from '@nestjs/common';
import { ThemePark } from '../interfaces/park.interface';
import { EftelingService } from './efteling.service';

@Controller('efteling')
export class EftelingController {
  constructor(private readonly eftelingService: EftelingService) {
  }

  @Get('park')
  getPark(): ThemePark {
    return this.eftelingService.getInfo();
  }
}
