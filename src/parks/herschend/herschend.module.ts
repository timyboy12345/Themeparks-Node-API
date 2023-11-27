import { Module } from '@nestjs/common';
import { HerschendBaseService } from './herschend-base/herschend-base.service';
import { SilverDollarCityService } from './silver-dollar-city/silver-dollar-city.service';
import { HerschendTransferService } from './herschend-transfer/herschend-transfer.service';
import { DollywoodService } from './dollywood/dollywood.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { KentuckyKingdomService } from './kentucky-kingdom/kentucky-kingdom.service';
import { WildAdventuresService } from './wild-adventures/wild-adventures.service';

@Module({
  providers: [HerschendBaseService, SilverDollarCityService, HerschendTransferService, DollywoodService, KentuckyKingdomService, WildAdventuresService],
  exports: [SilverDollarCityService, DollywoodService],
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    })
  ]
})
export class HerschendModule {
}
