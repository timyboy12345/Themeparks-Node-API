import { HttpModule, Module } from '@nestjs/common';
import { HerschendBaseService } from './herschend-base/herschend-base.service';
import { SilverDollarCityService } from './silver-dollar-city/silver-dollar-city.service';
import { HerschendTransferService } from './herschend-transfer/herschend-transfer.service';
import { DollywoodService } from './dollywood/dollywood.service';

@Module({
  providers: [HerschendBaseService, SilverDollarCityService, HerschendTransferService, DollywoodService],
  exports: [SilverDollarCityService, DollywoodService],
  imports: [
    HttpModule
  ]
})
export class HerschendModule {
}
